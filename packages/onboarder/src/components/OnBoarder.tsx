"use client";

import { Slot } from "@radix-ui/react-slot";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePosition } from "../hooks/usePosition";
import {
  ButtonProps,
  ContentProps,
  ControlsProps,
  OnBoarderContextValue,
  RootProps,
  Step,
  StepProps,
  TitleProps,
} from "../types";

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

const OnBoarderContext = createContext<OnBoarderContextValue | null>(null);

const useOnBoarder = () => {
  const context = useContext(OnBoarderContext);
  if (!context) {
    throw new Error("useOnBoarder must be used within an OnBoarder.Root");
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Components
 * -----------------------------------------------------------------------------------------------*/

const Root = ({ children, onStepChange, onComplete }: RootProps) => {
  const [state, setState] = useState({
    currentStepIndex: 0,
    isOpen: false,
    steps: [] as Step[],
  });

  // Extract steps from children
  useEffect(() => {
    const steps = React.Children.toArray(children)
      .filter(
        (child): child is React.ReactElement<StepProps> =>
          React.isValidElement(child) && child.type === Step
      )
      .map((stepChild) => {
        const title = React.Children.toArray(stepChild.props.children).find(
          (child): child is React.ReactElement<TitleProps> =>
            React.isValidElement(child) && child.type === Title
        )?.props.children;

        const content = React.Children.toArray(stepChild.props.children).find(
          (child): child is React.ReactElement<ContentProps> =>
            React.isValidElement(child) && child.type === Content
        )?.props.children;

        return {
          target: stepChild.props.selector,
          title: typeof title === "string" ? title : "",
          content: content || "",
          placement: stepChild.props.placement || "bottom",
          offset: stepChild.props.offset,
          highlight: stepChild.props.highlight,
          highlightColor: stepChild.props.highlightColor,
          highlightBorderRadius: stepChild.props.highlightBorderRadius,
          isModal: stepChild.props.isModal,
          beforeEnter: stepChild.props.beforeEnter,
          afterExit: stepChild.props.afterExit,
        };
      });

    setState((prev) => ({
      ...prev,
      steps,
      isOpen: true,
    }));
  }, [children]);

  const currentStep = state.steps[state.currentStepIndex];
  const position = usePosition(currentStep);

  const next = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentStepIndex + 1;
      if (nextIndex >= prev.steps.length) {
        onComplete?.();
        return {
          ...prev,
          isOpen: false,
        };
      }
      onStepChange?.(nextIndex);
      return {
        ...prev,
        currentStepIndex: nextIndex,
      };
    });
  }, [onStepChange, onComplete]);

  const prev = useCallback(() => {
    setState((prev) => {
      const prevIndex = Math.max(prev.currentStepIndex - 1, 0);
      onStepChange?.(prevIndex);
      return {
        ...prev,
        currentStepIndex: prevIndex,
      };
    });
  }, [onStepChange]);

  const stop = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const value: OnBoarderContextValue = {
    ...state,
    totalSteps: state.steps.length,
    next,
    prev,
    stop,
    isFirstStep: state.currentStepIndex === 0,
    isLastStep: state.currentStepIndex === state.steps.length - 1,
    onStepChange,
    onComplete,
    currentStep,
    position,
  };

  return (
    <OnBoarderContext.Provider value={value}>
      {children}
    </OnBoarderContext.Provider>
  );
};

const Step = ({
  children,
  selector,
  asChild = false,
  style,
  ...props
}: StepProps) => {
  const { currentStep, position, isOpen } = useOnBoarder();
  const Component = asChild ? Slot : "div";
  const isActive = currentStep?.target === selector;

  if (!isOpen || !isActive) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <Component
        data-onboarder-step
        data-selector={selector}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          transform: position.transform,
          pointerEvents: "auto",
          ...style,
        }}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
};

const Title = ({ children, asChild = false, style, ...props }: TitleProps) => {
  const Component = asChild ? Slot : "h3";
  return (
    <Component data-onboarder-title style={style} {...props}>
      {children}
    </Component>
  );
};

const Content = ({
  children,
  asChild = false,
  style,
  ...props
}: ContentProps) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component data-onboarder-content style={style} {...props}>
      {children}
    </Component>
  );
};

const Controls = ({
  children,
  asChild = false,
  style,
  ...props
}: ControlsProps) => {
  const { isOpen } = useOnBoarder();
  const Component = asChild ? Slot : "div";

  if (!isOpen) return null;

  return (
    <Component data-onboarder-controls style={style} {...props}>
      {children}
    </Component>
  );
};

const Prev = ({ children, asChild = false, style, ...props }: ButtonProps) => {
  const { prev, isFirstStep } = useOnBoarder();
  const Component = asChild ? Slot : "button";
  return (
    <Component
      onClick={prev}
      disabled={isFirstStep}
      data-onboarder-prev
      style={style}
      {...props}
    >
      {children || "Précédent"}
    </Component>
  );
};

const Next = ({ children, asChild = false, style, ...props }: ButtonProps) => {
  const { next, isLastStep } = useOnBoarder();
  const Component = asChild ? Slot : "button";

  if (isLastStep) return null;

  return (
    <Component onClick={next} data-onboarder-next style={style} {...props}>
      {children || "Suivant"}
    </Component>
  );
};

const Skip = ({ children, asChild = false, style, ...props }: ButtonProps) => {
  const { stop } = useOnBoarder();
  const Component = asChild ? Slot : "button";
  return (
    <Component onClick={stop} data-onboarder-skip style={style} {...props}>
      {children || "Passer"}
    </Component>
  );
};

const Finish = ({
  children,
  asChild = false,
  style,
  ...props
}: ButtonProps) => {
  const { next, isLastStep } = useOnBoarder();
  const Component = asChild ? Slot : "button";

  if (!isLastStep) return null;

  return (
    <Component onClick={next} data-onboarder-finish style={style} {...props}>
      {children || "Terminer"}
    </Component>
  );
};

/* -------------------------------------------------------------------------------------------------
 * OnBoarder Namespace
 * -----------------------------------------------------------------------------------------------*/

export const OnBoarder = {
  Root,
  Step,
  Title,
  Content,
  Controls,
  Prev,
  Next,
  Skip,
  Finish,
} as const;

export { useOnBoarder };

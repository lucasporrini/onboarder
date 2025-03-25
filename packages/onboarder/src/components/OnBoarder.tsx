"use client";

import { Slot } from "@radix-ui/react-slot";
import React, { createContext, useCallback, useContext } from "react";
import { usePosition } from "../hooks/usePosition";
import { Step } from "../types";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

interface OnBoarderContextValue {
  currentStepIndex: number;
  isOpen: boolean;
  next: () => void;
  prev: () => void;
  stop: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
  currentStep: Step | null;
  position: { top: number; left: number; transform: string };
}

interface StepProps {
  children: React.ReactNode;
  selector: string;
  asChild?: boolean;
}

interface TitleProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface ContentProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface ControlsProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  asChild?: boolean;
}

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

interface RootProps {
  children: React.ReactNode;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

const Root = React.forwardRef<HTMLDivElement, RootProps>(
  ({ children, onStepChange, onComplete }, forwardedRef) => {
    const [state, setState] = React.useState({
      currentStepIndex: 0,
      isOpen: false,
      steps: [] as Step[],
    });

    const currentStep = state.steps[state.currentStepIndex];
    const position = usePosition(currentStep);

    const next = useCallback(() => {
      setState((prev) => {
        const nextIndex = prev.currentStepIndex + 1;
        onStepChange?.(nextIndex);
        return {
          ...prev,
          currentStepIndex: nextIndex,
        };
      });
    }, [onStepChange]);

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

    const value = {
      ...state,
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
        <div ref={forwardedRef} data-onboarder>
          {children}
        </div>
      </OnBoarderContext.Provider>
    );
  }
);

Root.displayName = "OnBoarder.Root";

const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ children, selector, asChild = false }, forwardedRef) => {
    const { currentStep, position } = useOnBoarder();
    const Component = asChild ? Slot : "div";
    const isActive = currentStep?.target === selector;

    return (
      <Component
        ref={forwardedRef}
        data-onboarder-step
        data-selector={selector}
        style={
          isActive
            ? {
                position: "absolute",
                top: position.top,
                left: position.left,
                transform: position.transform,
                zIndex: 1000,
              }
            : undefined
        }
      >
        {children}
      </Component>
    );
  }
);

Step.displayName = "OnBoarder.Step";

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ children, asChild = false }, forwardedRef) => {
    const Component = asChild ? Slot : "h3";
    return (
      <Component ref={forwardedRef} data-onboarder-title>
        {children}
      </Component>
    );
  }
);

Title.displayName = "OnBoarder.Title";

const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ children, asChild = false }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component ref={forwardedRef} data-onboarder-content>
        {children}
      </Component>
    );
  }
);

Content.displayName = "OnBoarder.Content";

const Controls = React.forwardRef<HTMLDivElement, ControlsProps>(
  ({ children, asChild = false }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component ref={forwardedRef} data-onboarder-controls>
        {children}
      </Component>
    );
  }
);

Controls.displayName = "OnBoarder.Controls";

const Prev = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, asChild = false, ...props }, forwardedRef) => {
    const { prev, isFirstStep } = useOnBoarder();
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        onClick={prev}
        disabled={isFirstStep}
        data-onboarder-prev
        {...props}
      >
        {children || "Précédent"}
      </Component>
    );
  }
);

Prev.displayName = "OnBoarder.Prev";

const Next = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, asChild = false, ...props }, forwardedRef) => {
    const { next, isLastStep } = useOnBoarder();
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        onClick={next}
        data-onboarder-next
        {...props}
      >
        {children || (isLastStep ? "Terminer" : "Suivant")}
      </Component>
    );
  }
);

Next.displayName = "OnBoarder.Next";

const Skip = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, asChild = false, ...props }, forwardedRef) => {
    const { stop } = useOnBoarder();
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={forwardedRef}
        onClick={stop}
        data-onboarder-skip
        {...props}
      >
        {children || "Passer"}
      </Component>
    );
  }
);

Skip.displayName = "OnBoarder.Skip";

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
};

export { useOnBoarder };
export type {
  ButtonProps,
  ContentProps,
  ControlsProps,
  RootProps,
  StepProps,
  TitleProps,
};

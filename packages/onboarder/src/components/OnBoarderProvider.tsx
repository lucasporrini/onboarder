"use client";

import React, {
  createContext,
  ReactElement,
  useCallback,
  useContext,
  useState,
} from "react";
import { Step } from "../types";
import { OnBoarder } from "./OnBoarder";

interface OnBoarderProviderContextValue {
  start: () => void;
  stop: () => void;
  isOpen: boolean;
}

const OnBoarderProviderContext =
  createContext<OnBoarderProviderContextValue | null>(null);

export const useOnBoarderProvider = () => {
  const context = useContext(OnBoarderProviderContext);
  if (!context) {
    throw new Error(
      "useOnBoarderProvider must be used within an OnBoarderProvider"
    );
  }
  return context;
};

interface OnBoarderProviderProps {
  children: React.ReactNode;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

interface RootChildProps {
  children: React.ReactNode;
}

interface StepChildProps {
  selector: string;
  children: React.ReactNode;
}

interface TitleChildProps {
  children: React.ReactNode;
}

interface ContentChildProps {
  children: React.ReactNode;
}

export const OnBoarderProvider = ({
  children,
  onStepChange,
  onComplete,
}: OnBoarderProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const start = useCallback(() => {
    setIsOpen(true);
  }, []);

  const stop = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Extract steps from children
  const steps: Step[] = React.Children.toArray(children)
    .filter(
      (child): child is ReactElement<RootChildProps> =>
        React.isValidElement(child) && child.type === OnBoarder.Root
    )
    .map((child) => {
      return React.Children.toArray(child.props.children)
        .filter(
          (stepChild): stepChild is ReactElement<StepChildProps> =>
            React.isValidElement(stepChild) && stepChild.type === OnBoarder.Step
        )
        .map((stepChild) => {
          const title = React.Children.toArray(stepChild.props.children).find(
            (titleChild): titleChild is ReactElement<TitleChildProps> =>
              React.isValidElement(titleChild) &&
              titleChild.type === OnBoarder.Title
          )?.props.children;

          const content = React.Children.toArray(stepChild.props.children).find(
            (contentChild): contentChild is ReactElement<ContentChildProps> =>
              React.isValidElement(contentChild) &&
              contentChild.type === OnBoarder.Content
          )?.props.children;

          return {
            target: stepChild.props.selector,
            title: typeof title === "string" ? title : "",
            content: content || "",
            placement: "bottom" as const,
            highlight: true,
          };
        });
    })
    .flat();

  return (
    <OnBoarderProviderContext.Provider value={{ start, stop, isOpen }}>
      <OnBoarder.Root onStepChange={onStepChange} onComplete={onComplete}>
        {children}
      </OnBoarder.Root>
    </OnBoarderProviderContext.Provider>
  );
};

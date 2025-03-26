import { ReactNode } from "react";

export type Step = {
  target: string;
  title: string;
  content: string | ReactNode;
  placement?: "top" | "bottom" | "left" | "right" | "center";
  offset?: number;
  highlight?: boolean;
  highlightColor?: string;
  highlightBorderRadius?: string;
  isModal?: boolean;
  beforeEnter?: () => void | Promise<void>;
  afterExit?: () => void | Promise<void>;
};

export type Position = {
  top: number;
  left: number;
  transform: string;
};

export interface OnBoarderContextValue {
  currentStepIndex: number;
  totalSteps: number;
  isOpen: boolean;
  steps: Step[];
  next: () => void;
  prev: () => void;
  stop: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
  currentStep?: Step;
  position: {
    top: number;
    left: number;
    transform: string;
  };
}

export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  selector: string;
  asChild?: boolean;
  placement?: "top" | "bottom" | "left" | "right" | "center";
  offset?: number;
  highlight?: boolean;
  highlightColor?: string;
  highlightBorderRadius?: string;
  isModal?: boolean;
  beforeEnter?: () => void | Promise<void>;
  afterExit?: () => void | Promise<void>;
}

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  asChild?: boolean;
}

export interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  asChild?: boolean;
}

export interface ControlsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  asChild?: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  asChild?: boolean;
}

export interface RootProps {
  children: ReactNode;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

export interface OnBoarderProviderProps {
  children: ReactNode;
  steps: Step[];
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

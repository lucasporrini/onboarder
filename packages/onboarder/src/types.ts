export type Step = {
  target: string;
  title: string;
  content: string | React.ReactNode;
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
  isOpen: boolean;
  next: () => void;
  prev: () => void;
  stop: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
  currentStep: Step | null;
  position: Position;
}

export interface StepProps {
  children: React.ReactNode;
  selector: string;
  asChild?: boolean;
}

export interface TitleProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface ContentProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface ControlsProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  asChild?: boolean;
}

export interface RootProps {
  children: React.ReactNode;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

export interface OnBoarderProviderProps {
  children: React.ReactNode;
  steps: Step[];
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

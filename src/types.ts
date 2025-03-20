export type Placement = "top" | "bottom" | "left" | "right";

export interface Step {
  target: string;
  title: string;
  content: string;
  placement?: Placement;
  offset?: number;
}

export interface Theme {
  primary: string;
  secondary: string;
  textColor: string;
  backgroundColor: string;
  borderRadius: string;
  boxShadow?: string;
  fontSize?: {
    title: string;
    content: string;
  };
  padding?: {
    container: string;
    content: string;
  };
}

export interface OnboarderProps {
  steps: Step[];
  isOpen?: boolean;
  theme?: Partial<Theme>;
  onClose?: () => void;
  onComplete?: () => void;
  showProgress?: boolean;
  showSkip?: boolean;
  className?: string;
}

export interface StepContentProps {
  step: Step;
  theme: Theme;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  currentStep: number;
  totalSteps: number;
  showProgress?: boolean;
  showSkip?: boolean;
}

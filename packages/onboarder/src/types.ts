export type Step = {
  id?: string;
  content: string | React.ReactNode;
  target: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  isModal?: boolean;
  beforeEnter?: () => void | Promise<void>;
  afterExit?: () => void | Promise<void>;
};

export type ThemeConfig = {
  tooltip?: {
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: string;
    padding?: string;
    boxShadow?: string;
  };
  buttons?: {
    primary?: {
      backgroundColor?: string;
      textColor?: string;
      hoverBackgroundColor?: string;
    };
    secondary?: {
      backgroundColor?: string;
      textColor?: string;
      hoverBackgroundColor?: string;
    };
    danger?: {
      backgroundColor?: string;
      textColor?: string;
      hoverBackgroundColor?: string;
    };
  };
  classNames?: {
    tooltip?: string;
    content?: string;
    buttonContainer?: string;
    primaryButton?: string;
    secondaryButton?: string;
    dangerButton?: string;
  };
};

export type TourContextType = {
  steps: Step[];
  currentStep: Step | null;
  currentStepIndex: number;
  isRunning: boolean;
  showSkip: boolean;
  theme?: ThemeConfig;
  start: (steps: Step[]) => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
};

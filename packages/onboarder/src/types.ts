export type Step = {
  id?: string;
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

export type TourContextType = {
  steps: Step[];
  currentStep: Step | null;
  currentStepIndex: number;
  isRunning: boolean;
  showSkip: boolean;
  start: (steps: Step[]) => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
};

export type Step = {
  id: string;
  content: string | React.ReactNode;
  target: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
  isModal?: boolean;
  beforeEnter?: () => void | Promise<void>;
  afterExit?: () => void | Promise<void>;
};

export type TourContextType = {
  steps: Step[];
  currentStep: Step | null;
  currentStepIndex: number;
  isRunning: boolean;
  start: (steps: Step[]) => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
};

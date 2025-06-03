import React, { createContext, useCallback, useContext } from "react";
import { type ThemeConfig } from "../types";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

interface Step {
  target: string;
  content: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left" | "center";
}

interface OnBoarderState {
  steps: Step[];
  currentStepIndex: number;
  isOpen: boolean;
  theme?: ThemeConfig;
}

interface OnBoarderContextValue extends OnBoarderState {
  next: () => void;
  prev: () => void;
  start: (steps: Step[], theme?: ThemeConfig) => void;
  stop: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
  components?: {
    Root?: React.ComponentType<RootProps>;
    Content?: React.ComponentType<ContainerProps>;
    Buttons?: React.ComponentType<ContainerProps>;
    Next?: React.ComponentType<ButtonProps>;
    Prev?: React.ComponentType<ButtonProps>;
    Close?: React.ComponentType<ButtonProps>;
  };
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

/* -------------------------------------------------------------------------------------------------
 * Context
 * -----------------------------------------------------------------------------------------------*/

const OnBoarderContext = createContext<OnBoarderContextValue | null>(null);

const useOnBoarder = () => {
  const context = useContext(OnBoarderContext);
  if (!context) {
    throw new Error("useOnBoarder must be used within an OnBoarder.Provider");
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Components
 * -----------------------------------------------------------------------------------------------*/

interface ProviderProps {
  children: React.ReactNode;
  initialSteps?: Step[];
  theme?: ThemeConfig;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  components?: {
    Root?: React.ComponentType<RootProps>;
    Content?: React.ComponentType<ContainerProps>;
    Buttons?: React.ComponentType<ContainerProps>;
    Next?: React.ComponentType<ButtonProps>;
    Prev?: React.ComponentType<ButtonProps>;
    Close?: React.ComponentType<ButtonProps>;
  };
}

const Provider = ({
  children,
  initialSteps = [],
  theme,
  onStepChange,
  onComplete,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  components,
}: ProviderProps) => {
  const [state, setState] = React.useState<OnBoarderState>({
    steps: initialSteps,
    currentStepIndex: 0,
    isOpen: false,
    theme,
  });

  const next = useCallback(() => {
    setState((prev) => {
      const nextIndex = Math.min(
        prev.currentStepIndex + 1,
        prev.steps.length - 1
      );
      const isLastStep = nextIndex === prev.steps.length - 1;

      if (isLastStep && onComplete) {
        onComplete();
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

  const start = useCallback((steps: Step[], theme?: ThemeConfig) => {
    setState({
      steps,
      currentStepIndex: 0,
      isOpen: true,
      theme,
    });
  }, []);

  const stop = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  React.useEffect(() => {
    if (closeOnEscape) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && state.isOpen) {
          stop();
        }
      };
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [closeOnEscape, state.isOpen, stop]);

  React.useEffect(() => {
    if (closeOnOutsideClick) {
      const handleOutsideClick = (event: MouseEvent) => {
        if (
          state.isOpen &&
          !(event.target as Element).closest("[data-onboarder]")
        ) {
          stop();
        }
      };
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [closeOnOutsideClick, state.isOpen, stop]);

  const value = {
    ...state,
    next,
    prev,
    start,
    stop,
    isFirstStep: state.currentStepIndex === 0,
    isLastStep: state.currentStepIndex === state.steps.length - 1,
    onStepChange,
    onComplete,
    components,
  };

  return (
    <OnBoarderContext.Provider value={value}>
      {children}
    </OnBoarderContext.Provider>
  );
};

interface RootProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DefaultRoot = ({ children, className, style }: RootProps) => {
  return (
    <div data-onboarder className={className} style={style}>
      {children}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultNext = ({ children, className, ...props }: ButtonProps) => {
  const { next, isLastStep } = useOnBoarder();
  return (
    <button
      onClick={next}
      data-onboarder-button
      className={className}
      {...props}
    >
      {children || (isLastStep ? "Terminer" : "Suivant")}
    </button>
  );
};

const DefaultPrev = ({ children, className, ...props }: ButtonProps) => {
  const { prev, isFirstStep } = useOnBoarder();
  return (
    <button
      onClick={prev}
      disabled={isFirstStep}
      data-onboarder-button
      className={className}
      {...props}
    >
      {children || "Précédent"}
    </button>
  );
};

const DefaultClose = ({ children, className, ...props }: ButtonProps) => {
  const { stop } = useOnBoarder();
  return (
    <button
      onClick={stop}
      data-onboarder-button
      className={className}
      {...props}
    >
      {children || "Passer"}
    </button>
  );
};

const Root = ({ children, className, style }: RootProps) => {
  const { isOpen, components, steps, currentStepIndex } = useOnBoarder();
  const [position, setPosition] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (!isOpen || !steps.length) return;

    const currentStep = steps[currentStepIndex];
    if (!currentStep) return;

    const targetElement = document.querySelector(currentStep.target);
    if (!targetElement) return;

    const targetRect = targetElement.getBoundingClientRect();
    const stepPosition = currentStep.position || "bottom";

    let newPosition: React.CSSProperties = {
      position: "fixed",
      zIndex: 9999,
    };

    switch (stepPosition) {
      case "top":
        newPosition = {
          ...newPosition,
          left: targetRect.left + targetRect.width / 2,
          top: targetRect.top - 10,
          transform: "translate(-50%, -100%)",
        };
        break;
      case "bottom":
        newPosition = {
          ...newPosition,
          left: targetRect.left + targetRect.width / 2,
          top: targetRect.bottom + 10,
          transform: "translate(-50%, 0)",
        };
        break;
      case "left":
        newPosition = {
          ...newPosition,
          left: targetRect.left - 10,
          top: targetRect.top + targetRect.height / 2,
          transform: "translate(-100%, -50%)",
        };
        break;
      case "right":
        newPosition = {
          ...newPosition,
          left: targetRect.right + 10,
          top: targetRect.top + targetRect.height / 2,
          transform: "translate(0, -50%)",
        };
        break;
      case "center":
        newPosition = {
          ...newPosition,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        };
        break;
      default:
        newPosition = {
          ...newPosition,
          left: targetRect.left + targetRect.width / 2,
          top: targetRect.bottom + 10,
          transform: "translate(-50%, 0)",
        };
    }

    setPosition(newPosition);
  }, [isOpen, steps, currentStepIndex]);

  React.useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      // Recalculer la position lors du redimensionnement
      const currentStep = steps[currentStepIndex];
      if (!currentStep) return;

      const targetElement = document.querySelector(currentStep.target);
      if (!targetElement) return;

      const targetRect = targetElement.getBoundingClientRect();
      const stepPosition = currentStep.position || "bottom";

      let newPosition: React.CSSProperties = {
        position: "fixed",
        zIndex: 9999,
      };

      switch (stepPosition) {
        case "top":
          newPosition = {
            ...newPosition,
            left: targetRect.left + targetRect.width / 2,
            top: targetRect.top - 10,
            transform: "translate(-50%, -100%)",
          };
          break;
        case "bottom":
          newPosition = {
            ...newPosition,
            left: targetRect.left + targetRect.width / 2,
            top: targetRect.bottom + 10,
            transform: "translate(-50%, 0)",
          };
          break;
        case "left":
          newPosition = {
            ...newPosition,
            left: targetRect.left - 10,
            top: targetRect.top + targetRect.height / 2,
            transform: "translate(-100%, -50%)",
          };
          break;
        case "right":
          newPosition = {
            ...newPosition,
            left: targetRect.right + 10,
            top: targetRect.top + targetRect.height / 2,
            transform: "translate(0, -50%)",
          };
          break;
        case "center":
          newPosition = {
            ...newPosition,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          };
          break;
        default:
          newPosition = {
            ...newPosition,
            left: targetRect.left + targetRect.width / 2,
            top: targetRect.bottom + 10,
            transform: "translate(-50%, 0)",
          };
      }

      setPosition(newPosition);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [isOpen, steps, currentStepIndex]);

  if (!isOpen) return null;

  const CustomRoot = components?.Root || DefaultRoot;
  const finalStyle = { ...style, ...position };

  return (
    <CustomRoot className={className} style={finalStyle}>
      {children}
    </CustomRoot>
  );
};

const Next = ({ children, className, ...props }: ButtonProps) => {
  const { components } = useOnBoarder();
  const CustomNext = components?.Next || DefaultNext;
  return (
    <CustomNext className={className} {...props}>
      {children}
    </CustomNext>
  );
};

const Prev = ({ children, className, ...props }: ButtonProps) => {
  const { components } = useOnBoarder();
  const CustomPrev = components?.Prev || DefaultPrev;
  return (
    <CustomPrev className={className} {...props}>
      {children}
    </CustomPrev>
  );
};

const Close = ({ children, className, ...props }: ButtonProps) => {
  const { components } = useOnBoarder();
  const CustomClose = components?.Close || DefaultClose;
  return (
    <CustomClose className={className} {...props}>
      {children}
    </CustomClose>
  );
};

const DefaultContent = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div data-onboarder-content className={className} {...props}>
      {children}
    </div>
  );
};

const DefaultButtons = ({ children, className, ...props }: ContainerProps) => {
  return (
    <div data-onboarder-buttons className={className} {...props}>
      {children}
    </div>
  );
};

// const Content = ({ children, className, ...props }: ContainerProps) => {
//   const { isOpen, components } = useOnBoarder();
//   if (!isOpen) return null;

//   const CustomContent = components?.Content || DefaultContent;
//   return (
//     <CustomContent className={className} {...props}>
//       {children}
//     </CustomContent>
//   );
// };

const Content = ({ children, className, ...props }: ContainerProps) => {
  const { isOpen, components, steps, currentStepIndex } = useOnBoarder();
  if (!isOpen) return null;

  const CustomContent = components?.Content || DefaultContent;
  const currentStep = steps[currentStepIndex];

  return (
    <CustomContent className={className} {...props}>
      {currentStep?.content}
      {children}
    </CustomContent>
  );
};

const Buttons = ({ children, className, ...props }: ContainerProps) => {
  const { isOpen, components } = useOnBoarder();
  if (!isOpen) return null;

  const CustomButtons = components?.Buttons || DefaultButtons;
  return (
    <CustomButtons className={className} {...props}>
      {children}
    </CustomButtons>
  );
};

/* -------------------------------------------------------------------------------------------------
 * OnBoarder Namespace
 * -----------------------------------------------------------------------------------------------*/

export const OnBoarder = {
  Provider,
  Root,
  Content,
  Buttons,
  Next,
  Prev,
  Close,
};

export { useOnBoarder };
export type {
  ButtonProps,
  ContainerProps,
  ProviderProps as OnBoarderProviderProps,
  RootProps,
  Step,
};

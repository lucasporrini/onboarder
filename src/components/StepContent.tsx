import React, { useEffect, useRef, useState } from "react";
import { StepContentProps } from "../types";

export const StepContent: React.FC<StepContentProps> = ({
  step,
  theme,
  onNext,
  onPrev,
  onClose,
  currentStep,
  totalSteps,
  showProgress,
  showSkip,
}) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetElement = document.querySelector(step.target);
    if (targetElement && contentRef.current) {
      const targetRect = targetElement.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (step.placement) {
        case "top":
          top = targetRect.top - contentRect.height - (step.offset || 10);
          left = targetRect.left + (targetRect.width - contentRect.width) / 2;
          break;
        case "bottom":
          top = targetRect.bottom + (step.offset || 10);
          left = targetRect.left + (targetRect.width - contentRect.width) / 2;
          break;
        case "left":
          top = targetRect.top + (targetRect.height - contentRect.height) / 2;
          left = targetRect.left - contentRect.width - (step.offset || 10);
          break;
        case "right":
          top = targetRect.top + (targetRect.height - contentRect.height) / 2;
          left = targetRect.right + (step.offset || 10);
          break;
        default:
          top = targetRect.bottom + (step.offset || 10);
          left = targetRect.left + (targetRect.width - contentRect.width) / 2;
      }

      setPosition({ top, left });
    }
  }, [step]);

  const styles: React.CSSProperties = {
    position: "fixed",
    top: `${position.top}px`,
    left: `${position.left}px`,
    backgroundColor: theme.backgroundColor,
    borderRadius: theme.borderRadius,
    boxShadow: theme.boxShadow,
    padding: theme.padding?.container,
    zIndex: 9999,
    maxWidth: "400px",
    minWidth: "250px",
  };

  return (
    <div ref={contentRef} style={styles} className="onboarder-step-content">
      <div style={{ padding: theme.padding?.content }}>
        <h3
          style={{
            color: theme.textColor,
            fontSize: theme.fontSize?.title,
            marginTop: 0,
            marginBottom: "0.5rem",
          }}
        >
          {step.title}
        </h3>

        <p
          style={{
            color: theme.textColor,
            fontSize: theme.fontSize?.content,
            marginBottom: "1rem",
          }}
        >
          {step.content}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {showProgress && (
            <div style={{ color: theme.secondary }}>
              {currentStep + 1} / {totalSteps}
            </div>
          )}

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {currentStep > 0 && (
              <button
                onClick={onPrev}
                style={{
                  backgroundColor: theme.secondary,
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Précédent
              </button>
            )}

            <button
              onClick={onNext}
              style={{
                backgroundColor: theme.primary,
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {currentStep === totalSteps - 1 ? "Terminer" : "Suivant"}
            </button>

            {showSkip && currentStep < totalSteps - 1 && (
              <button
                onClick={onClose}
                style={{
                  backgroundColor: "transparent",
                  color: theme.secondary,
                  border: "none",
                  padding: "0.5rem",
                  cursor: "pointer",
                }}
              >
                Passer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

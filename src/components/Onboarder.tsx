"use client";

import React, { useEffect, useState } from "react";
import { OnboarderProps, Theme } from "../types";
import { StepContent } from "./StepContent";

const defaultTheme: Theme = {
  primary: "#007bff",
  secondary: "#6c757d",
  textColor: "#333",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  fontSize: {
    title: "1.25rem",
    content: "1rem",
  },
  padding: {
    container: "1rem",
    content: "0.75rem",
  },
};

export const Onboarder: React.FC<OnboarderProps> = ({
  steps,
  isOpen = true,
  theme: customTheme,
  onClose,
  onComplete,
  showProgress = true,
  showSkip = true,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(isOpen);
  const theme = { ...defaultTheme, ...customTheme };

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete?.();
  };

  if (!isVisible || steps.length === 0) {
    return null;
  }

  const currentStepData = steps[currentStep];

  return (
    <div className={`onboarder-container ${className || ""}`}>
      <StepContent
        step={currentStepData}
        theme={theme}
        onNext={handleNext}
        onPrev={handlePrev}
        onClose={handleClose}
        currentStep={currentStep}
        totalSteps={steps.length}
        showProgress={showProgress}
        showSkip={showSkip}
      />
    </div>
  );
};

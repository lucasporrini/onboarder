"use client";

import React, { useRef, useState } from "react";
import type { Step, TourContextType } from "../types";
import { TourContext } from "./TourContext";

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const value: TourContextType = {
    steps,
    currentStep: steps[currentStepIndex] || null,
    currentStepIndex,
    isRunning,
    start: (newSteps: Step[]) => {
      setSteps(newSteps);
      setCurrentStepIndex(0);
      setIsRunning(true);
    },
    stop: () => {
      setIsRunning(false);
      setCurrentStepIndex(-1);
    },
    next: () =>
      setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1)),
    prev: () => setCurrentStepIndex((prev) => Math.max(prev - 1, 0)),
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    progress: steps.length > 0 ? (currentStepIndex + 1) / steps.length : 0,
  };

  return (
    <TourContext.Provider value={value}>
      {children}
      {isRunning && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] pointer-events-none"
        />
      )}
    </TourContext.Provider>
  );
};

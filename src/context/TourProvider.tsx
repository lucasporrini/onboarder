"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Step, TourContextType } from "../types";
import { TourContext } from "./TourContext";

interface TourProviderProps {
  children: React.ReactNode;
  showSkip?: boolean;
}

export const TourProvider: React.FC<TourProviderProps> = ({
  children,
  showSkip = true,
}) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRunning && overlayRef.current) {
      const currentStep = steps[currentStepIndex];
      if (currentStep) {
        const target = document.querySelector(currentStep.target);
        if (target) {
          const rect = target.getBoundingClientRect();
          overlayRef.current.style.setProperty("--target-top", `${rect.top}px`);
          overlayRef.current.style.setProperty(
            "--target-left",
            `${rect.left}px`
          );
          overlayRef.current.style.setProperty(
            "--target-width",
            `${rect.width}px`
          );
          overlayRef.current.style.setProperty(
            "--target-height",
            `${rect.height}px`
          );
        }
      }
    }
  }, [isRunning, currentStepIndex, steps]);

  const value: TourContextType = {
    steps,
    currentStep: steps[currentStepIndex] || null,
    currentStepIndex,
    isRunning,
    showSkip,
    start: (newSteps: Step[]) => {
      setSteps(newSteps);
      setCurrentStepIndex(0);
      setIsRunning(true);
    },
    stop: () => {
      setIsRunning(false);
      setCurrentStepIndex(-1);
    },
    next: () => {
      if (currentStepIndex === steps.length - 1) {
        setIsRunning(false);
        setCurrentStepIndex(-1);
      } else {
        setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
      }
    },
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
          style={{
            background: `radial-gradient(
              circle at var(--target-left) var(--target-top),
              transparent 0,
              transparent calc(var(--target-width) / 2),
              rgba(0, 0, 0, 0.5) calc(var(--target-width) / 2)
            )`,
          }}
        />
      )}
    </TourContext.Provider>
  );
};

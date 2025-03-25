"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { OnBoarder } from "./OnBoarder";

interface OnBoarderProviderProps {
  children: React.ReactNode;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

const OnBoarderProviderContext = createContext<{
  start: () => void;
  stop: () => void;
  isOpen: boolean;
} | null>(null);

export const useOnBoarderProvider = () => {
  const context = useContext(OnBoarderProviderContext);
  if (!context) {
    throw new Error(
      "useOnBoarderProvider must be used within an OnBoarderProvider"
    );
  }
  return context;
};

export const OnBoarderProvider = ({
  children,
  onStepChange,
  onComplete,
}: OnBoarderProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const start = useCallback(() => {
    setIsOpen(true);
  }, []);

  const stop = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <OnBoarderProviderContext.Provider value={{ start, stop, isOpen }}>
      <OnBoarder.Root onStepChange={onStepChange} onComplete={onComplete}>
        {children}
      </OnBoarder.Root>
    </OnBoarderProviderContext.Provider>
  );
};

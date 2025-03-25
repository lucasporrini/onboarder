"use client";

import type { Step } from "onboarder";
import { OnBoarder, OnBoarderProvider } from "onboarder";

interface OnboardingProviderProps {
  children: React.ReactNode;
  steps: Step[];
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

export const OnboardingProvider = () => {
  return (
    <OnBoarderProvider>
      <OnBoarder.Step selector="#mon-selector">
        <OnBoarder.Title>Mon title</OnBoarder.Title>
        <OnBoarder.Content>Mon content</OnBoarder.Content>
      </OnBoarder.Step>
      <OnBoarder.Controls>
        <OnBoarder.Prev />
        <OnBoarder.Next />
        <OnBoarder.Skip />
      </OnBoarder.Controls>
    </OnBoarderProvider>
  );
};

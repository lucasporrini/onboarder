"use client";

import {
  OnBoarder,
  OnBoarderProvider,
  useOnBoarderProvider,
  usePosition,
} from "onboarder";
import { useEffect } from "react";

interface OnboardingProviderProps {
  children: React.ReactNode;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

interface StepWrapperProps {
  selector: string;
  children: React.ReactNode;
}

const StepWrapper = ({ selector, children }: StepWrapperProps) => {
  const position = usePosition({
    target: selector,
    title: "",
    content: "",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: position.transform,
      }}
    >
      {children}
    </div>
  );
};

const OnboardingContent = ({
  children,
  onStepChange,
  onComplete,
}: OnboardingProviderProps) => {
  const { start } = useOnBoarderProvider();

  useEffect(() => {
    start();
  }, [start]);

  return (
    <OnBoarder.Root onStepChange={onStepChange} onComplete={onComplete}>
      <StepWrapper selector="#mon-selector">
        <OnBoarder.Step selector="#mon-selector">
          <OnBoarder.Title>Bienvenue !</OnBoarder.Title>
          <OnBoarder.Content>
            Ceci est la première étape de votre onboarding.
          </OnBoarder.Content>
        </OnBoarder.Step>
      </StepWrapper>

      <StepWrapper selector=".profile-section">
        <OnBoarder.Step selector=".profile-section">
          <OnBoarder.Title>Votre profil</OnBoarder.Title>
          <OnBoarder.Content>
            Ici vous pouvez gérer vos informations personnelles.
          </OnBoarder.Content>
        </OnBoarder.Step>
      </StepWrapper>

      <OnBoarder.Controls>
        <OnBoarder.Prev />
        <OnBoarder.Next />
        <OnBoarder.Skip />
      </OnBoarder.Controls>
      {children}
    </OnBoarder.Root>
  );
};

export const OnboardingProvider = (props: OnboardingProviderProps) => {
  return (
    <OnBoarderProvider>
      <OnboardingContent {...props} />
    </OnBoarderProvider>
  );
};

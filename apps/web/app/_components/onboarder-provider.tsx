"use client";

import { OnBoarder, OnBoarderProvider, useOnBoarderProvider } from "onboarder";
import { useEffect } from "react";

interface OnboardingProviderProps {
  children: React.ReactNode;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}

export const OnboardingProvider = ({
  children,
  onStepChange,
  onComplete,
}: OnboardingProviderProps) => {
  const { start, stop, isOpen } = useOnBoarderProvider();

  useEffect(() => {
    start();
  }, []);

  return (
    <OnBoarderProvider>
      <OnBoarder.Root onStepChange={onStepChange} onComplete={onComplete}>
        <OnBoarder.Step selector="#welcome-button">
          <OnBoarder.Title>Bienvenue !</OnBoarder.Title>
          <OnBoarder.Content>
            Ceci est la première étape de votre onboarding.
          </OnBoarder.Content>
        </OnBoarder.Step>

        <OnBoarder.Step selector=".profile-section">
          <OnBoarder.Title>Votre profil</OnBoarder.Title>
          <OnBoarder.Content>
            Ici vous pouvez gérer vos informations personnelles.
          </OnBoarder.Content>
        </OnBoarder.Step>

        <OnBoarder.Controls>
          <OnBoarder.Prev />
          <OnBoarder.Next />
          <OnBoarder.Skip />
        </OnBoarder.Controls>
      </OnBoarder.Root>
      {children}
    </OnBoarderProvider>
  );
};

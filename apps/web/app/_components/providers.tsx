"use client";

import { OnBoarder } from "onboarder";
import { demoSteps, themes } from "../../lib/constantes";

export function Providers({ children }: { children: React.ReactNode }) {
  const handleComplete = () => {
    console.log("Onboarding terminé !");
    alert("🎉 Félicitations ! Vous avez terminé l'onboarding !");
  };

  const handleStepChange = (stepIndex: number) => {
    console.log(`Changement d'étape : ${stepIndex + 1}/${demoSteps.length}`);
  };

  return (
    <OnBoarder.Provider
      initialSteps={demoSteps}
      theme={themes.colorful}
      closeOnOutsideClick={false}
      closeOnEscape={false}
      onComplete={handleComplete}
      onStepChange={handleStepChange}
    >
      {children}
    </OnBoarder.Provider>
  );
}

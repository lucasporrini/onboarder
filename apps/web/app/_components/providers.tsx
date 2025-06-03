"use client";

import { OnBoarder } from "onboarder";
import { demoSteps, themes } from "../../lib/constantes";

export function Providers({ children }: { children: React.ReactNode }) {
  const handleComplete = () => {
    console.log("Onboarding terminé !");
    alert("🎉 Félicitations ! Vous avez terminé l'onboarding !");
  };

  return (
    <OnBoarder.Provider
      initialSteps={demoSteps}
      theme={themes.colorful}
      closeOnOutsideClick={false}
      closeOnEscape={false}
      onComplete={handleComplete}
    >
      {children}
    </OnBoarder.Provider>
  );
}

"use client";

import { OnBoarder } from "onboarder";

function SimpleOnboarding() {
  const steps = [
    {
      target: "#welcome",
      content: "Bienvenue dans notre application!",
      placement: "bottom",
    },
    {
      target: ".features",
      content: "Découvrez nos fonctionnalités principales.",
      placement: "right",
    },
    {
      target: ".cta",
      content: "Commencez votre expérience ici!",
      placement: "top",
    },
  ];

  return (
    <OnBoarder
      steps={steps}
      onComplete={() => console.log("Onboarding terminé!")}
    />
  );
}

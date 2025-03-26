"use client";

import { Button } from "@repo/ui/button";
import { OnBoarder, OnBoarderProvider, useOnBoarder } from "onboarder";

const StepContent = () => {
  const { currentStepIndex, totalSteps, isFirstStep, isLastStep } =
    useOnBoarder();

  return (
    <>
      <OnBoarder.Title className="text-xl font-bold">
        Étape {currentStepIndex + 1} sur {totalSteps}
      </OnBoarder.Title>
      <OnBoarder.Content>
        {isFirstStep && "Bienvenue dans notre guide d'utilisation !"}
        {!isFirstStep && !isLastStep && "Continuons avec la découverte..."}
        {isLastStep && "Vous avez terminé le guide !"}
      </OnBoarder.Content>
      <OnBoarder.Controls className="flex items-center justify-end gap-2 mt-4">
        {currentStepIndex > 0 && (
          <OnBoarder.Prev asChild>
            <Button className="py-1 px-2 rounded-md cursor-pointer">
              Précédent
            </Button>
          </OnBoarder.Prev>
        )}
        {currentStepIndex < totalSteps - 1 && (
          <OnBoarder.Next asChild>
            <Button className="py-1 px-2 rounded-md cursor-pointer">
              Suivant
            </Button>
          </OnBoarder.Next>
        )}
        <OnBoarder.Finish asChild>
          <Button className="py-1 px-2 rounded-md cursor-pointer">
            Terminer
          </Button>
        </OnBoarder.Finish>
      </OnBoarder.Controls>
    </>
  );
};

export const OnBoarderComp = () => {
  return (
    <OnBoarderProvider>
      <OnBoarder.Root>
        <OnBoarder.Step
          selector="#mon-selector"
          placement="top"
          className="min-w-[300px] rounded-md p-4 bg-white shadow-md"
        >
          <StepContent />
        </OnBoarder.Step>

        <OnBoarder.Step
          selector="#mon-selector-2"
          placement="bottom"
          className="min-w-[300px] rounded-md p-4 bg-white shadow-md"
        >
          <StepContent />
        </OnBoarder.Step>
      </OnBoarder.Root>
    </OnBoarderProvider>
  );
};

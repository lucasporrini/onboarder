"use client";

import { Button } from "@repo/ui/button";
import { OnBoarder, OnBoarderProvider } from "onboarder";

export const OnBoarderComp = () => {
  return (
    <OnBoarderProvider>
      <OnBoarder.Root>
        <OnBoarder.Step
          selector="#mon-selector"
          placement="top"
          className="min-w-[300px] rounded-md p-4 bg-white shadow-md"
        >
          <OnBoarder.Title className="text-2xl font-bold">
            Bienvenue !
          </OnBoarder.Title>
          <OnBoarder.Content>
            Ceci est la première étape de votre onboarding.
          </OnBoarder.Content>
          <OnBoarder.Controls className="flex items-center justify-end gap-2">
            <OnBoarder.Prev asChild>
              <Button className="py-1 px-2 rounded-md cursor-pointer">
                Précédent
              </Button>
            </OnBoarder.Prev>
            <OnBoarder.Next asChild>
              <Button className="py-1 px-2 rounded-md cursor-pointer">
                Suivant
              </Button>
            </OnBoarder.Next>
            <OnBoarder.Finish asChild>
              <Button className="py-1 px-2 rounded-md cursor-pointer">
                Terminer
              </Button>
            </OnBoarder.Finish>
          </OnBoarder.Controls>
        </OnBoarder.Step>

        <OnBoarder.Step
          selector="#mon-selector-2"
          placement="bottom"
          className="min-w-[300px] rounded-md p-4 bg-white shadow-md"
        >
          <OnBoarder.Title className="text-2xl font-bold">
            Votre profil
          </OnBoarder.Title>
          <OnBoarder.Content>
            Ici vous pouvez gérer vos informations personnelles.
          </OnBoarder.Content>
          <OnBoarder.Controls className="flex items-center justify-end gap-2">
            <OnBoarder.Prev asChild>
              <Button className="py-1 px-2 rounded-md cursor-pointer">
                Précédent
              </Button>
            </OnBoarder.Prev>
            <OnBoarder.Next asChild>
              <Button className="py-1 px-2 rounded-md cursor-pointer">
                Suivant
              </Button>
            </OnBoarder.Next>
            <OnBoarder.Finish asChild>
              <Button className="py-1 px-2 rounded-md cursor-pointer">
                Terminer
              </Button>
            </OnBoarder.Finish>
          </OnBoarder.Controls>
        </OnBoarder.Step>

        {/* <OnBoarder.Controls>
          <OnBoarder.Prev>Précédent</OnBoarder.Prev>
          <OnBoarder.Next>Suivant</OnBoarder.Next>
          <OnBoarder.Finish>Terminer</OnBoarder.Finish>
        </OnBoarder.Controls> */}
      </OnBoarder.Root>
    </OnBoarderProvider>
  );
};

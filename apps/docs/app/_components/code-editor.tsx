"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

const files = {
  "onboarder/step-content.tsx": `"use client";

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
};`,
  "onboarder/comp.tsx": `"use client";

import { OnBoarder, OnBoarderProvider } from "onboarder";
import { StepContent } from "./step-content";

export const OnBoarderComp = () => {
  return (
    <OnBoarderProvider>
      <OnBoarder.Root>
        <OnBoarder.Step
          selector="#my-selector"
          placement="top"
          className="min-w-[300px] rounded-md p-4 bg-white shadow-md"
        >
          <StepContent />
        </OnBoarder.Step>

        <OnBoarder.Step
          selector="#my-selector-2"
          placement="bottom"
          className="min-w-[300px] rounded-md p-4 bg-white shadow-md"
        >
          <StepContent />
        </OnBoarder.Step>
      </OnBoarder.Root>
    </OnBoarderProvider>
  );
};`,
};

export const CodeEditor = () => {
  const [currentFile, setCurrentFile] = useState("onboarder/step-content.tsx");

  return (
    <div className="fixed bottom-0 right-0 shadow-lg lg:w-[50%] w-full rounded-tl-full">
      <div className="bg-gradient-to-r from-gray-300 to-neutral-600 dark:from-gray-500 dark:to-neutral-800 [clip-path:inset(0)] lg:rounded-tl-[50px]">
        <div className="relative px-6 pt-8 sm:pt-12 md:pl-12 md:pr-0">
          <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
            <div className="w-screen overflow-hidden rounded-tl-2xl bg-neutral-950">
              <div className="flex bg-neutral-900/40 ring-1 ring-white/5">
                <div className="-mb-px flex text-sm/6 font-medium text-neutral-400">
                  {Object.keys(files).map((file) => (
                    <button
                      key={file}
                      onClick={() => setCurrentFile(file)}
                      className={`px-4 py-2 border-b border-r ${
                        currentFile === file
                          ? "border-b border-r-transparent bg-white/5 px-4 py-2 text-white"
                          : "border-r border-b-transparent border-neutral-600/10 px-4 py-2"
                      }`}
                    >
                      {file}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-6 pb-14 pt-4 code-block h-[calc(100vh-650px)] lg:h-[525px] overflow-auto">
                {/* @ts-ignore */}
                <SyntaxHighlighter language="typescript" style={theme}>
                  {files[currentFile as keyof typeof files]}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

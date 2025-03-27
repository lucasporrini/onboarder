import { StarsBackground } from "@repo/ui/stars-background";
import { Buttons } from "../_components/buttons";
import { CodeEditor } from "../_components/code-editor";
import { Socials } from "../_components/socials";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <div className="fixed top-0 left-0 w-full z-10 px-32 py-16 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Onboarder</h1>
        <Socials />
      </div>
      <StarsBackground className="absolute inset-0 rounded-xl z-0">
        <div className="relative flex flex-1 justify-start items-center h-screen w-screen p-32">
          <div className="space-y-6 max-w-lg">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-white !leading-relaxed lg:!leading-snug text-start">
              Create your onboarding flow in minutes
            </h1>
            <p className="text-base text-neutral-500 dark:text-neutral-400 max-w-2xl">
              Take your project to the next level with a custom onboarding flow
            </p>
            <Buttons />
          </div>
          <CodeEditor />
        </div>
      </StarsBackground>
    </main>
  );
}

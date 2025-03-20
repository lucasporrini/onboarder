import React from "react";
import { OnboardingOptions, OnboardingStep } from "./lib/types";

export interface OnboardingProps {
  steps: OnboardingStep[];
  options: OnboardingOptions;
  children: React.ReactNode;
}

const Onboarding = ({ steps, options, children }: OnboardingProps) => {
  console.log(steps, options);
  return (
    <div>
      <h1>OnBoarding</h1>
      {children}
    </div>
  );
};

export default Onboarding;

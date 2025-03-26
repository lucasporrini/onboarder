# Onboarder

A simple and powerful React package for creating interactive onboarding experiences in your applications.

## Installation

```bash
npm install onboarder
# or
yarn add onboarder
```

## Features

- 🚀 Easy to integrate
- 🎨 Composable components
- 📱 Responsive
- 🔄 Smooth navigation
- ⚛️ React compatible
- 🎯 Precise element targeting
- 🌈 Customizable themes
- 🔍 Element highlighting
- ⌨️ Keyboard shortcuts support
- 🖱️ Close on overlay click

## Basic Usage

```tsx
"use client";

import { OnBoarder, OnBoarderProvider } from "onboarder";

function App() {
  return (
    <OnBoarderProvider>
      <OnBoarder.Root>
        <OnBoarder.Step
          selector="#welcome-button"
          placement="top"
          className="min-w-[300px] rounded-md p-4 bg-white shadow-md"
        >
          <OnBoarder.Title className="text-2xl font-bold">
            Welcome!
          </OnBoarder.Title>
          <OnBoarder.Content>
            This is the first step of your onboarding.
          </OnBoarder.Content>
          <OnBoarder.Controls className="flex items-center justify-end gap-2">
            <OnBoarder.Prev>Previous</OnBoarder.Prev>
            <OnBoarder.Next>Next</OnBoarder.Next>
            <OnBoarder.Finish>Finish</OnBoarder.Finish>
          </OnBoarder.Controls>
        </OnBoarder.Step>

        <OnBoarder.Step
          selector="#profile-section"
          placement="bottom"
          className="min-w-[300px] rounded-md p-4 bg-white shadow-md"
        >
          <OnBoarder.Title className="text-2xl font-bold">
            Your Profile
          </OnBoarder.Title>
          <OnBoarder.Content>
            Here you can manage your personal information.
          </OnBoarder.Content>
          <OnBoarder.Controls className="flex items-center justify-end gap-2">
            <OnBoarder.Prev>Previous</OnBoarder.Prev>
            <OnBoarder.Next>Next</OnBoarder.Next>
            <OnBoarder.Finish>Finish</OnBoarder.Finish>
          </OnBoarder.Controls>
        </OnBoarder.Step>
      </OnBoarder.Root>
    </OnBoarderProvider>
  );
}
```

## Components

### OnBoarderProvider

The root provider component that manages the onboarding state.

```tsx
<OnBoarderProvider>
  <OnBoarder.Root>{/* Steps */}</OnBoarder.Root>
</OnBoarderProvider>
```

### OnBoarder.Root

The container component that manages the steps and navigation.

```tsx
<OnBoarder.Root onStepChange={handleStepChange} onComplete={handleComplete}>
  {/* Steps */}
</OnBoarder.Root>
```

### OnBoarder.Step

Defines an onboarding step with its target element and content.

```tsx
<OnBoarder.Step
  selector="#target-element"
  placement="top"
  offset={20}
  highlight={true}
  className="custom-class"
>
  {/* Step content */}
</OnBoarder.Step>
```

### OnBoarder.Title

The title component for each step.

```tsx
<OnBoarder.Title className="text-2xl font-bold">Step Title</OnBoarder.Title>
```

### OnBoarder.Content

The content component for each step.

```tsx
<OnBoarder.Content>Step content goes here</OnBoarder.Content>
```

### OnBoarder.Controls

Container for navigation controls.

```tsx
<OnBoarder.Controls className="flex gap-2">
  <OnBoarder.Prev>Previous</OnBoarder.Prev>
  <OnBoarder.Next>Next</OnBoarder.Next>
  <OnBoarder.Finish>Finish</OnBoarder.Finish>
</OnBoarder.Controls>
```

### Navigation Buttons

- `OnBoarder.Prev`: Previous step button
- `OnBoarder.Next`: Next step button
- `OnBoarder.Finish`: Finish button (appears on last step)
- `OnBoarder.Skip`: Skip the entire onboarding

## Using the useOnBoarder Hook

The `useOnBoarder` hook provides access to the onboarding state and controls:

```tsx
const StepContent = () => {
  const {
    currentStepIndex, // Current step index (0-based)
    totalSteps, // Total number of steps
    isFirstStep, // Is this the first step?
    isLastStep, // Is this the last step?
    isOpen, // Is the onboarding open?
    next, // Function to go to next step
    prev, // Function to go to previous step
    stop, // Function to stop onboarding
    currentStep, // Current step data
    position, // Current step position
    onStepChange, // Callback for step changes
    onComplete, // Callback for completion
  } = useOnBoarder();

  return (
    <>
      <OnBoarder.Title>
        Step {currentStepIndex + 1} of {totalSteps}
      </OnBoarder.Title>
      <OnBoarder.Content>
        {isFirstStep && "Welcome to our guide!"}
        {!isFirstStep && !isLastStep && "Let's continue..."}
        {isLastStep && "You've completed the guide!"}
      </OnBoarder.Content>
      <OnBoarder.Controls>
        {!isFirstStep && <OnBoarder.Prev>Previous</OnBoarder.Prev>}
        {!isLastStep && <OnBoarder.Next>Next</OnBoarder.Next>}
        {isLastStep && <OnBoarder.Finish>Finish</OnBoarder.Finish>}
      </OnBoarder.Controls>
    </>
  );
};
```

## Props

### OnBoarderProvider Props

```typescript
interface OnBoarderProviderProps {
  children: ReactNode;
  onStepChange?: (index: number) => void;
  onComplete?: () => void;
}
```

### OnBoarder.Step Props

```typescript
interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  selector: string; // CSS selector for target element
  placement?: "top" | "bottom" | "left" | "right" | "center";
  offset?: number; // Distance from target element
  highlight?: boolean; // Highlight target element
  highlightColor?: string; // Highlight color
  highlightBorderRadius?: string; // Highlight border radius
  isModal?: boolean; // Display as modal
  beforeEnter?: () => void | Promise<void>;
  afterExit?: () => void | Promise<void>;
}
```

## Examples

### Conditional Steps

```tsx
const StepContent = () => {
  const { currentStepIndex, totalSteps } = useOnBoarder();

  return (
    <>
      <OnBoarder.Title>
        {currentStepIndex === 0 && "Welcome!"}
        {currentStepIndex === 1 && "Profile Setup"}
        {currentStepIndex === 2 && "Final Step"}
      </OnBoarder.Title>
      <OnBoarder.Content>
        {currentStepIndex === 0 && "Let's get started..."}
        {currentStepIndex === 1 && "Set up your profile..."}
        {currentStepIndex === 2 && "You're all set!"}
      </OnBoarder.Content>
      <OnBoarder.Controls>
        <OnBoarder.Prev>Previous</OnBoarder.Prev>
        <OnBoarder.Next>Next</OnBoarder.Next>
        <OnBoarder.Finish>Finish</OnBoarder.Finish>
      </OnBoarder.Controls>
    </>
  );
};
```

### Progress Tracking

```tsx
const StepContent = () => {
  const { currentStepIndex, totalSteps, onStepChange } = useOnBoarder();

  useEffect(() => {
    onStepChange?.((index) => {
      console.log(`Moving to step ${index + 1}`);
      // Save progress to localStorage
      localStorage.setItem("onboardingStep", index.toString());
    });
  }, [onStepChange]);

  return (
    <>
      <OnBoarder.Title>
        Progress: {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%
      </OnBoarder.Title>
      {/* Rest of the content */}
    </>
  );
};
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

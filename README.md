# Onboarder

A modern, customizable onboarding package for React applications using Tailwind CSS and Origin UI.

## Features

- 🎨 Modern and clean UI design
- 🎯 Easy to implement step-by-step guides
- 🎭 Customizable themes and styles
- ⌨️ Keyboard navigation support
- 📱 Mobile-friendly
- 🔄 Smooth transitions and animations
- 🎮 Game-like experience

## Installation

```bash
npm install onboarder
# or
yarn add onboarder
```

## Quick Start

```tsx
import { OnboardingManager } from "onboarder";

function App() {
  const steps = [
    {
      target: "#welcome",
      content: "Welcome to our app! Let's get started.",
      title: "Welcome",
    },
    {
      target: "#features",
      content: "Here are our main features.",
      title: "Features",
    },
    // Add more steps as needed
  ];

  return (
    <OnboardingManager
      steps={steps}
      onComplete={() => console.log("Onboarding completed!")}
    />
  );
}
```

## Props

| Prop           | Type         | Default        | Description                                    |
| -------------- | ------------ | -------------- | ---------------------------------------------- |
| `steps`        | `Step[]`     | `[]`           | Array of steps for the onboarding tour         |
| `onComplete`   | `() => void` | -              | Callback function when onboarding is completed |
| `theme`        | `Theme`      | `defaultTheme` | Custom theme object for styling                |
| `showProgress` | `boolean`    | `true`         | Whether to show progress indicator             |
| `showSkip`     | `boolean`    | `true`         | Whether to show skip button                    |
| `showBack`     | `boolean`    | `true`         | Whether to show back button                    |

## Step Object

```typescript
interface Step {
  target: string; // CSS selector for the target element
  content: string; // Content to display
  title?: string; // Optional title
  placement?: "top" | "bottom" | "left" | "right"; // Tooltip placement
  disableBeacon?: boolean; // Whether to show beacon
}
```

## Customization

### Theme

```tsx
const customTheme = {
  primary: "#007bff",
  secondary: "#6c757d",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  // Add more theme properties
};

<OnboardingManager steps={steps} theme={customTheme} />;
```

### Styling

You can customize the appearance using Tailwind CSS classes:

```tsx
<OnboardingManager steps={steps} className="custom-onboarding" />
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

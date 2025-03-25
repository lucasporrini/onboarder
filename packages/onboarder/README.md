# Onboarder

Un package React simple et puissant pour créer des expériences d'onboarding interactives dans vos applications.

## Installation

```bash
npm install onboarder
# ou
yarn add onboarder
```

## Caractéristiques

- 🚀 Facile à intégrer
- 🎨 Personnalisable
- 📱 Responsive
- 🔄 Navigation fluide
- ⚛️ Compatible React
- 🎯 Ciblage d'éléments précis
- 🌈 Thèmes personnalisables
- 🔍 Mise en surbrillance des éléments
- ⌨️ Support des raccourcis clavier
- 🖱️ Fermeture par clic sur l'overlay

## Utilisation de base

```tsx
"use client";

import { Onboarder } from "onboarder";

function App() {
  const steps = [
    {
      target: "#welcome-button",
      title: "Bienvenue !",
      content: "Ceci est la première étape de votre onboarding.",
      placement: "bottom",
      highlight: true, // Met en surbrillance l'élément cible
    },
    {
      target: ".profile-section",
      title: "Votre profil",
      content: "Ici vous pouvez gérer vos informations personnelles.",
      placement: "right",
      highlight: true,
    },
  ];

  return (
    <div>
      <Onboarder steps={steps} />
      {/* Votre application */}
    </div>
  );
}
```

## Configuration avancée

### Personnalisation du thème

```tsx
const customTheme = {
  primary: "#007bff",
  secondary: "#6c757d",
  textColor: "#333",
  backgroundColor: "#fff",
  borderRadius: "8px",
  highlight: {
    color: "rgba(0, 0, 0, 0.5)",
    borderRadius: "4px",
    opacity: 0.5,
  },
};

<Onboarder steps={steps} theme={customTheme} />;
```

### Contrôle programmatique

```tsx
"use client";

import { useState } from "react";
import { Onboarder } from "onboarder";

function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOnboardingOpen(true)}>
        Démarrer l'onboarding
      </button>

      <Onboarder
        steps={steps}
        isOpen={isOnboardingOpen}
        onOpenChange={setIsOnboardingOpen}
        onComplete={() => console.log("Onboarding terminé !")}
        closeOnEscape={true}
        closeOnOverlayClick={true}
        highlightTargets={true}
      />
    </div>
  );
}
```

### Options de configuration

| Option              | Type                      | Description                                |
| ------------------- | ------------------------- | ------------------------------------------ |
| steps               | Step[]                    | Liste des étapes de l'onboarding           |
| isOpen              | boolean                   | Contrôle l'affichage de l'onboarding       |
| theme               | Theme                     | Personnalisation du thème                  |
| showProgress        | boolean                   | Affiche la barre de progression            |
| showSkip            | boolean                   | Affiche le bouton "Passer"                 |
| highlightTargets    | boolean                   | Met en surbrillance les éléments cibles    |
| startOnMount        | boolean                   | Démarre l'onboarding au montage            |
| closeOnEscape       | boolean                   | Permet de fermer avec la touche Escape     |
| closeOnOverlayClick | boolean                   | Permet de fermer en cliquant sur l'overlay |
| onComplete          | () => void                | Callback appelé à la fin de l'onboarding   |
| onClose             | () => void                | Callback appelé à la fermeture             |
| onOpenChange        | (isOpen: boolean) => void | Callback appelé lors du changement d'état  |

### Interface Step

```typescript
interface Step {
  target: string; // Sélecteur CSS de l'élément cible
  title: string; // Titre de l'étape
  content: string; // Contenu de l'étape
  placement?: Placement; // Position de la bulle (top, bottom, left, right)
  offset?: number; // Décalage par rapport à la cible
  highlight?: boolean; // Met en surbrillance l'élément cible
  highlightColor?: string; // Couleur de la surbrillance
  highlightBorderRadius?: string; // Rayon de la bordure de la surbrillance
}
```

## Exemples d'utilisation

### Onboarding avec étapes conditionnelles

```tsx
"use client";

import { useState } from "react";
import { Onboarder } from "onboarder";

function App() {
  const [userType, setUserType] = useState("basic");

  const getSteps = () => {
    const commonSteps = [
      {
        target: "#welcome",
        title: "Bienvenue !",
        content: "Commençons votre parcours.",
        placement: "bottom",
      },
    ];

    if (userType === "premium") {
      return [
        ...commonSteps,
        {
          target: "#premium-features",
          title: "Fonctionnalités Premium",
          content: "Découvrez nos fonctionnalités avancées.",
          placement: "right",
        },
      ];
    }

    return commonSteps;
  };

  return (
    <div>
      <Onboarder steps={getSteps()} />
    </div>
  );
}
```

### Onboarding avec sauvegarde de progression

```tsx
"use client";

import { useState, useEffect } from "react";
import { Onboarder } from "onboarder";

function App() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const savedStep = localStorage.getItem("onboardingStep");
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    localStorage.setItem("onboardingStep", step.toString());
  };

  return (
    <Onboarder
      steps={steps}
      currentStep={currentStep}
      onStepChange={handleStepChange}
    />
  );
}
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

ISC

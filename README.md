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

## Utilisation de base

```tsx
import { Onboarder, Step } from "onboarder";

function App() {
  const steps = [
    {
      target: "#welcome-button",
      title: "Bienvenue !",
      content: "Ceci est la première étape de votre onboarding.",
      placement: "bottom",
    },
    {
      target: ".profile-section",
      title: "Votre profil",
      content: "Ici vous pouvez gérer vos informations personnelles.",
      placement: "right",
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

## Utilisation avec Next.js

Si vous utilisez Next.js, assurez-vous d'ajouter la directive "use client" en haut de votre composant :

```tsx
"use client";

import { Onboarder } from "onboarder";

function YourComponent() {
  const steps = [
    {
      target: "#welcome-button",
      title: "Bienvenue !",
      content: "Ceci est la première étape de votre onboarding.",
      placement: "bottom",
    },
  ];

  return (
    <div>
      <Onboarder
        steps={steps}
        onComplete={() => console.log("Onboarding terminé !")}
      />
      {/* Votre contenu */}
    </div>
  );
}

export default YourComponent;
```

Cette directive est nécessaire car Onboarder utilise des fonctionnalités interactives qui nécessitent d'être exécutées côté client.

## Configuration

### Props de l'Onboarder

| Prop       | Type       | Description                              |
| ---------- | ---------- | ---------------------------------------- |
| steps      | Step[]     | Liste des étapes de l'onboarding         |
| onComplete | () => void | Callback appelé à la fin de l'onboarding |
| theme      | Theme      | Personnalisation du thème                |
| isOpen     | boolean    | Contrôle l'affichage de l'onboarding     |
| onClose    | () => void | Callback appelé à la fermeture           |

### Interface Step

```typescript
interface Step {
  target: string; // Sélecteur CSS de l'élément cible
  title: string; // Titre de l'étape
  content: string; // Contenu de l'étape
  placement?: Placement; // Position de la bulle (top, bottom, left, right)
  offset?: number; // Décalage par rapport à la cible
}
```

## Exemples avancés

### Personnalisation du thème

```tsx
const customTheme = {
  primary: "#007bff",
  secondary: "#6c757d",
  textColor: "#333",
  backgroundColor: "#fff",
  borderRadius: "8px",
  // ...autres propriétés de thème
};

<Onboarder steps={steps} theme={customTheme} />;
```

### Contrôle programmatique

```tsx
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
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => console.log("Onboarding terminé !")}
      />
    </div>
  );
}
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

ISC

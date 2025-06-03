import { Step } from "onboarder";

export const demoSteps: Step[] = [
  {
    target: "#welcome-section",
    content: (
      <div>
        <h3>Bienvenue dans le test d&apos;Onboarder ! 🎉</h3>
        <p>
          Ce package vous permet de créer des expériences d&apos;onboarding
          interactives.
        </p>
        <p>Utilisez les boutons ci-dessous pour naviguer.</p>
      </div>
    ),
    position: "bottom",
  },
  {
    target: "#profile-card",
    content: (
      <div>
        <h3>Section Profil 👤</h3>
        <p>
          Voici une carte de profil utilisateur. L&apos;onboarder peut cibler
          n&apos;importe quel élément HTML.
        </p>
      </div>
    ),
    position: "right",
  },
  {
    target: "#action-buttons",
    content: (
      <div>
        <h3>Boutons d&apos;Action 🎮</h3>
        <p>
          Ces boutons permettent de contrôler l&apos;onboarder
          programmatiquement.
        </p>
        <ul>
          <li>Démarrer/Arrêter le tour</li>
          <li>Changer de thème</li>
          <li>Tester différentes configurations</li>
        </ul>
      </div>
    ),
    position: "top",
  },
  {
    target: "#settings-panel",
    content: (
      <div>
        <h3>Panneau de Configuration ⚙️</h3>
        <p>Ici vous pouvez ajuster les paramètres de l&apos;onboarder :</p>
        <ul>
          <li>Thèmes personnalisés</li>
          <li>Positions des tooltips</li>
          <li>Comportements d&apos;interaction</li>
        </ul>
      </div>
    ),
    position: "top",
  },
];

export const themes = {
  default: undefined,
  dark: {
    tooltip: {
      backgroundColor: "#1f2937",
      textColor: "#f9fafb",
      borderColor: "#374151",
      borderRadius: "12px",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
    buttons: {
      primary: {
        backgroundColor: "#3b82f6",
        textColor: "#ffffff",
        hoverBackgroundColor: "#2563eb",
      },
      secondary: {
        backgroundColor: "#6b7280",
        textColor: "#ffffff",
        hoverBackgroundColor: "#4b5563",
      },
    },
  },
  colorful: {
    tooltip: {
      backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      textColor: "#ffffff",
      borderRadius: "20px",
      padding: "24px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    buttons: {
      primary: {
        backgroundColor: "#f59e0b",
        textColor: "#ffffff",
        hoverBackgroundColor: "#d97706",
      },
      secondary: {
        backgroundColor: "#8b5cf6",
        textColor: "#ffffff",
        hoverBackgroundColor: "#7c3aed",
      },
    },
  },
} as const;

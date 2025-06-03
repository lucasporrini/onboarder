"use client";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";
import { OnBoarder, useOnBoarder } from "onboarder";
import { useEffect } from "react";
import { demoSteps } from "../lib/constantes";

// Composant principal avec le Provider
export default function HomePage() {
  const { start, isOpen, components } = useOnBoarder();

  useEffect(() => {
    start(demoSteps);
  }, [start]);

  return (
    <>
      {/* Interface de l'onboarding */}
      <OnBoarder.Root
        style={{
          backgroundColor: "white",
          color: "black",
          borderRadius: "10px",
          padding: "4px",
        }}
      >
        <OnBoarder.Content>
          <OnBoarder.Buttons>
            <OnBoarder.Prev className="flex items-center justify-center">
              <ChevronLeftIcon className="w-4 h-4" />
            </OnBoarder.Prev>
            <OnBoarder.Next className="flex items-center justify-center">
              <ChevronRightIcon className="w-4 h-4" />
            </OnBoarder.Next>
            <OnBoarder.Close>
              <XIcon className="w-4 h-4" />
            </OnBoarder.Close>
          </OnBoarder.Buttons>
        </OnBoarder.Content>
      </OnBoarder.Root>

      {/* Contenu de votre page */}
      <div style={{ padding: "20px", color: "black" }}>
        <div
          id="welcome-section"
          style={{ padding: "20px", background: "#e7f3ff", margin: "20px 0" }}
        >
          <h1>Bienvenue sur ma page ! 👋</h1>
          <p>
            Cliquez sur &quot;Démarrer l&apos;Onboarding&quot; pour commencer le
            tour guidé.
          </p>
        </div>

        <div
          id="profile-card"
          style={{ padding: "20px", background: "#fff3cd", margin: "20px 0" }}
        >
          <h2>Profil Utilisateur</h2>
          <p>Lucas Porrini - Développeur</p>
          <p>Package Onboarder v0.0.42</p>
        </div>

        <div
          id="settings-panel"
          style={{ padding: "20px", background: "#d1ecf1", margin: "20px 0" }}
        >
          <h2>Paramètres</h2>
          <p>Configuration de l&apos;application</p>
          <ul>
            <li>Thème: Clair</li>
            <li>Langue: Français</li>
            <li>Notifications: Activées</li>
          </ul>
        </div>
      </div>
      <div
        id="action-buttons"
        style={{ padding: "20px", background: "#f0f0f0", color: "black" }}
      >
        <h3>Contrôles de l&apos;Onboarding</h3>
        <p>État: {isOpen ? "🟢 Actif" : "🔴 Inactif"}</p>
      </div>
    </>
  );
}

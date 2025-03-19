import React, { useEffect, useRef } from 'react';
import { OnboardingConfig } from '../lib/types';
import OnboardingManagerCore from './on-boarding-manager';

interface OnboardingManagerProps extends Omit<OnboardingConfig, 'options'> {
  onComplete?: () => void;
  showProgress?: boolean;
  showSkip?: boolean;
  showBack?: boolean;
  className?: string;
}

const OnboardingManager: React.FC<OnboardingManagerProps> = ({
  steps,
  onComplete,
  showProgress = true,
  showSkip = true,
  showBack = true,
  className,
}) => {
  const managerRef = useRef<OnboardingManagerCore | null>(null);

  useEffect(() => {
    if (!managerRef.current) {
      managerRef.current = new OnboardingManagerCore({
        steps,
        options: {
          showProgress,
          showSkip,
          showBack,
          tooltipClass: className,
        },
      });

      // Ajouter les gestionnaires d'événements
      const handleComplete = () => {
        if (onComplete) {
          onComplete();
        }
        managerRef.current?.destroy();
      };

      // Démarrer le tour
      managerRef.current.start();
    }

    return () => {
      if (managerRef.current) {
        managerRef.current.destroy();
        managerRef.current = null;
      }
    };
  }, [steps, onComplete, showProgress, showSkip, showBack, className]);

  return null;
};

export default OnboardingManager;

import { useCallback, useEffect, useState } from "react";
import { Step } from "../types";

type Position = {
  top: number;
  left: number;
  transform: string;
};

export const usePosition = (step: Step | undefined) => {
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    transform: "translate(0, 0)",
  });

  const updatePosition = useCallback(() => {
    if (step?.target) {
      const target = document.querySelector(step.target);
      if (target) {
        const rect = target.getBoundingClientRect();
        const placement = step.placement || "bottom";
        const offset = step.offset || 10;

        let top = rect.bottom + offset;
        let left = rect.left + rect.width / 2;
        let transform = "translate(-50%, 0)";

        switch (placement) {
          case "top":
            top = rect.top - offset;
            left = rect.left + rect.width / 2;
            transform = "translate(-50%, -100%)";
            break;
          case "right":
            top = rect.top + rect.height / 2;
            left = rect.right + offset;
            transform = "translate(0, -50%)";
            break;
          case "left":
            top = rect.top + rect.height / 2;
            left = rect.left - offset;
            transform = "translate(-100%, -50%)";
            break;
          case "center":
            top = rect.top + rect.height / 2;
            left = rect.left + rect.width / 2;
            transform = "translate(-50%, -50%)";
            break;
        }

        top += window.scrollY;
        left += window.scrollX;

        setPosition({ top, left, transform });
      }
    }
  }, [step]);

  useEffect(() => {
    updatePosition();

    const handleResize = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [updatePosition]);

  return position;
};

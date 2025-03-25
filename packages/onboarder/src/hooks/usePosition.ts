import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (step?.target) {
      const target = document.querySelector(step.target);
      if (target) {
        const rect = target.getBoundingClientRect();
        const position = step.position || "bottom";

        let top = rect.bottom + 10;
        let left = rect.left + rect.width / 2;
        let transform = "translate(-50%, 0)";

        switch (position) {
          case "top":
            top = rect.top - 10;
            left = rect.left + rect.width / 2;
            transform = "translate(-50%, -100%)";
            break;
          case "right":
            top = rect.top + rect.height / 2;
            left = rect.right + 10;
            transform = "translate(0, -50%)";
            break;
          case "left":
            top = rect.top + rect.height / 2;
            left = rect.left - 10;
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

  return position;
};

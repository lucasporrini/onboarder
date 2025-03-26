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
      const onboarderElement = document.querySelector(
        "[data-onboarder-step]"
      ) as HTMLElement;

      if (target && onboarderElement) {
        const rect = target.getBoundingClientRect();
        const onboarderRect = onboarderElement.getBoundingClientRect();
        const placement = step.placement || "bottom";
        const offset = step.offset || 10;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

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

        // Ensure the onboarder stays within viewport bounds
        const onboarderWidth = onboarderRect.width;
        const onboarderHeight = onboarderRect.height;

        // Calculate how much the onboarder is overflowing
        const overflowRight = left + onboarderWidth - viewportWidth;
        const overflowLeft = -left;
        const overflowBottom = top + onboarderHeight - viewportHeight;
        const overflowTop = -top;

        // Adjust position based on overflow
        if (overflowRight > 0) {
          left -= overflowRight;
        }
        if (overflowLeft > 0) {
          left += overflowLeft;
        }
        if (overflowBottom > 0) {
          top -= overflowBottom;
        }
        if (overflowTop > 0) {
          top += overflowTop;
        }

        setPosition({ top, left, transform });
      }
    }
  }, [step]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let resizeObserver: ResizeObserver;

    const initializePosition = () => {
      // Initial delay to ensure the onboarder is rendered
      timeoutId = setTimeout(() => {
        updatePosition();

        // Set up ResizeObserver to track onboarder size changes
        const onboarderElement = document.querySelector(
          "[data-onboarder-step]"
        );
        if (onboarderElement) {
          resizeObserver = new ResizeObserver(() => {
            updatePosition();
          });
          resizeObserver.observe(onboarderElement);
        }
      }, 100); // Increased delay for first render
    };

    initializePosition();

    const handleResize = () => {
      requestAnimationFrame(updatePosition);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);

    return () => {
      clearTimeout(timeoutId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [updatePosition]);

  return position;
};

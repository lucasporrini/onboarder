"use client";

import { cn } from "@repo/ui/utils";
import { useEffect, useState } from "react";

export const Logo = ({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          setMode(html.classList.contains("dark") ? "dark" : "light");
        }
      });
    });

    observer.observe(html, { attributes: true });
    setMode(html.classList.contains("dark") ? "dark" : "light");

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      className={cn(className)}
      width={width}
      height={height}
      viewBox="0 0 199 199"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M146.333 93.7142L108.124 55.5058C106.047 53.4387 103.026 52.6367 100.197 53.4017C97.3684 54.1668 95.1628 56.3827 94.4111 59.2148C93.6594 62.047 94.4757 65.065 96.5525 67.1321L120.733 91.2579H58.4533C53.9315 91.2579 50.2658 94.9236 50.2658 99.4454C50.2658 103.967 53.9315 107.633 58.4533 107.633H120.733L96.5525 131.759C94.2139 134.1 93.5149 137.619 94.7809 140.677C96.0469 143.734 99.029 145.729 102.338 145.732C104.536 145.699 106.625 144.773 108.124 143.167L146.333 104.958C149.525 101.762 149.525 96.5832 146.333 93.3867V93.7142Z"
        fill={mode === "light" ? "#242424" : "#FFF"}
      />
      <circle
        cx="99.5"
        cy="99.5"
        r="99.5"
        fill={mode === "light" ? "#242424" : "#FFF"}
        fillOpacity="0.1"
      />
    </svg>
  );
};

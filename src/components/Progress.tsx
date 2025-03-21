import React from "react";
import { useTour } from "../hooks/useTour";

export const Progress = ({
  variant = "dots",
}: {
  variant?: "dots" | "bar";
}) => {
  const { currentStepIndex, steps } = useTour();

  if (variant === "bar") {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-center">
      {steps.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full ${
            index <= currentStepIndex
              ? "bg-blue-600"
              : "bg-gray-300 dark:bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

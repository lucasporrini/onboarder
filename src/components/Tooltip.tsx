import React, { useEffect, useState } from "react";
import { useTour } from "../hooks/useTour";

export const Tooltip = () => {
  const { currentStep, next, prev, stop } = useTour();
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [targetSize, setTargetSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (currentStep?.target) {
      const target = document.querySelector(currentStep.target);
      if (target) {
        const rect = target.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
        });
        setTargetSize({
          width: rect.width,
          height: rect.height,
        });
      }
    }
  }, [currentStep]);

  if (!currentStep || currentStep.isModal) return null;

  return (
    <div
      className="absolute z-[9999] p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-sm transition-all"
      style={{
        top: `${position.top + targetSize.height + 10}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="mb-4">{currentStep.content}</div>
      <div className="flex justify-between items-center">
        <button
          onClick={prev}
          className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
        >
          Back
        </button>
        <div className="flex gap-2">
          <button
            onClick={stop}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Skip
          </button>
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

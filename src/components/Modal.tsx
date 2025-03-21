import React, { useEffect } from "react";
import { useTour } from "../hooks/useTour";

export const Modal = () => {
  const { currentStep, next, prev, stop, isLastStep } = useTour();
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    if (currentStep?.isModal) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentStep]);

  if (!isVisible || !currentStep?.isModal) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <div className="mb-6 text-lg">{currentStep.content}</div>

        <div className="flex justify-between items-center">
          <button
            onClick={prev}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Previous
          </button>

          <div className="flex gap-2">
            <button
              onClick={stop}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              Skip Tour
            </button>
            <button
              onClick={next}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              {isLastStep ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

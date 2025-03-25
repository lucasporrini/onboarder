import {
  OnBoarder,
  useOnBoarder,
  usePosition,
  type Step,
  type TourContextType,
} from "../src";

describe("Onboarder exports", () => {
  test("should export all required components and hooks", () => {
    expect(OnBoarder).toBeDefined();
    expect(useOnBoarder).toBeDefined();
    expect(usePosition).toBeDefined();
  });

  test("types should be properly exported", () => {
    // Cette vérification est uniquement pour la compilation TypeScript
    const step: Step = {
      target: "#test",
      content: "Test content",
    };
    expect(typeof step).toBe("object");

    const mockSteps: Step[] = [step];
    const mockTourContext: TourContextType = {
      steps: mockSteps,
      currentStep: null,
      currentStepIndex: 0,
      isRunning: false,
      showSkip: true,
      start: () => {},
      stop: () => {},
      next: () => {},
      prev: () => {},
      isFirstStep: true,
      isLastStep: true,
      progress: 0,
    };
    expect(typeof mockTourContext).toBe("object");
  });
});

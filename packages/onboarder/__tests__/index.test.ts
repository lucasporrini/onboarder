import {
  OnBoarder,
  useOnBoarder,
  usePosition,
  type OnBoarderContextValue,
  type Step,
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
      title: "Test title",
    };
    expect(typeof step).toBe("object");

    const mockTourContext: OnBoarderContextValue = {
      totalSteps: 0,
      steps: [],
      currentStepIndex: 0,
      isOpen: false,
      next: () => {},
      prev: () => {},
      stop: () => {},
      isFirstStep: true,
      isLastStep: true,
      onStepChange: () => {},
      onComplete: () => {},
      position: { top: 0, left: 0, transform: "translate(0, 0)" },
    };
    expect(typeof mockTourContext).toBe("object");
  });
});

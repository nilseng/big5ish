import { Game, Step } from "@big5ish/types";
import { useEffect, useState } from "react";

export const useCurrentStep = (data?: { game: Game }) => {
  const [currentStep, setCurrentStep] = useState<Step>();

  useEffect(() => {
    if (data?.game) setCurrentStep(data.game.steps[data.game.currentStep]);
  }, [data]);

  return currentStep;
};

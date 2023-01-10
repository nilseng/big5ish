import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DomainPresentation } from "./DomainPresentation";

const gameQuery = gql`
  query game($gameId: ID!) {
    game(gameId: $gameId) {
      status
      steps {
        type
        duration
        domain {
          domain
          title
        }
      }
    }
  }
`;

const isLastStep = (currentStep: number, game: Game) => {
  return currentStep === game?.steps.length - 1;
};

const hasDuration = (currentStep: number, game: Game) => {
  return !!game.steps[currentStep].duration;
};

export const GamePage = () => {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery<{ game: Game }>(gameQuery, { variables: { gameId }, pollInterval: 500 });

  const [currentStep, setCurrentStep] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      if (loading || !data) return;
      if (!hasDuration(currentStep, data.game) || isLastStep(currentStep, data.game)) return;
      setCurrentStep(currentStep + 1);
    }, data?.game.steps[currentStep].duration ?? 0);
  }, [data, loading, currentStep]);

  if (loading) return <p>Loading...</p>;

  if (error || !data) return <p>The machinery is broken⚙️🤖</p>;

  return (
    <DomainPresentation
      currentStep={currentStep}
      stepCount={data.game.steps.length}
      domain={{ ...data.game.steps[currentStep].domain, emojis: "😡😬😱" }}
    />
  );
};

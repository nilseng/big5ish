import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { DomainPresentation } from "./DomainPresentation";

const gameQuery = gql`
  query game($gameId: ID!) {
    game(gameId: $gameId) {
      status
      steps {
        type
        domain {
          domain
          title
        }
      }
    }
  }
`;

export const GamePage = () => {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery<{ game: Game }>(gameQuery, { variables: { gameId }, pollInterval: 500 });

  const [currentStep] = useState<number>(4);

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

import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { DomainPresentationStep } from "../components/DomainPresentationStep";
import { DomainScoreGuessStep } from "../components/DomainScoreGuessStep";
import { ErrorMsg } from "../components/ErrorMsg";
import { PlayerList } from "../components/PlayerList";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { useEmojis } from "../hooks/useEmojis";
import { isDomainPresentationStep } from "../utils/typeGuards";

const gameQuery = gql`
  query game($gameId: ID!) {
    game(gameId: $gameId) {
      id
      status
      currentStep
      steps {
        type
        duration
        domain {
          domain
          title
        }
        statement
        domainId
      }
      players {
        id
        nickname
      }
      domainScoreGuesses {
        playerId
        guessedBy
        scores {
          A
          C
          E
          N
          O
        }
      }
    }
  }
`;

export const PlayerPage = () => {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery<{ game: Game }>(gameQuery, { variables: { gameId }, pollInterval: 500 });
  const currentStep = useCurrentStep(data);
  const stepCount = useMemo(
    () => data?.game?.steps.filter((step) => isDomainPresentationStep(step)).length ?? 0,
    [data?.game?.steps]
  );
  const emojis = useEmojis(currentStep);

  if (loading) return <FontAwesomeIcon className={`animate-spin text-gray-200`} icon={faSpinner} />;

  if (error || !gameId || !data?.game) {
    return <ErrorMsg msg={"Oh, no, something went wrong🤖⚙️"} />;
  }

  if (data.game.status === "created")
    return (
      <>
        <p className="text-xl font-bold text-white">Waiting for the game to start...</p>
        <PlayerList gameId={gameId} />
      </>
    );

  if (isDomainPresentationStep(currentStep)) {
    return (
      <DomainPresentationStep
        currentStep={data.game.currentStep}
        stepCount={stepCount}
        domain={{ ...currentStep.domain, emojis }}
      />
    );
  }

  return <DomainScoreGuessStep view="single" game={data.game} />;
};

import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { DomainPresentation } from "../components/DomainPresentation";
import { ErrorMsg } from "../components/ErrorMsg";
import { PlayerRating } from "../components/PlayerRating";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { useEmojis } from "../hooks/useEmojis";
import { isDomainPresentationStep } from "../utils/typeGuards";

const gameQuery = gql`
  query game($gameId: ID!) {
    game(gameId: $gameId) {
      status
      currentStep
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

export const GamePage = () => {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery<{ game: Game }>(gameQuery, { variables: { gameId }, pollInterval: 500 });
  const currentStep = useCurrentStep(data);
  const emojis = useEmojis(currentStep);

  if (loading) return <FontAwesomeIcon className={`animate-spin text-gray-200`} icon={faSpinner} />;

  if (error || !data?.game) return <ErrorMsg msg={"Oh, no, something went wrong🤖⚙️"} />;

  if (isDomainPresentationStep(currentStep))
    return (
      <DomainPresentation
        currentStep={data.game.currentStep}
        stepCount={data.game.steps.filter((step) => isDomainPresentationStep(step)).length}
        domain={{ ...currentStep.domain, emojis }}
      />
    );

  return <PlayerRating view="common" />;
};

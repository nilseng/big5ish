import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { DomainPresentation } from "../components/DomainPresentation";
import { useEmojis } from "../hooks/useEmojis";

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

  const emojis = useEmojis(data);

  if (loading) return <FontAwesomeIcon className={`animate-spin text-gray-200`} icon={faSpinner} />;

  if (error || !data?.game) return <p>The machinery is broken⚙️🤖</p>;

  return (
    <DomainPresentation
      currentStep={data.game.currentStep}
      stepCount={data.game.steps.length}
      domain={{ ...data.game.steps[data.game.currentStep].domain, emojis }}
    />
  );
};

import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { DomainPresentationStep } from "../components/DomainPresentationStep";
import { DomainScoreGuessStep } from "../components/DomainScoreGuessStep";
import { ErrorMsg } from "../components/ErrorMsg";
import { QuestionStep } from "../components/QuestionStep";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { useEmojis } from "../hooks/useEmojis";
import { getCurrentDomainPresentationStep } from "../utils/gameUtils";
import { isDomainPresentationStep, isDomainScoreGuessStep } from "../utils/typeGuards";

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
        question {
          id
          text
        }
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

export const GamePage = () => {
  const { gameId } = useParams();

  const { data, loading, error } = useQuery<{ game: Game }>(gameQuery, { variables: { gameId }, pollInterval: 500 });
  const currentStep = useCurrentStep(data);
  const emojis = useEmojis(currentStep);

  if (loading) return <FontAwesomeIcon className={`animate-spin text-gray-200`} icon={faSpinner} />;

  if (error || !data?.game) return <ErrorMsg msg={"Oh, no, something went wrong🤖⚙️"} />;

  if (isDomainPresentationStep(currentStep))
    return (
      <DomainPresentationStep
        currentStep={getCurrentDomainPresentationStep(data.game)}
        stepCount={data.game.steps.filter((step) => isDomainPresentationStep(step)).length}
        domain={{ ...currentStep.domain, emojis }}
      />
    );

  if (isDomainScoreGuessStep(currentStep)) return <DomainScoreGuessStep view="common" game={data.game} />;

  return <QuestionStep game={data.game} view={"common"} />;
};

import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { DomainPresentationStep } from "../components/DomainPresentationStep";
import { DomainScoreGuessStep } from "../components/DomainScoreGuessStep";
import { DomainSummaryStep } from "../components/DomainSummaryStep";
import { ErrorMsg } from "../components/ErrorMsg";
import { QuestionStep } from "../components/QuestionStep";
import { SummaryStep } from "../components/SummaryStep";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { useEmojis } from "../hooks/useEmojis";
import { getCurrentDomainPresentationStep } from "../utils/gameUtils";
import {
  isDomainPresentationStep,
  isDomainScoreGuessStep,
  isDomainSummaryStep,
  isQuestionStep,
} from "../utils/typeGuards";

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
          description
          facets {
            facet
          }
        }
        question {
          id
          domain
          facet
          text
          keyed
        }
      }
      players {
        id
        nickname
      }
      answers {
        playerId
        questionId
        domainId
        facet
        score
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

  const { data, loading, error, stopPolling } = useQuery<{ game: Game }>(gameQuery, {
    variables: { gameId },
    pollInterval: 500,
  });
  const currentStep = useCurrentStep(data);
  const emojis = useEmojis(currentStep);

  if (currentStep?.type === "summary") stopPolling();

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

  if (isQuestionStep(currentStep)) return <QuestionStep game={data.game} view="common" />;

  if (isDomainSummaryStep(currentStep)) {
    return <DomainSummaryStep game={data.game} view="common" currentStep={currentStep} />;
  }

  return <SummaryStep game={data.game} />;
};

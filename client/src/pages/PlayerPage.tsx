import { gql, useQuery } from "@apollo/client";
import { Game } from "@big5ish/types";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useMemo } from "react";
import { useParams } from "react-router-dom";
import { LocaleContext } from "../App";
import { DomainPresentationStep } from "../components/DomainPresentationStep";
import { DomainScoreGuessStep } from "../components/DomainScoreGuessStep";
import { DomainSummaryStep } from "../components/DomainSummaryStep";
import { ErrorMsg } from "../components/ErrorMsg";
import { PlayerList } from "../components/PlayerList";
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
import translations from "./PlayerPage.translations.json";

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
          text
          domain
          facet
          choices {
            text
            score
            color
          }
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

export const PlayerPage = () => {
  const { locale } = useContext(LocaleContext);

  const { gameId } = useParams();

  const { data, loading, error, stopPolling } = useQuery<{ game: Game }>(gameQuery, {
    variables: { gameId },
    pollInterval: 500,
  });
  const currentStep = useCurrentStep(data);
  const stepCount = useMemo(
    () => data?.game?.steps.filter((step) => isDomainPresentationStep(step)).length ?? 0,
    [data?.game?.steps]
  );
  const emojis = useEmojis(currentStep);

  if (currentStep?.type === "summary") stopPolling();

  if (loading) return <FontAwesomeIcon className={`animate-spin text-gray-200`} icon={faSpinner} />;

  if (error || !gameId || !data?.game) {
    return <ErrorMsg msg={"Oh, no, something went wrong🤖⚙️"} />;
  }

  if (data.game.status === "created")
    return (
      <>
        <p className="text-xl font-bold text-white">{translations[locale].WaitingForGameToStart}</p>
        <PlayerList gameId={gameId} />
      </>
    );

  if (isDomainPresentationStep(currentStep)) {
    return (
      <DomainPresentationStep
        currentStep={getCurrentDomainPresentationStep(data.game)}
        stepCount={stepCount}
        domain={{ ...currentStep.domain, emojis }}
      />
    );
  }

  if (isDomainScoreGuessStep(currentStep)) return <DomainScoreGuessStep view="single" game={data.game} />;

  if (isQuestionStep(currentStep)) return <QuestionStep game={data.game} view="single" />;

  if (isDomainSummaryStep(currentStep)) {
    return <DomainSummaryStep game={data.game} view="single" currentStep={currentStep} />;
  }

  return <SummaryStep game={data.game} />;
};

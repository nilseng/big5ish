import { gql, useMutation } from "@apollo/client";
import { Game, QuestionStep as IQuestionStep } from "@big5ish/types";
import { faSpinner, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext, useEffect, useState } from "react";
import { LocaleContext } from "../App";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { getAnswer, getAnswerColor, getCurrentPlayerId } from "../utils/gameUtils";
import { ErrorMsg } from "./ErrorMsg";
import translations from "./QuestionStep.translations.json";

const answerQuestionMutation = gql`
  mutation answerQuestion($input: AnswerInput!) {
    answerQuestion(input: $input) {
      id
    }
  }
`;

const setNextStepMutation = gql`
  mutation setNextStep($gameId: ID!) {
    setNextStep(gameId: $gameId) {
      id
    }
  }
`;

export const QuestionStep = ({ game, view }: { game: Game; view: "common" | "single" }) => {
  const { locale } = useContext(LocaleContext);

  const currentStep = useCurrentStep({ game }) as IQuestionStep | undefined;
  const [selectedScore, setSelectedScore] = useState<number>();

  useEffect(() => setSelectedScore(undefined), [currentStep?.question.id]);

  const [answerQuestion] = useMutation(answerQuestionMutation);
  const [setNextStep] = useMutation(setNextStepMutation);

  if (currentStep?.type !== "question") return <ErrorMsg msg={"Troubles 😥⚙️"} />;

  return (
    <div className="w-full max-w-md p-6">
      <h2 className="text-3xl text-center p-6">{currentStep.question.text}</h2>
      {view === "common" && (
        <>
          <div className="grid grid-cols-3 gap-6 place-items-center py-6">
            {game.players.map((player) => (
              <Fragment key={player.id}>
                <div className="flex flex-col items-center justify-center">
                  <FontAwesomeIcon icon={faUserNinja} size={"2x"} />
                  <p className="text-xs text-center pt-2">{player.nickname}</p>
                </div>
                <div className="col-span-2">
                  {getAnswerColor({ game, playerId: player.id, question: currentStep.question }) ?? (
                    <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl`} icon={faSpinner} />
                  )}
                </div>
              </Fragment>
            ))}
          </div>
          <button
            className="bg-success-400 float-right rounded-lg font-bold px-4 py-2"
            onClick={() => setNextStep({ variables: { gameId: game.id } })}
          >
            {translations[locale].Next}
          </button>
        </>
      )}
      {view === "single" && (
        <>
          <fieldset
            disabled={!!getAnswer({ game, playerId: getCurrentPlayerId(), questionId: currentStep.question.id })}
          >
            <div className="grid grid-cols-4 gap-6 p-6">
              {currentStep.question.choices.map((choice) => (
                <Fragment key={choice.score}>
                  <div className="place-self-center">
                    <input
                      type="radio"
                      id={`radio-${choice.score}`}
                      value={choice.score}
                      checked={choice.score === selectedScore}
                      onChange={(e) => setSelectedScore(+e.currentTarget.value)}
                    />
                  </div>
                  <p className="col-span-3">{choice.text}</p>
                </Fragment>
              ))}
            </div>
          </fieldset>
          <div className="w-full p-6">
            {getAnswer({ game, playerId: getCurrentPlayerId(), questionId: currentStep.question.id }) ? (
              <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl float-right`} icon={faSpinner} />
            ) : (
              <button
                className={`${
                  selectedScore ? "bg-success-400" : "bg-success-300"
                } float-right rounded-lg font-bold px-4 py-2`}
                disabled={!selectedScore}
                onClick={() =>
                  answerQuestion({
                    variables: {
                      input: {
                        gameId: game.id,
                        playerId: getCurrentPlayerId(),
                        questionId: currentStep.question.id,
                        domainId: currentStep.question.domain,
                        facet: currentStep.question.facet,
                        score: selectedScore,
                      },
                    },
                  })
                }
              >
                {translations[locale].Submit}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

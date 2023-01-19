import { gql, useMutation } from "@apollo/client";
import { Game } from "@big5ish/types";
import { faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { ErrorMsg } from "./ErrorMsg";

const setNextStepMutation = gql`
  mutation setNextStep($gameId: ID!) {
    setNextStep(gameId: $gameId) {
      id
    }
  }
`;

export const QuestionStep = ({ game, view }: { game: Game; view: "common" | "single" }) => {
  const currentStep = useCurrentStep({ game });
  const [selectedScore, setSelectedScore] = useState(3);

  const [setNextStep] = useMutation(setNextStepMutation);

  if (currentStep?.type !== "question") return <ErrorMsg msg={"Troubles 😥⚙️"} />;

  return (
    <div className="w-full max-w-md pb-6">
      <h2 className="text-3xl text-center p-6">{currentStep.question.text}</h2>
      {view === "common" && (
        <>
          <div className="grid grid-cols-3 gap-6 place-items-center p-6">
            {game.players.map((player) => (
              <Fragment key={player.id}>
                <div className="flex flex-col items-center justify-center">
                  <FontAwesomeIcon icon={faUserNinja} size={"2x"} />
                  <p className="text-xs text-center pt-2">{player.nickname}</p>
                </div>
                <p className="col-span-2">Score PH</p>
              </Fragment>
            ))}
          </div>
          <button
            className="bg-success-400 float-right rounded-lg font-bold px-4 py-2"
            onClick={() => setNextStep({ variables: { gameId: game.id } })}
          >
            Next
          </button>
        </>
      )}
      {view === "single" && (
        <>
          <fieldset>
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
            <button
              className="bg-success-400 float-right rounded-lg font-bold px-4 py-2"
              onClick={() => console.log("Selected score", selectedScore)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

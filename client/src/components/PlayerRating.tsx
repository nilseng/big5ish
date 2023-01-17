import { gql, useMutation } from "@apollo/client";
import { Game, Player } from "@big5ish/types";
import { faSpinner, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { useOtherPLayers } from "../hooks/useOtherPlayers";
import { hasPlayerGuessedDomainScores } from "../utils/gameUtils";
import { ErrorMsg } from "./ErrorMsg";

const defaultScore = 3;

const guessDomainScoresMutation = gql`
  mutation guessDomainScores($input: DomainScoreGuessInput!) {
    guessDomainScores(input: $input) {
      id
    }
  }
`;

const createDomainScoreGuessMap = (players?: Player[]) => {
  const guesses: { [playerId: string]: number } = {};
  players?.forEach((p) => {
    guesses[p.id] = defaultScore;
  });
  return guesses;
};

export const PlayerRating = ({ view, game }: { view: "single" | "common"; game: Game }) => {
  const otherPlayers = useOtherPLayers(game);
  const currentStep = useCurrentStep({ game: game });
  const [guesses, setGuesses] = useState<{ [playerId: string]: number } | undefined>();
  useEffect(() => setGuesses(createDomainScoreGuessMap(otherPlayers)), [otherPlayers]);

  const [guessDomainScores, { error, loading }] = useMutation<{ guessDomainScores: { id: string } }>(
    guessDomainScoresMutation
  );

  if (error || currentStep?.type !== "playerRating") return <ErrorMsg msg={"Troubles 😥⚙️"} />;

  const guessScores = async () => {
    await guessDomainScores({
      variables: {
        input: {
          domainId: currentStep.domainId,
          guessedBy: localStorage.getItem("playerId"),
          guesses: Object.keys(guesses!).map((playerId) => ({ playerId, score: guesses![playerId] })),
        },
      },
    });
  };

  return (
    <div className="w-full max-w-md pb-6">
      <h2 className="text-3xl text-center p-6">{currentStep?.statement}</h2>
      {view === "common" && (
        <div className="grid grid-cols-2 gap-6 place-items-center p-6">
          {game.players.map((player) => (
            <Fragment key={player.id}>
              <div className="flex flex-col items-center justify-center">
                <FontAwesomeIcon icon={faUserNinja} size={"2x"} />
                <p className="text-xs text-center pt-2">{player.nickname}</p>
              </div>
              <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl`} icon={faSpinner} />
            </Fragment>
          ))}
        </div>
      )}
      {view === "single" && otherPlayers && (
        <>
          <div className="grid grid-cols-3 gap-6 p-6">
            {otherPlayers?.map((player) => (
              <Fragment key={player.id}>
                <div className="flex flex-col items-center">
                  <FontAwesomeIcon icon={faUserNinja} size={"2x"} />
                  <p className="text-xs pt-2">{player.nickname}</p>
                </div>
                <input
                  className="col-span-2"
                  id={`range-${player.id}`}
                  disabled={hasPlayerGuessedDomainScores({ game, domainId: currentStep.domainId })}
                  type={"range"}
                  min={1}
                  max={5}
                  step={1}
                  value={guesses?.[player.id] ?? defaultScore}
                  onChange={(e) => {
                    setGuesses((g) => ({ ...g, [player.id]: +e.target.value }));
                  }}
                />
              </Fragment>
            ))}
          </div>
          <div className="w-full p-6">
            {hasPlayerGuessedDomainScores({ game, domainId: currentStep.domainId }) || loading ? (
              <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl float-right`} icon={faSpinner} />
            ) : (
              <button
                className="bg-success-400 float-right rounded-lg font-bold px-4 py-2"
                onClick={() => guessScores()}
              >
                Ready
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

import { gql, useMutation } from "@apollo/client";
import { Game, Player } from "@big5ish/types";
import { faCheckCircle, faCircle, faInfoCircle, faSpinner, faUserNinja } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useContext, useEffect, useState } from "react";
import { LocaleContext } from "../App";
import { useCurrentStep } from "../hooks/useCurrentStep";
import { useOtherPLayers } from "../hooks/useOtherPlayers";
import { getCurrentPlayerId, hasPlayerGuessedDomainScores } from "../utils/gameUtils";
import { DomainInformationModal } from "./DomainInformationModal";
import translations from "./DomainScoreGuessStep.translations.json";
import { ErrorMsg } from "./ErrorMsg";

const defaultScore = 3;

const guessDomainScoresMutation = gql`
  mutation guessDomainScores($input: DomainScoreGuessesInput!) {
    guessDomainScores(input: $input) {
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

const createDomainScoreGuessMap = (players?: Player[]) => {
  if (!players) return null;
  const guesses: { [playerId: string]: number } = {};
  players?.forEach((p) => {
    guesses[p.id] = defaultScore;
  });
  return guesses;
};

export const DomainScoreGuessStep = ({ view, game }: { view: "single" | "common"; game: Game }) => {
  const { locale } = useContext(LocaleContext);

  const otherPlayers = useOtherPLayers(game);
  const currentStep = useCurrentStep({ game });
  const [guesses, setGuesses] = useState<{ [playerId: string]: number } | null>();
  useEffect(() => {
    if (!guesses) setGuesses(createDomainScoreGuessMap(otherPlayers));
  }, [otherPlayers, guesses]);

  const [guessDomainScores, { error: guessError, loading: loadingGuessMutation }] = useMutation<{
    guessDomainScores: { id: string };
  }>(guessDomainScoresMutation);

  const [setNextStep, { error: nextStepError, loading: loadingNextStep }] = useMutation(setNextStepMutation);

  const [isDomainInfoModalOpen, setIsDomainInfoModalOpen] = useState(false);

  if (guessError || nextStepError || currentStep?.type !== "domainScoreGuess")
    return <ErrorMsg msg={"Troubles 😥⚙️"} />;

  const guessScores = async () => {
    if (!guesses) throw Error("Guess object undefined.");
    await guessDomainScores({
      variables: {
        input: {
          gameId: game.id,
          guesses: Object.keys(guesses)?.map((playerId) => ({
            guessedBy: getCurrentPlayerId(),
            playerId,
            scores: {
              [currentStep.domain.domain]: guesses[playerId],
            },
          })),
        },
      },
    });
  };

  return (
    <>
      <DomainInformationModal
        isOpen={isDomainInfoModalOpen}
        setIsOpen={setIsDomainInfoModalOpen}
        domain={currentStep.domain}
      />
      <div className="w-full max-w-md pb-6">
        <h2 className="text-3xl text-center p-6">
          {translations[locale].HowDoTheOthersScore} {currentStep?.domain.title}?
          <FontAwesomeIcon
            icon={faInfoCircle}
            size="sm"
            className="ml-2 cursor-pointer"
            onClick={() => setIsDomainInfoModalOpen(true)}
          />
        </h2>
        {view === "common" && (
          <>
            <div className="grid grid-cols-2 gap-6 place-items-center p-6">
              {game.players.map((player) => (
                <Fragment key={player.id}>
                  <div className="flex flex-col items-center justify-center">
                    <FontAwesomeIcon icon={faUserNinja} size={"2x"} />
                    <p className="text-xs text-center pt-2">{player.nickname}</p>
                  </div>
                  {hasPlayerGuessedDomainScores({ game, domainId: currentStep.domain.domain, playerId: player.id }) ? (
                    <span className="fa-layers text-2xl">
                      <FontAwesomeIcon icon={faCircle} className="fa-stack text-2xl text-white" />
                      <FontAwesomeIcon icon={faCheckCircle} className="fa-stack text-2xl text-emerald-400" />
                    </span>
                  ) : (
                    <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl`} icon={faSpinner} />
                  )}
                </Fragment>
              ))}
            </div>
            <div className="w-full p-6">
              {loadingNextStep ? (
                <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl float-right`} icon={faSpinner} />
              ) : (
                <button
                  className="bg-success-400 float-right rounded-lg font-bold px-4 py-2"
                  onClick={() => setNextStep({ variables: { gameId: game.id } })}
                >
                  {translations[locale].Next}
                </button>
              )}
            </div>
          </>
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
                    disabled={hasPlayerGuessedDomainScores({ game, domainId: currentStep.domain.domain })}
                    type={"range"}
                    min={1}
                    max={5}
                    step={0.1}
                    value={guesses?.[player.id] ?? defaultScore}
                    onChange={(e) => {
                      setGuesses((g) => ({ ...g, [player.id]: +e.target.value }));
                    }}
                  />
                </Fragment>
              ))}
            </div>
            <div className="w-full p-6">
              {hasPlayerGuessedDomainScores({ game, domainId: currentStep.domain.domain }) || loadingGuessMutation ? (
                <div className="flex w-full justify-end items-center">
                  <p className="text-sm text-gray-200 pr-4">{translations[locale].AnswerReceivedWaiting}</p>
                  <FontAwesomeIcon className={`animate-spin text-gray-200 text-2xl`} icon={faSpinner} />
                </div>
              ) : (
                <button
                  className="bg-success-400 float-right rounded-lg font-bold px-4 py-2"
                  onClick={() => guessScores()}
                >
                  {translations[locale].Submit}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

import { getFacet } from "@alheimsins/b5-result-text";
import { gql, useMutation } from "@apollo/client";
import { DomainSummaryStep as Step, Game } from "@big5ish/types";
import { useMemo, useState } from "react";
import { language } from "../config";
import { useOtherPLayers } from "../hooks/useOtherPlayers";
import { calculateDomainResults } from "../utils/gameUtils";
import { ProgressBar } from "./ProgressBar";

const setNextStepMutation = gql`
  mutation setNextStep($gameId: ID!) {
    setNextStep(gameId: $gameId) {
      id
    }
  }
`;

export const DomainSummaryStep = ({
  game,
  view,
  currentStep,
}: {
  game: Game;
  view: "common" | "single";
  currentStep: Step;
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>();

  const otherPlayers = useOtherPLayers(game, selectedPlayerId);

  const playerResults = useMemo(
    () =>
      game.players.map((player) => ({
        player,
        results: calculateDomainResults({ game, playerId: player.id, domain: currentStep.domain }),
      })),
    [game, currentStep]
  );

  const selectedPlayerResults = useMemo(
    () => playerResults.find((r) => r.player.id === selectedPlayerId)?.results,
    [playerResults, selectedPlayerId]
  );

  const groupResults = useMemo(() => calculateDomainResults({ game, domain: currentStep.domain }), [game, currentStep]);

  const [setNextStep] = useMutation(setNextStepMutation);

  return (
    <div className="w-full max-w-md p-6">
      <h2 className="text-3xl text-center p-6">{currentStep.domain.title} Results</h2>
      <div className="relative w-full flex justify-center flex-wrap p-2">
        <div className="absolute top-0 w-full h-full pointer-events-none bg-white opacity-5 rounded-xl"></div>
        <button
          key={"group"}
          className={`${
            !selectedPlayerId ? "bg-gray-50 bg-opacity-20 font-bold" : ""
          } border border-white rounded-lg text-xs px-2 py-1 m-2`}
          onClick={() => setSelectedPlayerId(undefined)}
        >
          All
        </button>
        {game.players.map((player) => (
          <button
            key={player.id}
            className={`${
              selectedPlayerId === player.id ? "bg-gray-50 bg-opacity-10 font-bold" : ""
            } border border-white rounded-lg text-xs px-2 py-1 m-2`}
            onClick={() => setSelectedPlayerId((id) => (id === player.id ? undefined : player.id))}
          >
            {player.nickname}
          </button>
        ))}
      </div>
      {selectedPlayerId && (
        <>
          <div className="py-4">
            <p className="text-xl font-bold pb-2">
              {currentStep.domain.title} {selectedPlayerResults?.avgScore?.toFixed(1)}
            </p>
            <ProgressBar value={selectedPlayerResults?.avgScore} max={5} className="h-4" />
          </div>
          {Object.keys(selectedPlayerResults?.facets ?? {}).map((f) => (
            <div key={f} className="pb-2">
              <p>
                {getFacet({ domain: currentStep.domain.domain, language, facet: +f }).title}{" "}
                {selectedPlayerResults?.facets?.[+f].toFixed(1)}
              </p>
              <ProgressBar value={selectedPlayerResults?.facets?.[+f]} max={5} />
            </div>
          ))}
          <p className="text-xl font-bold py-4">Guesses</p>
          {otherPlayers?.map((player) => (
            <div key={player.id} className="w-full pb-2">
              <span>
                {player.nickname}{" "}
                {
                  game.domainScoreGuesses?.find((g) => g.guessedBy === player.id && g.playerId === selectedPlayerId)
                    ?.scores[currentStep.domain.domain]
                }
              </span>
              <ProgressBar
                value={
                  game.domainScoreGuesses?.find((g) => g.guessedBy === player.id && g.playerId === selectedPlayerId)
                    ?.scores[currentStep.domain.domain]
                }
                max={5}
              />
            </div>
          ))}
        </>
      )}
      {!selectedPlayerId && (
        <>
          <div className="text-xl font-bold py-4">
            <p>
              {currentStep.domain.title}: {groupResults.avgScore?.toFixed(1)}
            </p>
            <ProgressBar value={groupResults.avgScore} max={5} />
          </div>
          {Object.keys(groupResults.facets ?? {}).map((f) => (
            <div key={f} className="pb-2">
              {getFacet({ domain: currentStep.domain.domain, language, facet: +f }).title}:{" "}
              {groupResults?.facets?.[+f]?.toFixed(1)}
              <ProgressBar value={groupResults?.facets?.[+f]} max={5} />
            </div>
          ))}
        </>
      )}
      {view === "common" && (
        <button
          className="bg-success-400 float-right rounded-lg font-bold px-4 py-2"
          onClick={() => setNextStep({ variables: { gameId: game.id } })}
        >
          Next
        </button>
      )}
    </div>
  );
};

import { getFacet } from "@alheimsins/b5-result-text";
import { gql, useMutation } from "@apollo/client";
import { DomainSummaryStep as Step, Game } from "@big5ish/types";
import { useMemo, useState } from "react";
import { language } from "../config";
import { useOtherPLayers } from "../hooks/useOtherPlayers";
import { calculateDomainResults } from "../utils/gameUtils";

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
    <div className="w-full max-w-md pb-6">
      <h2 className="text-3xl text-center p-6">{currentStep.domain.title} Results</h2>
      <div className="w-full flex justify-center">
        {game.players.map((player) => (
          <button
            key={player.id}
            className={`${selectedPlayerId === player.id ? "bg-gray-50 bg-opacity-10" : ""} rounded-lg px-4 py-2 mx-2`}
            onClick={() => setSelectedPlayerId((id) => (id === player.id ? undefined : player.id))}
          >
            {player.nickname}
          </button>
        ))}
      </div>
      {selectedPlayerId && (
        <>
          <p className="text-xl font-bold py-4">
            {currentStep.domain.title}: {selectedPlayerResults?.avgScore?.toFixed(2)}
          </p>
          {Object.keys(selectedPlayerResults?.facets ?? {}).map((f) => (
            <p key={f}>
              {getFacet({ domain: currentStep.domain.domain, language, facet: +f }).title}:{" "}
              {selectedPlayerResults?.facets?.[+f]?.toFixed(2)}
            </p>
          ))}
          <p className="text-xl font-bold py-4">Guesses</p>
          {otherPlayers?.map((player) => (
            <p key={player.id}>
              {player.nickname}:{" "}
              {game.domainScoreGuesses
                ?.find((g) => g.guessedBy === player.id && g.playerId === selectedPlayerId)
                ?.scores[currentStep.domain.domain]?.toFixed(2)}
            </p>
          ))}
        </>
      )}
      {!selectedPlayerId && (
        <>
          <p className="text-xl font-bold py-4">
            {currentStep.domain.title}: {groupResults.avgScore?.toFixed(2)}
          </p>
          {Object.keys(groupResults.facets ?? {}).map((f) => (
            <p key={f}>
              {getFacet({ domain: currentStep.domain.domain, language, facet: +f }).title}:{" "}
              {groupResults?.facets?.[+f]?.toFixed(2)}
            </p>
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

import { getFacet } from "@alheimsins/b5-result-text";
import { gql, useMutation } from "@apollo/client";
import { DomainSummaryStep as Step, Game } from "@big5ish/types";
import { useMemo } from "react";
import { language } from "../config";
import { calculateDomainResults } from "../utils/gameUtils";

const setNextStepMutation = gql`
  mutation setNextStep($gameId: ID!) {
    setNextStep(gameId: $gameId) {
      id
    }
  }
`;

export const DomainSummaryStep = ({ game, currentStep }: { game: Game; currentStep: Step }) => {
  const playerResults = useMemo(
    () =>
      game.players.map((player) => ({
        player,
        results: calculateDomainResults({ game, playerId: player.id, domain: currentStep.domain }),
      })),
    [game, currentStep]
  );

  const groupResults = useMemo(() => calculateDomainResults({ game, domain: currentStep.domain }), [game, currentStep]);

  const [setNextStep] = useMutation(setNextStepMutation);

  return (
    <div className="w-full max-w-md pb-6">
      <h2 className="text-3xl text-center p-6">{currentStep.domain.title} Results</h2>
      <p className="text-xl font-bold">Overall: {groupResults.avgScore?.toFixed(2)}</p>
      {Object.keys(groupResults.facets ?? {}).map((f) => (
        <p key={f}>
          {getFacet({ domain: currentStep.domain.domain, language, facet: +f }).title}:{" "}
          {groupResults?.facets?.[+f]?.toFixed(2)}
        </p>
      ))}
      <button
        className="bg-success-400 float-right rounded-lg font-bold px-4 py-2"
        onClick={() => setNextStep({ variables: { gameId: game.id } })}
      >
        Next
      </button>
    </div>
  );
};

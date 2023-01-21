import { Game } from "@big5ish/types";
import { Fragment, useMemo } from "react";
import { calculateResults, domains } from "../utils/gameUtils";

export const SummaryStep = ({ game }: { game: Game }) => {
  const gameResults = useMemo(() => calculateResults(game), [game]);
  return (
    <>
      <h2 className="text-3xl text-center p-6">Result Summary</h2>
      {game.players.map((player) => (
        <Fragment key={player.id}>
          <h3 className="text-2xl pt-6">{player.nickname}</h3>
          {Object.values(domains).map((domainId) => (
            <p key={domainId}>
              Domain {domainId}: {gameResults[player.id][domainId]?.avgScore?.toFixed(2)}
            </p>
          ))}
        </Fragment>
      ))}
    </>
  );
};

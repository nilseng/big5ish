import { Game } from "@big5ish/types";
import { Fragment, useMemo } from "react";
import { calculateResults, domains } from "../utils/gameUtils";

export const SummaryStep = ({ game }: { game: Game }) => {
  const gameResults = useMemo(() => calculateResults(game), [game]);
  return (
    <>
      {game.players.map((player) => (
        <Fragment key={player.id}>
          <h2>{player.nickname}</h2>
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

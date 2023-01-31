import { getDomain, getFacet } from "@alheimsins/b5-result-text";
import { Game } from "@big5ish/types";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { language } from "../config";
import { calculateResults, domains } from "../utils/gameUtils";
import { ProgressBar } from "./ProgressBar";

export const SummaryStep = ({ game }: { game: Game }) => {
  const gameResults = useMemo(() => calculateResults(game), [game]);
  return (
    <>
      <h2 className="text-3xl text-center p-6">Result Summary</h2>
      <div key={"group"}>
        <h3 className="text-2xl pt-6">
          Group
          <FontAwesomeIcon icon={faUsers} className="ml-2" />
        </h3>
        {Object.values(domains).map((domainId) => (
          <div key={domainId} className="py-2">
            <p className="text-xl font-bold">
              {getDomain({ domain: domainId, language }).title} {gameResults.group[domainId]?.avgScore?.toFixed(1)}
            </p>
            <ProgressBar value={gameResults.group[domainId]?.avgScore} max={5} className="h-4 mb-2" />
            {Object.keys(gameResults.group[domainId]?.facets ?? {}).map((f) => (
              <div key={f} className="pb-1">
                <p>
                  {getFacet({ domain: domainId, language, facet: +f }).title}{" "}
                  {gameResults.group[domainId]?.facets?.[+f]?.toFixed(1)}
                </p>
                <ProgressBar value={gameResults.group[domainId]?.facets?.[+f]} max={5} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {game.players.map((player) => (
        <div key={player.id}>
          <h3 className="text-2xl pt-6">{player.nickname}</h3>
          {Object.values(domains).map((domainId) => (
            <div key={domainId} className="py-2">
              <p className="text-xl font-bold">
                {getDomain({ domain: domainId, language }).title}{" "}
                {gameResults[player.id][domainId]?.avgScore?.toFixed(1)}
              </p>
              <ProgressBar value={gameResults[player.id][domainId]?.avgScore} max={5} className="h-4 mb-2" />
              {Object.keys(gameResults[player.id][domainId]?.facets ?? {}).map((f) => (
                <div key={f} className="pb-1">
                  <p>
                    {getFacet({ domain: domainId, language, facet: +f }).title}{" "}
                    {gameResults[player.id][domainId]?.facets?.[+f]?.toFixed(1)}
                  </p>
                  <ProgressBar value={gameResults[player.id][domainId]?.facets?.[+f]} max={5} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

import { getTemplate as getDomains } from "@alheimsins/b5-result-text";
import { Step } from "@big5ish/types";
import { GameGateway } from "../gateways/game.gateway";

export const createGame = ({
  id,
  gameGateway,
  language = "en",
}: {
  id: string;
  language?: string;
  gameGateway: GameGateway;
}) => {
  const steps = getSteps({ language });
  return gameGateway.createGame({ id, steps });
};

const getSteps = ({ language = "en" }: { language?: string }): Step[] => {
  const [A, C, E, N, O] = getDomains(language).sort((a, b) => (a.domain < b.domain ? -1 : 1));
  const sortedDomains = [N, E, O, A, C];
  return sortedDomains.map((domain) => ({ type: "domainPresentation", domain }));
};

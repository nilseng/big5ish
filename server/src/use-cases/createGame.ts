import { getItems } from "@alheimsins/b5-johnson-120-ipip-neo-pi-r";
import { getTemplate as getDomains } from "@alheimsins/b5-result-text";
import { DomainPresentationStep, QuestionStep, Step, StepType } from "@big5ish/types";
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
  const questions = getItems();
  const sortedDomains = [N, E, O, A, C];
  const domainSteps: DomainPresentationStep[] = sortedDomains.map((domain) => ({
    type: StepType.DomainPresentation,
    domain,
    duration: 5000,
  }));
  const steps: Step[] = [];
  domainSteps.forEach((step) => {
    steps.push(step, {
      type: StepType.DomainScoreGuess,
      statement: `How do you think the other players score on ${step.domain.title}?`,
      domainId: step.domain.domain,
    });
    steps.push(
      ...questions
        .filter((q) => q.domain === step.domain.domain)
        .map(
          (q): QuestionStep => ({
            type: StepType.QuestionStep,
            question: q,
          })
        )
    );
  });
  return steps;
};

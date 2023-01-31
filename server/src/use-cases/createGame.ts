import { getItems } from "@alheimsins/b5-johnson-120-ipip-neo-pi-r";
import { getTemplate as getDomains } from "@alheimsins/b5-result-text";
import {
  Domain,
  DomainPresentationStep,
  DomainScoreGuessStep,
  DomainSummaryStep,
  QuestionStep,
  Step,
  StepType,
} from "@big5ish/types";
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

const getSteps = ({ language = "no" }: { language?: string }): Step[] => {
  const [A, C, E, N, O] = getDomains(language).sort((a, b) => (a.domain < b.domain ? -1 : 1));
  const sortedDomains = [N, E, O, A, C];
  const domainSteps: DomainPresentationStep[] = createDomainSteps(sortedDomains);
  const steps: Step[] = [];
  domainSteps.forEach((domainStep) => {
    const domain = domainStep.domain;
    steps.push(domainStep);
    steps.push(createDomainScoreGuessStep(domain));
    steps.push(...createQuestionSteps(domain));
    steps.push(createDomainSummaryStep(domain));
  });
  steps.push({ type: StepType.SummaryStep });
  return steps;
};

const createDomainSteps = (domains: Domain[]): DomainPresentationStep[] => {
  return domains.map((domain) => ({
    type: StepType.DomainPresentation,
    domain,
    duration: 5000,
  }));
};

const createDomainScoreGuessStep = (domain: Domain): DomainScoreGuessStep => {
  return {
    type: StepType.DomainScoreGuess,
    statement: `How do you think the other players score on ${domain.title}?`,
    domainId: domain.domain,
  };
};

const createQuestionSteps = (domain: Domain): QuestionStep[] => {
  return getItems("no")
    .filter((q) => q.domain === domain.domain)
    .map(
      (q): QuestionStep => ({
        type: StepType.QuestionStep,
        question: q,
      })
    );
};

const createDomainSummaryStep = (domain: Domain): DomainSummaryStep => {
  return {
    type: StepType.DomainSummaryStep,
    domain,
  };
};

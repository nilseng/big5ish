import {
  DomainPresentationStep,
  DomainScoreGuessStep,
  DomainSummaryStep,
  QuestionStep,
  Step,
  SummaryStep,
} from "@big5ish/types";

export const isDomainPresentationStep = (step?: Step): step is DomainPresentationStep => {
  return step?.type === "domainPresentation";
};

export const isDomainScoreGuessStep = (step?: Step): step is DomainScoreGuessStep => {
  return step?.type === "domainScoreGuess";
};

export const isQuestionStep = (step?: Step): step is QuestionStep => {
  return step?.type === "question";
};

export const isDomainSummaryStep = (step?: Step): step is DomainSummaryStep => {
  return step?.type === "domainSummary";
};

export const isSummaryStep = (step?: Step): step is SummaryStep => {
  return step?.type === "summary";
};

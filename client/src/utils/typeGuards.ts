import { DomainPresentationStep, DomainScoreGuessStep, QuestionStep, Step } from "@big5ish/types";

export const isDomainPresentationStep = (step?: Step): step is DomainPresentationStep => {
  return step?.type === "domainPresentation";
};

export const isDomainScoreGuessStep = (step?: Step): step is DomainScoreGuessStep => {
  return step?.type === "domainScoreGuess";
};

export const isQuestionStep = (step?: Step): step is QuestionStep => {
  return step?.type === "question";
};

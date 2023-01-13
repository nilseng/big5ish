import { DomainPresentationStep, Step } from "@big5ish/types";

export const isDomainPresentationStep = (step?: Step): step is DomainPresentationStep => {
  return step?.type === "domainPresentation";
};

export const isPlayerRatingStep = (step?: Step): step is DomainPresentationStep => {
  return step?.type === "playerRating";
};

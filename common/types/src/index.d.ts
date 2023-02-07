export const enum GameStatus {
  Created = "created",
  Started = "started",
}

export interface GameBase {
  id: string;
  status: GameStatus;
  players: Player[];
}

export interface MultiplayerGame extends GameBase {
  currentStep: number;
  steps: Step[];
  domainScoreGuesses?: {
    playerId: string;
    guessedBy: string;
    scores: { [domainId in DomainId]: number };
  }[];
  answers: Answer[];
}

export type Game = MultiplayerGame;

export const enum StepType {
  DomainPresentation = "domainPresentation",
  DomainScoreGuess = "domainScoreGuess",
  QuestionStep = "question",
  DomainSummaryStep = "domainSummary",
  SummaryStep = "summary",
}

export type Step = DomainPresentationStep | DomainScoreGuessStep | QuestionStep | DomainSummaryStep | SummaryStep;

export interface TimeBoundStep {
  duration: number;
}

export interface DomainPresentationStep extends TimeBoundStep {
  type: StepType.DomainPresentation;
  domain: Domain;
}

export interface DomainScoreGuessStep {
  type: StepType.DomainScoreGuess;
  domain: Domain;
}

export interface QuestionStep {
  type: StepType.QuestionStep;
  question: Question;
}

export interface DomainSummaryStep {
  type: StepType.DomainSummaryStep;
  domain: Domain;
}

export interface SummaryStep {
  type: StepType.SummaryStep;
}

export type DomainId = "A" | "C" | "E" | "N" | "O";

export interface Domain {
  domain: DomainId;
  title: string;
  emojis?: string;
  shortDescription: string;
  description: string;
  results: DomainResult[];
  facets: Facet[];
}

export interface DomainResult {
  score: "low" | "high" | "neutral";
  text: string;
}

export interface Facet {
  facet: number;
  title: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  keyed: "plus" | "minus";
  domain: DomainId;
  facet: number;
  num: number;
  choices: Choice[];
}

export interface Choice {
  text: string;
  score: number;
  color: number;
}

export interface Answer {
  questionId: string;
  playerId: string;
  domainId: DomainId;
  facet: number;
  score: number;
}

export interface Player {
  id: string;
  nickname: string;
}

export type LocaleId = "no" | "en";

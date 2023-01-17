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
    [domainId in DomainId]?: {
      [playerId: string]: {
        [guessedBy: string]: {
          score: number;
        };
      };
    };
  };
}

export type Game = MultiplayerGame;

export const enum StepType {
  DomainPresentation = "domainPresentation",
  PlayerRating = "playerRating",
}

export type Step = DomainPresentationStep | PlayerRatingStep;

export interface TimeBoundStep {
  duration: number;
}

export interface DomainPresentationStep extends TimeBoundStep {
  type: StepType.DomainPresentation;
  domain: Domain;
}

export interface PlayerRatingStep {
  type: StepType.PlayerRating;
  statement: string;
  domainId: DomainId;
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

export interface Player {
  id: string;
  nickname: string;
}

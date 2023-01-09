const enum GameStatus {
  Created = "CREATED",
  Started = "STARTED",
}

export interface Game {
  id: string;
  status: GameStatus;
  players: Player[];
}

export interface MultiplayerGame extends Game {
  steps: Step[];
}

export interface Step {
  type: "domainPresentation";
  id: DomainId;
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

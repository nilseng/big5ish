const enum GameStatus {
  Created = "CREATED",
  Started = "STARTED",
}

export interface Game {
  id: string;
  status: GameStatus;
  players: Player[];
}

export interface Player {
  id: string;
  nickname: string;
}

export interface Domain {
  id: string;
  name: string;
  emojis: string;
}

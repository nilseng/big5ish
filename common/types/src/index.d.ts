export interface Game {
  id: string;
  players: Player[];
}

export interface Player {
  id: string;
  nickname: string;
}

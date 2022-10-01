import { Game } from "@big5ish/types";
import { nanoid } from "nanoid";

class Cache {
  #games: Game[] = [];

  createGame(id: string) {
    this.#games.push({ id, players: [] });
  }

  addPlayer(gameId: string, nickname: string) {
    const game = this.#games.find((g) => g.id === gameId);
    game?.players.push({ id: nanoid(), nickname });
  }
}

export const cache = new Cache();

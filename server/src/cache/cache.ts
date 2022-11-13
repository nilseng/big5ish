import { Game } from "@big5ish/types";
import { nanoid } from "nanoid";

class Cache {
  #games: Game[] = [];

  addPlayer(gameId: string, nickname: string) {
    const game = this.#games.find((g) => g.id === gameId);
    game?.players.unshift({ id: nanoid(), nickname });
  }

  createGame(id: string) {
    this.#games.push({ id, players: [] });
  }

  getGame(id: string) {
    return this.#games.find((g) => g.id === id);
  }

  getGames() {
    return this.#games;
  }

  getPlayers(gameId: string) {
    return this.getGame(gameId)?.players;
  }
}

export const cache = new Cache();

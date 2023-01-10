import { Game, GameStatus, Step } from "@big5ish/types";
import { nanoid } from "nanoid";

class Cache {
  #games: Game[] = [];

  addPlayer(gameId: string, nickname: string) {
    const game = this.#games.find((g) => g.id === gameId);
    if (!game) throw new Error(`Game w id=${gameId} not found.`);
    const player = { id: nanoid(), nickname };
    game.players.unshift(player);
    return player;
  }

  createGame({ id, steps }: { id: string; steps: Step[] }) {
    this.#games.push({ id, status: GameStatus.Created, players: [], steps });
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

  startGame(gameId: string) {
    const game = this.#games.find((g) => g.id === gameId);
    if (!game) throw Error("Game not found - could not start game.");
    game.status = GameStatus.Started;
    return game;
  }
}

export const cache = new Cache();

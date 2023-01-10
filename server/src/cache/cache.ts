import { Game, GameStatus, Player, Step } from "@big5ish/types";

class Cache {
  #games: Game[] = [];

  addPlayer(game: Game, player: Player) {
    game.players.unshift(player);
    return player;
  }

  createGame({ id, steps, status }: { id: string; steps: Step[]; status: GameStatus }) {
    this.#games.push({ id, status, players: [], steps });
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

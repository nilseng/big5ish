import { graphqlHTTP } from "express-graphql";
import { buildASTSchema } from "graphql";
import { GameController } from "../controllers/game.controllers";
import { gqlSchema } from "./schema";

const schema = buildASTSchema(gqlSchema);

export const createGqlMiddleware = () => {
  const gameController = new GameController();

  const resolvers = {
    hello: () => "Hello, you fool",
    createGame: (args: { id: string }) => gameController.createGame(args.id),
    addPlayer: (args: { gameId: string; nickname: string }) => gameController.addPlayer(args),
  };

  return graphqlHTTP({
    schema,
    rootValue: resolvers,
  });
};

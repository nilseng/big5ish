import { graphqlHTTP } from "express-graphql";
import { buildASTSchema } from "graphql";
import { GameController } from "../controllers/game.controllers";
import { gqlSchema } from "./schema";

const schema = buildASTSchema(gqlSchema);

export const createGqlMiddleware = () => {
  const gameController = new GameController();

  const resolvers = {
    hello: () => "Hello, you fool",
    createGame: async (id: string) => {
      await gameController.createGame(id);
    },
    getGames: async () => {
      await gameController.getGames();
    },
  };

  return graphqlHTTP({
    schema,
    rootValue: resolvers,
  });
};

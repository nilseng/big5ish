import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { Server } from "http";
import { GameController } from "../controllers/game.controllers";
import { gqlSchema } from "./schema";

export const createGQLServer = (httpServer: Server) => {
  const gameController = new GameController();

  const resolvers = {
    Mutation: {
      createGame: (parent: unknown, args: { id: string }) => gameController.createGame(args.id),
      addPlayer: (parent: unknown, args: { gameId: string; nickname: string }) => gameController.addPlayer(args),
    },
    Query: { games: () => gameController.getGames() },
  };

  return new ApolloServer({
    typeDefs: gqlSchema,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    introspection: true,
  });
};

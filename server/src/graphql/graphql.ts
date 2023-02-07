import { DomainId, LocaleId } from "@big5ish/types";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { Server } from "http";
import { GameController } from "../controllers/game.controllers";
import { gqlSchema } from "./schema";

export const createGQLServer = (httpServer: Server) => {
  const gameController = new GameController();

  const resolvers = {
    Mutation: {
      createGame: (_: unknown, args: { input: { gameId: string; localeId: LocaleId } }) =>
        gameController.createGame(args.input),
      addPlayer: (_: unknown, args: { gameId: string; nickname: string }) => gameController.addPlayer(args),
      startGame: (_: never, args: { gameId: string }) => gameController.startGame(args.gameId),
      guessDomainScores: (
        _: never,
        args: {
          input: {
            gameId: string;
            guesses: { guessedBy: string; playerId: string; scores: { [domainId in DomainId]: number } }[];
          };
        }
      ) => gameController.guessDomainScores(args.input),
      setNextStep: (_: never, { gameId }: { gameId: string }) => gameController.setNextStep(gameId),
      answerQuestion: (
        _: never,
        args: {
          input: {
            gameId: string;
            playerId: string;
            questionId: string;
            domainId: DomainId;
            facet: number;
            score: number;
          };
        }
      ) => gameController.answerQuestion(args.input),
    },
    Query: {
      game: (_: never, args: { gameId: string }) => gameController.getGame(args.gameId),
      games: () => gameController.getGames(),
      players: (_: unknown, args: { gameId: string }) => gameController.getPlayers(args.gameId),
    },
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

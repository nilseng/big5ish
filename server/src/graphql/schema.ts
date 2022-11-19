import gql from "graphql-tag";

export const gqlSchema = gql`
  type Game {
    id: ID!
    status: GameStatus
    players: [Player]
  }

  enum GameStatus {
    CREATED
    STARTED
  }

  type Player {
    id: ID!
    nickname: String
  }

  type Query {
    game(gameId: ID!): Game
    games: [Game]
    players(gameId: ID!): [Player]
  }

  type Mutation {
    createGame(id: ID!): String
    addPlayer(gameId: ID!, nickname: String): String
    startGame(gameId: ID!): Game
  }
`;

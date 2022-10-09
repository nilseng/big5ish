import gql from "graphql-tag";

export const gqlSchema = gql`
  type Game {
    id: ID!
    players: [Player]
  }

  type Player {
    id: ID!
    nickname: String
  }

  type Query {
    games: [Game]
  }

  type Mutation {
    createGame(id: ID!): String
    addPlayer(gameId: ID!, nickname: String): String
  }
`;

import gql from "graphql-tag";

export const gqlSchema = gql`
  type RootMutation {
    _empty: String
  }

  type RootQuery {
    _empty: String
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }

  extend type RootQuery {
    hello: String
    getGames: String
  }

  extend type RootMutation {
    createGame(id: ID!): String
  }
`;

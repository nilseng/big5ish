import gql from "graphql-tag";

export const gqlSchema = gql`
  type Game {
    id: ID!
    status: GameStatus
    players: [Player]
    currentStep: Int
    steps: [Step]
    domainScoreGuesses: [DomainScoreGuess]
  }

  enum GameStatus {
    created
    started
  }

  type DomainScoreGuess {
    playerId: ID!
    guessedBy: ID!
    scores: DomainScores
  }

  type DomainScores {
    A: Int
    C: Int
    E: Int
    N: Int
    O: Int
  }

  type Player {
    id: ID!
    nickname: String
  }

  type Step {
    type: String!
    domain: Domain
    domainId: ID
    duration: Int
    statement: String
  }

  type Domain {
    domain: DomainId!
    title: String
    shortDescription: String
    description: String
    results: [DomainResult]
    facets: [Facet]
  }

  enum DomainId {
    A
    C
    E
    N
    O
  }

  type DomainResult {
    score: Score
    text: String
  }

  enum Score {
    low
    high
    neutral
  }

  type Facet {
    facet: Int
    title: String
    text: String
  }

  type Query {
    game(gameId: ID!): Game
    games: [Game]
    players(gameId: ID!): [Player]
  }

  type Mutation {
    createGame(id: ID!): String
    addPlayer(gameId: ID!, nickname: String): Player
    startGame(gameId: ID!): Game
    guessDomainScores(input: DomainScoreGuessesInput!): Game
  }

  input DomainScoreGuessesInput {
    gameId: ID!
    guesses: [DomainScoreGuessInput]!
  }

  input DomainScoreGuessInput {
    guessedBy: ID!
    playerId: ID!
    scores: DomainScoresInput!
  }

  input DomainScoresInput {
    A: Int
    C: Int
    E: Int
    N: Int
    O: Int
  }
`;

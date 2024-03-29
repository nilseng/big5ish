import gql from "graphql-tag";

export const gqlSchema = gql`
  type Query {
    game(gameId: ID!): Game
    games: [Game]
    players(gameId: ID!): [Player]
  }

  type Mutation {
    addPlayer(gameId: ID!, nickname: String): Player
    answerQuestion(input: AnswerInput!): Game
    createGame(input: CreateGameInput!): Game
    startGame(gameId: ID!): Game
    guessDomainScores(input: DomainScoreGuessesInput!): Game
    setNextStep(gameId: ID!): Game
  }

  input AnswerInput {
    gameId: ID!
    playerId: ID!
    questionId: ID!
    domainId: DomainId!
    facet: Int!
    score: Int!
  }

  input CreateGameInput {
    gameId: ID!
    localeId: LocaleId
  }

  enum LocaleId {
    no
    en
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
    A: Float
    C: Float
    E: Float
    N: Float
    O: Float
  }

  type Game {
    id: ID!
    status: GameStatus
    players: [Player]
    currentStep: Int
    steps: [Step]
    answers: [Answer]
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
    A: Float
    C: Float
    E: Float
    N: Float
    O: Float
  }

  type Player {
    id: ID!
    nickname: String
  }

  enum StepType {
    domainPresentation
    domainScoreGuess
    question
    domainSummary
    summary
  }

  type Step {
    type: StepType!
    domain: Domain
    duration: Int
    question: Question
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

  type Question {
    id: ID!
    text: String
    keyed: Keyed
    domain: DomainId
    facet: Int
    num: Int
    choices: [Choice]
  }

  type Answer {
    playerId: ID!
    questionId: ID!
    domainId: DomainId
    facet: Int
    score: Int
  }

  type Choice {
    text: String
    score: Int
    color: Int
  }

  enum Keyed {
    plus
    minus
  }
`;

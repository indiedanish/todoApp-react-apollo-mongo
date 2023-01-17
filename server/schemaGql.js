import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    tasks: [Task]
    itask(by: ID!): [Task]
    myprofile: User
  }

  type TaskInfo {
    _id: ID
    name: String
    by: IdName
    completed: Boolean
    completedTime: String
    creationTime: String
  }

  type IdName {
    _id: String
    firstName: String
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    tasks: [Task]
  }
  type Task {
    _id: ID!
    name: String!
    by: ID!
    completed: Boolean
    completedTime: String
    creationTime: String
  }

  type Token {
    token: String!
  }

  type Mutation {
    signupUser(userNew: UserInput!): User
    signinUser(userSignin: UserSigninInput!): Token
    createTask(name: String!): String
    deleteTask(_id: ID!): String
    updateTask(_id: ID!): String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input UserSigninInput {
    email: String!
    password: String!
  }
`;
export default typeDefs;

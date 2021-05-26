import { gql } from "apollo-server";

export default gql`
  type Result {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      password: String!
      location: String
      avatarURL: String
      githubUsername: String
    ): Result!
  }
`;

import { gql } from "apollo-server";

export default gql`
  type UnfollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(userName: String!): UnfollowUserResult
  }
`;

import { gql } from "apollo-server";

export default gql`
  type SeeFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
    # totalPages: Int
  }
  type Query {
    seeFollowing(userName: String!, lastId: Int): SeeFollowingResult!
  }
`;

import { gql } from "apollo-server";

export default gql`
  type LoingResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(userName: String!, password: String!): LoingResult!
  }
`;

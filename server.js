import "dotenv/config";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { getUser, protectResolver } from "./users/users.utils";
import { typeDefs, resolvers } from "./schema";

const PORT = process.env.PORT;

const app = express();
app.use(logger("tiny"));
app.listen({ port: PORT }, () => {
  console.log(`✅  Server is running on http://localhost:${PORT}/graphql 🚀`);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});
server.applyMiddleware({ app });

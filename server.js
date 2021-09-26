import "dotenv/config";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer } from "apollo-server-express";
// import schema from "./schema";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";

const PORT = process.env.PORT;
async function startServer() {
  const server = new ApolloServer({
    // schema,
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        protectResolver,
      };
    },
  });

  await server.start();
  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: 4000 }, r));
  console.log(
    `✅  Server ready on http://localhost:${PORT}${server.graphqlPath}`
  );
}

startServer();
// server.listen(PORT).then(() => {});

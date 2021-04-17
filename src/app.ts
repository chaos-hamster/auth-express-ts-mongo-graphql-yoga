import { GraphQLServer } from "graphql-yoga";
import db from "./database/dbConfig";

import context from "./graphql/context";
import resolvers from "./graphql/resolver";
import typeDefs from "./graphql/typeDefs";
import { applyMiddleware } from "./helpers/applyMiddleware";
import {config} from "dotenv";

config();


process.on("uncaughtException", (e) => {
  console.error("uncaught exception ", e);
  process.exit(1);
});
process.on("unhandledRejection", (e) => {
  console.error("Unhandled Promise rejection ", e);
  process.exit(1);
});

db();

const server = new GraphQLServer({
  context,
  resolvers,
  typeDefs,
});

applyMiddleware(server);

const options = {
  endpoint: "/users",
  playground: "/",
  port: 8000,
  subscriptions: "/subscriptions",
  cors: {
    credentials: true,
    origin: [process.env.FRONTURL || ""] 
  }
};

server.start(options, ({port}) =>
console.log(`Server started, listening on port ${port} for incoming requests.`),
);
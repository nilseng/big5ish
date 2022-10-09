import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import sslRedirect from "heroku-ssl-redirect";
import http from "http";
import morgan from "morgan";
import path from "path";
import { createGQLServer } from "./graphql/graphql";
dotenv.config();

const runServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(sslRedirect());

  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: "50mb",
    })
  );
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.raw());

  app.use(morgan("tiny"));

  app.use(express.static(path.join(__dirname, "../../client/build")));
  app.use("/*", express.static(path.join(__dirname, "../../client/build", "index.html")));

  const server = createGQLServer(httpServer);
  await server.start();

  server.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.info(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

runServer();

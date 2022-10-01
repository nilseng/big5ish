import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import sslRedirect from "heroku-ssl-redirect";
import morgan from "morgan";
import path from "path";
import { createGqlMiddleware } from "./graphql/graphql";
dotenv.config();

const runServer = async () => {
  const app = express();

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

  app.use("/graphql", createGqlMiddleware());

  app.use(express.static(path.join(__dirname, "../../client/build")));
  app.use("/*", express.static(path.join(__dirname, "../../client/build", "index.html")));

  const server = app.listen({ port: process.env.PORT || 4000 }, () => {
    console.info(`The server is listening on port ${process.env.PORT || 4000}.`);
  });

  const disconnect = async () => {
    server.close(() => {
      process.exit(0);
    });

    setTimeout(() => {
      console.error("Could not close connections within 3 sec, forcefully shutting down");
      process.exit(1);
    }, 3000);
  };

  process.on("SIGINT", async () => {
    console.info("SIGINT");
    await disconnect();
  });
  process.on("SIGTERM", async () => {
    console.info("SIGTERM");
    await disconnect();
  });
};

runServer();

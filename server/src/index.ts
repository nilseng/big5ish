import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import sslRedirect from "heroku-ssl-redirect";
import morgan from "morgan";
import path from "path";
import { initializeCache } from "./cache/cache";
dotenv.config();

const runServer = async () => {
  const app = express();
  const cache = await initializeCache();

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

  const server = app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`The server is now running on port ${process.env.PORT || 4000}`)
  );

  const disconnect = async () => {
    await cache?.quit().catch((e) => {
      console.error(e);
      process.exit(1);
    });
    server.close(() => {
      process.exit(0);
    });

    setTimeout(() => {
      console.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 10000);
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

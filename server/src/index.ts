import express from "express";
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import sslRedirect from "heroku-ssl-redirect";
import dotenv from "dotenv";
dotenv.config();

import { initializeCache } from "./cache/cache";

const initializeApp = async () => {
  const app = express();
  await initializeCache();

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

  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`The server is now running on port ${process.env.PORT || 4000}`)
  );
};

initializeApp();

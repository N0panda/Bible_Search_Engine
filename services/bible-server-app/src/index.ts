import express from "express";
import dotenv from "dotenv";
import path from "path";
import log from "npmlog";
import cors from "cors";
import router from "./router";

const app = express();

async function startServer() {
  const PORT = process.env.SERVER_APP_PORT;
  const HOST = process.env.SERVER_APP_HOST;
  dotenv.config({ path: path.resolve(process.cwd(), ".env") });

  app.use(
    cors({
      origin: "*",
      methods: "GET,POST",
    })
  );
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use("/", router);

  app.listen(Number(process.env.SERVER_APP_PORT) || 5000, () => {
    log.info(
      "Stating server...",
      `###################################\n
      ###################################\n
      ######## Bible-server-app #########       Server running on ${HOST}:${PORT}\n
      ###################################\n
      ###################################\n `
    );
  });
}

startServer();

import App from "./App";
import { config } from "dotenv";
import { Container } from "inversify";
import "reflect-metadata";

config();
const token = process.env.BOT_TOKEN;

(async () => {
  const container = new Container();
  const app = new App(token, container);
  const bot = app.build();

  bot.launch();
})();
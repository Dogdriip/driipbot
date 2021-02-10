import App from "./App";
import { Container } from "inversify";
import "reflect-metadata";

const token = "";

(async () => {
  const container = new Container();
  const app = new App(token, container);
  const bot = app.build();

  bot.launch();
})();
import { mongoose } from "@typegoose/typegoose";
import App from "./App";
import { config } from "dotenv";
import { Container } from "inversify";

config();
const token = process.env.BOT_TOKEN;

(async () => {
  const container = new Container();
  const app = new App(token, container);
  const bot = app.build();

  await mongoose.connect(
    `mongodb://${process.env.MONGO_HOST || "localhost"}:${
      process.env.MONGO_PORT || 27017
    }`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "driipbot",
    }
  );

  bot.launch();
})();

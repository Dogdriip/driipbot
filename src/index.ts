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

  const mongo_url = `mongodb://${process.env.MONGO_HOST || "localhost"}:${
    process.env.MONGO_PORT || 27017
  }`;

  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "driipbot",
    });
    console.log(`Connected to MongoDB: ${mongo_url}`);
    bot.launch();
  } catch (e) {
    console.log(`Cannot connect to MongoDB: ${mongo_url}`);
    console.log(e.description);
  }
})();

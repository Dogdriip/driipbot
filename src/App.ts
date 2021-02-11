import { Container } from "inversify";
import { Telegraf, Markup } from "telegraf";
import { TYPE } from "./constants";
import Calculator from "./middleware/Calculator";
import FreeCounter from "./middleware/FreeCounter";
import Memo from "./middleware/Memo";
import Say from "./middleware/Say";
import Sayd from "./middleware/Sayd";
import Select from "./middleware/Select";
import CommandParser, { ContextWithState } from "./util/CommandParser";
import Logger from "./util/Logger";
import TimeLogger from "./util/TimeLogger";

export interface AppContext extends ContextWithState {
  container: Container;
}

export default class App {
  private _bot: Telegraf<AppContext>;
  private _container: Container;

  constructor(token: string, container: Container) {
    this._bot = new Telegraf<AppContext>(token);
    this._container = container;
    this._container
      .bind<Telegraf<AppContext>>(TYPE.BotInstance)
      .toConstantValue(this._bot);
  }

  build() {
    this._bot.use(Logger());
    this._bot.use(TimeLogger());
    this._bot.use(CommandParser());

    this._bot.hears("브로코 브로코 브로콜리", (ctx) => ctx.reply("브로코!"));
    this._bot.hears(/=$/, Calculator());
    this._bot.hears(/!$/, Memo());

    this._bot.command("pick", Select());
    this._bot.command("say", Say());
    this._bot.command("sayd", Sayd());
    this._bot.command("free", FreeCounter());

    return this._bot;
  }
}

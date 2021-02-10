import { Container } from "inversify";
import { Telegraf } from "telegraf";
import { TYPE } from "./constants";
import "./middleware";
import CommandParser, { ContextWithState } from "./util/CommandParser";
import Logger from "./util/Logger";
import TimeLogger from "./util/TimeLogger";

export interface AppContext extends ContextWithState {
  container: Container;
}

export default class App {
  private bot: Telegraf<AppContext>;
  private container: Container;

  constructor(token: string, container: Container) {
    this.bot = new Telegraf<AppContext>(token);
    this.container = container
    this.container
      .bind<Telegraf<AppContext>>(TYPE.BotInstance)
      .toConstantValue(this.bot);
  }

  build() {
    this.bot.use(Logger());
    this.bot.use(TimeLogger());
    this.bot.use(CommandParser());

    this.bot.command("pick", (ctx) => {
      const { args } = ctx.state.command;
      const rand_idx: number = Math.floor(Math.random() * args.length);
      ctx.reply(`${args[rand_idx]}`);
    });
  
    return this.bot;
  }
}
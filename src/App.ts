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

    this.bot.hears("브로코 브로코 브로콜리", (ctx) => ctx.reply("브로코!"));

    this.bot.hears(/=$/, (ctx) => {
      const re = /^[0-9+\-*/^()]+$/g;
      const text = ctx.message.text.split("=")[0];
      if (re.test(text)) {
        ctx.reply(eval(text));
      }
    });

    this.bot.command("pick", (ctx) => {
      const { args } = ctx.state.command;
      const rand_idx: number = Math.floor(Math.random() * args.length);
      ctx.reply(`${args[rand_idx]}`);
    });
  
    return this.bot;
  }
}
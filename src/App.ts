import { Container } from "inversify";
import { Telegraf } from "telegraf";
import MiddlewareFn from "telegraf/typings/composer";
import { TYPE } from "./constants";
import "./middleware";
import CommandParser, { ContextWithState } from "./util/CommandParser";
import Logger from "./util/Logger";
import TimeLogger from "./util/TimeLogger";
import {
  getMiddlewareActionMetadata,
  getMiddlewareCommandMetadata,
  getMiddlewareHearsMetadata,
  getMiddlewareMetadata,
  getMiddlewaresFromMetadata,
} from "./util/metadata";

export interface AppContext extends ContextWithState {
  container: Container;
}

export default class App {
  private _bot: Telegraf<AppContext>;
  private _container: Container;

  constructor(token: string, container: Container) {
    this._bot = new Telegraf<AppContext>(token);
    this._container = container
    this._container
      .bind<Telegraf<AppContext>>(TYPE.BotInstance)
      .toConstantValue(this._bot);
  }

  registerCommands() {
    const constructors = getMiddlewaresFromMetadata();

    for (const constructor of constructors) {
      const name = constructor.name;

      if (this._container.isBoundNamed(TYPE.Middleware, name)) {
        throw new Error(
          `미들웨어는 같은 이름을 두개 이상 사용 할 수 없습니다: ${name}`
        );
      }

      this._container
        .bind(TYPE.Middleware)
        .to(constructor as MiddlewareConstructor)
        .whenTargetNamed(name);
    }

    if (this._container.isBound(TYPE.Middleware)) {
      const middlewares = this._container.getAll<Function>(TYPE.Middleware);
      for (const middleware of middlewares) {
        const MiddlewareMetadata = getMiddlewareMetadata(
          middleware.constructor
        );
        const commandMetadata = getMiddlewareCommandMetadata(
          middleware.constructor
        );
        const actionMetadata = getMiddlewareActionMetadata(
          middleware.constructor
        );
        const hearsMetadata = getMiddlewareHearsMetadata(
          middleware.constructor
        );

        for (const metadata of commandMetadata) {
          const handler = this.handlerFactory(
            MiddlewareMetadata.target.name,
            metadata.key
          );
          this._bot.command(metadata.command, handler);
        }

        for (const metadata of actionMetadata) {
          const handler = this.handlerFactory(
            MiddlewareMetadata.target.name,
            metadata.key
          );
          this._bot.action(metadata.triggers, handler);
        }

        for (const metadata of hearsMetadata) {
          const handler = this.handlerFactory(
            MiddlewareMetadata.target.name,
            metadata.key
          );
          this._bot.hears(metadata.triggers, handler);
        }
      }
    }
  }

  handlerFactory(
    middlewareName: string,
    key: string | symbol
  ): MiddlewareFn<AppContext> {
    return async (ctx, next) => {
      if (typeof key === "string")
        return await ctx.container
          .getNamed<Record<string, MiddlewareFn<AppContext>>>(
            TYPE.Middleware,
            middlewareName
          )
          [key](ctx, next);
    };
  }

  build() {
    this._bot.use(Logger());
    this._bot.use(TimeLogger());
    this._bot.use(CommandParser());

    this._bot.hears("브로코 브로코 브로콜리", (ctx) => ctx.reply("브로코!"));

    this._bot.hears(/=$/, (ctx) => {
      const re = /^[0-9+\-*/^()]+$/g;
      const text = ctx.message.text.split("=")[0];
      if (re.test(text)) {
        ctx.reply(eval(text));
      }
    });

    this._bot.command("pick", (ctx) => {
      const { args } = ctx.state.command;
      const rand_idx: number = Math.floor(Math.random() * args.length);
      ctx.reply(`${args[rand_idx]}`);
    });
  
    return this._bot;
  }
}
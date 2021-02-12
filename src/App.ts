import { Container } from "inversify";
import { Telegraf } from "telegraf";
import Calculator from "./middleware/Calculator";
import FreeCounter from "./middleware/FreeCounter";
import Memo from "./middleware/Memo";
import Say from "./middleware/Say";
import Select from "./middleware/Select";
import CommandParser, { ContextWithState } from "./util/CommandParser";
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
  }

  build() {
    this._bot.use(TimeLogger());
    this._bot.use(CommandParser());

    this._bot.command("pick", Select()); // 랜덤 선택
    this._bot.command("say", Say({ delete: false })); // 말하기
    this._bot.command("sayd", Say({ delete: true })); // 말하고 지우기
    this._bot.command("free", FreeCounter()); // 전역 카운터

    this._bot.hears("브로코 브로코 브로콜리", (ctx) => ctx.reply("브로코!"));
    this._bot.hears(/=$/, Calculator()); // 계산기
    this._bot.hears(/^!/, Memo()); // 메모

    return this._bot;
  }
}

import { Context, Telegraf } from "telegraf";

interface Command {
  raw: string;
  command: string;
  args: string[];
}

interface State {
  command: Command;
}

export interface ContextWithState extends Context {
  state: State;
}

export default () => (ctx, next) => {
  if (ctx.message && ctx.message.text) {
    const text = ctx.message.text;
    if (text.startsWith("/")) {
      const match = text.match(/^\/([^\s]+)\s?(.+)?/);
      let args = [];
      let command;
      if (match !== null) {
        if (match[1]) {
          command = match[1];
        }
        if (match[2]) {
          args = match[2].split(" ");
        }
      }

      ctx.state.command = {
        raw: text,
        command,
        args,
      };
    }
  }

  return next();
};

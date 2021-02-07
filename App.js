const { Telegraf } = require("telegraf");
const commandArgsMiddleware = require("./middleware/commandArgs");

class App {
  constructor(token) {
    this.bot = new Telegraf(token, {
      telegram: { webhookReply: true },
    });
    this.bot.use(commandArgsMiddleware());

    return this.bot;
  }
}

module.exports = { App };

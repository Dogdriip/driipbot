const { Telegraf } = require("telegraf");

class App {
  constructor(token) {
    this.bot = new Telegraf(token, {
      telegram: { webhookReply: true },
    });

    this.bot.hears("브로코 브로코 브로콜리", (ctx) => ctx.reply("브로코!"));

    this.bot.hears(/=$/, (ctx) => {
      ctx.reply(ctx.message.text, ctx.message.message_id);
    });

    this.bot.command("pick", (ctx) => {
      let text = ctx.message.text;
      text = text.split(" ");
      text.shift();
      const args = text;
      const len = args.length;

      if (len <= 0) return;

      ctx.reply(`${args[Math.floor(Math.random() * len)]}`);
    });

    return this.bot;
  }
}

module.exports = { App };

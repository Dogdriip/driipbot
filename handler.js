const { App } = require("./App");
const lambdaRequestHandler = require("lambda-request-handler");

const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new App(token);

bot.hears("브로코 브로코 브로콜리", (ctx) => ctx.reply("브로코!"));

bot.hears(/=$/, (ctx) => {
  const re = /^[0-9+\-*/^()]+$/g;
  const text = ctx.message.text.split("=")[0];
  if (re.test(text)) {
    ctx.reply(eval(text));
  }
});

bot.command("pick", (ctx) => {
  const { args } = ctx.state.command;
  const rand_idx = Math.floor(Math.random() * args.length);
  ctx.reply(`${args[rand_idx]}`);
});

const handler = lambdaRequestHandler(
  bot.webhookCallback(process.env.WEBHOOK_PATH)
);

module.exports = { handler };

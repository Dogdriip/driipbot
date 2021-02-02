const { Telegraf } = require("telegraf");
const lambdaRequestHandler = require("lambda-request-handler");

const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new Telegraf(token, {
  telegram: { webhookReply: true },
});

bot.hears("브로코 브로코 브로콜리", (ctx) => ctx.reply("브로코!"));

const handler = lambdaRequestHandler(
  bot.webhookCallback(process.env.WEBHOOK_PATH)
);

module.exports = { handler };

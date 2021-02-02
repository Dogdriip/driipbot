const { App } = require("./App");
const lambdaRequestHandler = require("lambda-request-handler");

const token = process.env.BOT_TOKEN;
if (token === undefined) {
  throw new Error("BOT_TOKEN must be provided!");
}

const bot = new App(token);

const handler = lambdaRequestHandler(
  bot.webhookCallback(process.env.WEBHOOK_PATH)
);

module.exports = { handler };

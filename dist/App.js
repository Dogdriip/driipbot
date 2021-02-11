"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var constants_1 = require("./constants");
require("./middleware");
var Calculator_1 = require("./middleware/Calculator");
var CommandParser_1 = require("./util/CommandParser");
var Logger_1 = require("./util/Logger");
var TimeLogger_1 = require("./util/TimeLogger");
var App = /** @class */ (function () {
    function App(token, container) {
        this._bot = new telegraf_1.Telegraf(token);
        this._container = container;
        this._container
            .bind(constants_1.TYPE.BotInstance)
            .toConstantValue(this._bot);
    }
    App.prototype.build = function () {
        this._bot.use(Logger_1.default());
        this._bot.use(TimeLogger_1.default());
        this._bot.use(CommandParser_1.default());
        this._bot.hears("브로코 브로코 브로콜리", function (ctx) { return ctx.reply("브로코!"); });
        this._bot.hears(/=$/, Calculator_1.default());
        this._bot.command("pick", function (ctx) {
            var args = ctx.state.command.args;
            var rand_idx = Math.floor(Math.random() * args.length);
            ctx.reply("" + args[rand_idx]);
        });
        this._bot.command("say", function (ctx) {
            var text = ctx.message.text;
            var match = text.match(/^\/([^\s]+)\s?(.+)?/);
            if (match[2]) {
                ctx.reply(match[2]);
            }
        });
        this._bot.command("sayd", function (ctx) {
            var text = ctx.message.text;
            var match = text.match(/^\/([^\s]+)\s?(.+)?/);
            ctx.deleteMessage(ctx.message.message_id);
            if (match[2]) {
                ctx.reply(match[2]);
            }
        });
        this._bot.command("free", function (ctx) {
            var date = [
                {
                    name: "이재명",
                    start: new Date("2019-10-21"),
                    end: new Date("2021-08-01"),
                },
                {
                    name: "이정철",
                    start: new Date("2020-01-13"),
                    end: new Date("2021-10-18"),
                },
                {
                    name: "전현승",
                    start: new Date("2022-06-01"),
                    end: new Date("2025-06-01"),
                },
                {
                    name: "오지용",
                    start: new Date("2020-02-24"),
                    end: new Date("2021-09-02"),
                },
                {
                    name: "문지현",
                    start: new Date("2020-01-06"),
                    end: new Date("2021-07-18"),
                },
                {
                    name: "최원태",
                    start: new Date(),
                    end: new Date("2020-01-01"),
                },
                {
                    name: "이상호",
                    start: new Date("2019-12-09"),
                    end: new Date("2021-06-23"),
                },
            ];
            var now = new Date();
            var res = "*음전오 전역 카운터* \n\n";
            date.forEach(function (it) {
                var total = it.end.getTime() - it.start.getTime();
                var progress = now.getTime() - it.start.getTime();
                var percentage = Math.max(0, (progress / total) * 100);
                res += "*" + it.name + "* `" + percentage + "%` \n";
                res += "`[";
                for (var n = 0; n < 20; n++) {
                    if (percentage < (n + 1) * 5) {
                        res += "·";
                    }
                    else {
                        res += "=";
                    }
                }
                res += "]`\n\n";
            });
            ctx.replyWithMarkdownV2(res);
        });
        return this._bot;
    };
    return App;
}());
exports.default = App;

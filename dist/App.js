"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var constants_1 = require("./constants");
require("./middleware");
var CommandParser_1 = require("./util/CommandParser");
var Logger_1 = require("./util/Logger");
var TimeLogger_1 = require("./util/TimeLogger");
var App = /** @class */ (function () {
    function App(token, container) {
        this.bot = new telegraf_1.Telegraf(token);
        this.container = container;
        this.container
            .bind(constants_1.TYPE.BotInstance)
            .toConstantValue(this.bot);
    }
    App.prototype.build = function () {
        this.bot.use(Logger_1.default());
        this.bot.use(TimeLogger_1.default());
        this.bot.use(CommandParser_1.default());
        this.bot.command("pick", function (ctx) {
            var args = ctx.state.command.args;
            var rand_idx = Math.floor(Math.random() * args.length);
            ctx.reply("" + args[rand_idx]);
        });
        return this.bot;
    };
    return App;
}());
exports.default = App;

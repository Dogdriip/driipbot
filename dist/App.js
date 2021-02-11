"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var constants_1 = require("./constants");
var Calculator_1 = require("./middleware/Calculator");
var FreeCounter_1 = require("./middleware/FreeCounter");
var Memo_1 = require("./middleware/Memo");
var Say_1 = require("./middleware/Say");
var Sayd_1 = require("./middleware/Sayd");
var Select_1 = require("./middleware/Select");
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
        this._bot.hears(/!$/, Memo_1.default());
        this._bot.command("pick", Select_1.default());
        this._bot.command("say", Say_1.default());
        this._bot.command("sayd", Sayd_1.default());
        this._bot.command("free", FreeCounter_1.default());
        return this._bot;
    };
    return App;
}());
exports.default = App;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_1 = require("telegraf");
var constants_1 = require("./constants");
require("./middleware");
var CommandParser_1 = require("./util/CommandParser");
var Logger_1 = require("./util/Logger");
var TimeLogger_1 = require("./util/TimeLogger");
var metadata_1 = require("./util/metadata");
var App = /** @class */ (function () {
    function App(token, container) {
        this._bot = new telegraf_1.Telegraf(token);
        this._container = container;
        this._container
            .bind(constants_1.TYPE.BotInstance)
            .toConstantValue(this._bot);
    }
    App.prototype.registerCommands = function () {
        var constructors = metadata_1.getMiddlewaresFromMetadata();
        for (var _i = 0, constructors_1 = constructors; _i < constructors_1.length; _i++) {
            var constructor = constructors_1[_i];
            var name = constructor.name;
            if (this._container.isBoundNamed(constants_1.TYPE.Middleware, name)) {
                throw new Error("\uBBF8\uB4E4\uC6E8\uC5B4\uB294 \uAC19\uC740 \uC774\uB984\uC744 \uB450\uAC1C \uC774\uC0C1 \uC0AC\uC6A9 \uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4: " + name);
            }
            this._container
                .bind(constants_1.TYPE.Middleware)
                .to(constructor)
                .whenTargetNamed(name);
        }
        if (this._container.isBound(constants_1.TYPE.Middleware)) {
            var middlewares = this._container.getAll(constants_1.TYPE.Middleware);
            for (var _a = 0, middlewares_1 = middlewares; _a < middlewares_1.length; _a++) {
                var middleware = middlewares_1[_a];
                var MiddlewareMetadata = metadata_1.getMiddlewareMetadata(middleware.constructor);
                var commandMetadata = metadata_1.getMiddlewareCommandMetadata(middleware.constructor);
                var actionMetadata = metadata_1.getMiddlewareActionMetadata(middleware.constructor);
                var hearsMetadata = metadata_1.getMiddlewareHearsMetadata(middleware.constructor);
                for (var _b = 0, commandMetadata_1 = commandMetadata; _b < commandMetadata_1.length; _b++) {
                    var metadata = commandMetadata_1[_b];
                    var handler = this.handlerFactory(MiddlewareMetadata.target.name, metadata.key);
                    this._bot.command(metadata.command, handler);
                }
                for (var _c = 0, actionMetadata_1 = actionMetadata; _c < actionMetadata_1.length; _c++) {
                    var metadata = actionMetadata_1[_c];
                    var handler = this.handlerFactory(MiddlewareMetadata.target.name, metadata.key);
                    this._bot.action(metadata.triggers, handler);
                }
                for (var _d = 0, hearsMetadata_1 = hearsMetadata; _d < hearsMetadata_1.length; _d++) {
                    var metadata = hearsMetadata_1[_d];
                    var handler = this.handlerFactory(MiddlewareMetadata.target.name, metadata.key);
                    this._bot.hears(metadata.triggers, handler);
                }
            }
        }
    };
    App.prototype.handlerFactory = function (middlewareName, key) {
        var _this = this;
        return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof key === "string")) return [3 /*break*/, 2];
                        return [4 /*yield*/, ctx.container
                                .getNamed(constants_1.TYPE.Middleware, middlewareName)[key](ctx, next)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        }); };
    };
    App.prototype.build = function () {
        this._bot.use(Logger_1.default());
        this._bot.use(TimeLogger_1.default());
        this._bot.use(CommandParser_1.default());
        this._bot.hears("브로코 브로코 브로콜리", function (ctx) { return ctx.reply("브로코!"); });
        this._bot.hears(/=$/, function (ctx) {
            var re = /^[0-9+\-*/^()]+$/g;
            var text = ctx.message.text.split("=")[0];
            if (re.test(text)) {
                ctx.reply(eval(text));
            }
        });
        this._bot.command("pick", function (ctx) {
            var args = ctx.state.command.args;
            var rand_idx = Math.floor(Math.random() * args.length);
            ctx.reply("" + args[rand_idx]);
        });
        return this._bot;
    };
    return App;
}());
exports.default = App;

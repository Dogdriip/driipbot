"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METADATA_KEY = exports.TYPE = void 0;
exports.TYPE = {
    BotInstance: Symbol.for("BotInstance"),
    Middleware: Symbol.for("Middleware"),
};
exports.METADATA_KEY = {
    middleware: "elnyanbot:middleware",
    middlewareHears: "elnyanbot:middleware-hears",
    middlewareAction: "elnyanbot:middleware-action",
    middlewareCommand: "elnyanbot:middleware-command",
};

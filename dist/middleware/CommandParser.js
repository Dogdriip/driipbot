"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () { return function (ctx, next) {
    if (ctx.message && ctx.message.text) {
        var text = ctx.message.text;
        if (text.startsWith("/")) {
            var match = text.match(/^\/([^\s]+)\s?(.+)?/);
            var args = [];
            var command = void 0;
            if (match !== null) {
                if (match[1]) {
                    command = match[1];
                }
                if (match[2]) {
                    args = match[2].split(" ");
                }
            }
            ctx.state.command = {
                raw: text,
                command: command,
                args: args,
            };
        }
    }
    return next();
}; });

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function () { return function (ctx) {
    var re = /^[0-9+\-*/^()]+$/g;
    var text = ctx.message.text.split("=")[0];
    if (re.test(text)) {
        ctx.reply(eval(text));
    }
}; });

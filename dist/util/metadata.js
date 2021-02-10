"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMiddlewareMetadata = exports.getMiddlewareHearsMetadata = exports.getMiddlewareActionMetadata = exports.getMiddlewareCommandMetadata = exports.getMiddlewaresFromMetadata = void 0;
var constants_1 = require("../constants");
function getMiddlewaresFromMetadata() {
    var arrayOfMiddlewareMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.middleware, Reflect) || [];
    return arrayOfMiddlewareMetadata.map(function (metadata) { return metadata.target; });
}
exports.getMiddlewaresFromMetadata = getMiddlewaresFromMetadata;
function getMiddlewareCommandMetadata(middleware) {
    var methodMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.middlewareCommand, middleware) || [];
    return methodMetadata;
}
exports.getMiddlewareCommandMetadata = getMiddlewareCommandMetadata;
function getMiddlewareActionMetadata(middleware) {
    var methodMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.middlewareAction, middleware) || [];
    return methodMetadata;
}
exports.getMiddlewareActionMetadata = getMiddlewareActionMetadata;
function getMiddlewareHearsMetadata(middleware) {
    var methodMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.middlewareHears, middleware) || [];
    return methodMetadata;
}
exports.getMiddlewareHearsMetadata = getMiddlewareHearsMetadata;
function getMiddlewareMetadata(middleware) {
    var MiddlewareMetadata = Reflect.getMetadata(constants_1.METADATA_KEY.middleware, middleware);
    return MiddlewareMetadata;
}
exports.getMiddlewareMetadata = getMiddlewareMetadata;

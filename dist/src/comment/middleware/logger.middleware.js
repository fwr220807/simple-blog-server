"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
const log4js_1 = require("../../utils/log4js");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        const code = res.statusCode;
        next();
        const logFormat = `Method:${req.method}
      Request original url: ${req.originalUrl}
      IP:${req.ip}
      Status code:${code} `;
        if (code >= 500) {
            log4js_1.Logger.error(logFormat);
        }
        else if (code >= 400) {
            log4js_1.Logger.warn(logFormat);
        }
        else {
            log4js_1.Logger.access(logFormat);
            log4js_1.Logger.log(logFormat);
        }
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
function logger(req, res, next) {
    const code = res.statusCode;
    next();
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Params: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    if (code >= 500) {
        log4js_1.Logger.error(logFormat);
    }
    else if (code >= 400) {
        log4js_1.Logger.warn(logFormat);
    }
    else {
        log4js_1.Logger.access(logFormat);
        log4js_1.Logger.log(logFormat);
    }
}
exports.logger = logger;
//# sourceMappingURL=logger.middleware.js.map
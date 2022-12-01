"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const log4js_1 = require("../utils/log4js");
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    async intercept(context, next) {
        const req = context.getArgByIndex(1).req;
        return next.handle().pipe((0, operators_1.map)((data) => {
            const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        User: ${JSON.stringify(req.user)}
        Response data:\n ${JSON.stringify(req.data)}
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`;
            log4js_1.Logger.info(logFormat);
            log4js_1.Logger.access(logFormat);
            this.removePassword(data);
            if (data === null || data === void 0 ? void 0 : data.meta) {
                data.code = 200;
            }
            return (data === null || data === void 0 ? void 0 : data.meta) ? data : { code: 200, data };
        }));
    }
    removePassword(data) {
        for (const key in data) {
            if (key === 'password') {
                delete data[key];
            }
            else if (!data[key] && typeof data[key] === 'object') {
                this.removePassword(data[key]);
            }
        }
    }
};
TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;
//# sourceMappingURL=transform.interceptor.js.map
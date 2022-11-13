"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPLoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let HTTPLoggingInterceptor = class HTTPLoggingInterceptor {
    intercept(context, next) {
        const now = Date.now();
        const request = context.switchToHttp().getRequest();
        const method = request.method;
        const url = request.originalUrl;
        return next.handle().pipe((0, operators_1.tap)(() => {
            const response = context.switchToHttp().getResponse();
            const delay = Date.now() - now;
            console.log(`${response.statusCode} | [${method}] ${url} - ${delay}ms`);
        }), (0, operators_1.catchError)((error) => {
            const response = context.switchToHttp().getResponse();
            const delay = Date.now() - now;
            console.error(`${response.statusCode} | [${method}] ${url} - ${delay}ms`);
            return (0, rxjs_1.throwError)(error);
        }));
    }
};
HTTPLoggingInterceptor = __decorate([
    (0, common_1.Injectable)()
], HTTPLoggingInterceptor);
exports.HTTPLoggingInterceptor = HTTPLoggingInterceptor;
//# sourceMappingURL=view.interceptor.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const validate_1 = require("./common/validate");
const transform_interceptor_1 = require("./interceptor/transform.interceptor");
const logger_middleware_1 = require("./middleware/logger.middleware");
const express = require("express");
const http_exception_filter_1 = require("./filter/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new validate_1.default());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.setGlobalPrefix('api');
    app.useStaticAssets('uploads', { prefix: '/uploads' });
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(logger_middleware_1.logger);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map
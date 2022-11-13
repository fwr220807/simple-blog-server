"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataMiddleware = void 0;
function dataMiddleware(req, res, next) {
    console.log('Request...', req.url, req.body, req.query);
    next();
}
exports.dataMiddleware = dataMiddleware;
//# sourceMappingURL=data.middleware.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpAddress = void 0;
const common_1 = require("@nestjs/common");
const requestIp = require("request-ip");
exports.IpAddress = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (req.clientIp)
        return req.clientIp;
    return requestIp.getClientIp(req);
});
//# sourceMappingURL=ipAddress.decorator.js.map
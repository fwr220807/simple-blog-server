"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogViewMiddleware = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let BlogViewMiddleware = class BlogViewMiddleware {
    constructor(prisma) {
        this.prisma = prisma;
        this.record = new Set();
    }
    async use(request, response, next) {
        const { ip } = request;
        const blog = await this.prisma.blog.findUnique({
            where: {
                id: 1,
            },
        });
        this.viewAddOne(ip, blog.viewCount);
        next();
    }
    async viewAddOne(clientIp, viewCount) {
        if (!this.record.has(clientIp)) {
            this.record.add(clientIp);
            setTimeout(() => {
                this.record.delete(clientIp);
            }, 900000);
            await this.prisma.blog.update({
                where: {
                    id: 1,
                },
                data: {
                    viewCount: viewCount + 1,
                },
            });
        }
    }
};
BlogViewMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogViewMiddleware);
exports.BlogViewMiddleware = BlogViewMiddleware;
//# sourceMappingURL=blogView.middleware.js.map
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
exports.CommentService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const md5 = require('md5');
let CommentService = class CommentService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async create(routeName, createVisitorCommentDto) {
        let commentParent = await this.prisma.comment.findUnique({
            where: {
                id: +createVisitorCommentDto.parentId,
            },
        });
        let article = await this.prisma.article.findUnique({
            where: {
                routeName: routeName,
            },
        });
        await this.prisma.article.update({
            where: {
                routeName: routeName,
            },
            data: {
                commentCount: article.commentCount + 1,
            },
        });
        let userId;
        let visitorId;
        let email = createVisitorCommentDto.email;
        let user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            userId = user.id;
        }
        else {
            let visitor = await this.prisma.visitor.findUnique({
                where: {
                    email,
                },
            });
            if (!visitor) {
                visitor = await this.prisma.visitor.create({
                    data: {
                        email: email,
                        name: createVisitorCommentDto.name,
                        avatar: `https://cravatar.cn/avatar/${md5(email)}?d=retro`,
                        website: createVisitorCommentDto.website,
                    },
                });
            }
            visitorId = visitor.id;
        }
        let commentLevelGroup = await this.prisma.comment.findMany({
            where: {
                articleId: article.id,
                level: {
                    startsWith: commentParent.level + '.',
                },
            },
        });
        let tempLevel = 0;
        commentLevelGroup.forEach((item) => (tempLevel = Math.max(parseInt(item.level.slice(commentParent.level.length + 1)), tempLevel)));
        let level = commentParent.level + '.' + (tempLevel + 1);
        return await this.prisma.comment.create({
            data: {
                parentId: +createVisitorCommentDto.parentId,
                content: createVisitorCommentDto.content,
                articleId: article.id,
                audit: false,
                show: false,
                userId: userId,
                visitorId: visitorId,
                level: level,
            },
        });
    }
    async findOne(routeName, args) {
        const limit = +this.config.get('COMMENT_LIMIT');
        const page = args.page ? +args.page : 1;
        const article = await this.prisma.article.findUnique({
            where: {
                routeName,
            },
        });
        if (!article) {
            throw new common_1.BadRequestException('请求文章路由名称错误');
        }
        const commentRoot = await this.prisma.comment.findFirst({
            where: {
                articleId: article.id,
                parentId: 0,
            },
        });
        const comments = (await this.prisma.comment.findMany({
            where: {
                articleId: article.id,
                show: true,
            },
            select: {
                id: true,
                createdAt: true,
                parentId: true,
                level: true,
                content: true,
                user: {
                    select: {
                        name: true,
                        avatar: true,
                        website: true,
                    },
                },
                visitor: {
                    select: {
                        name: true,
                        avatar: true,
                        website: true,
                    },
                },
            },
        })) || [];
        let total = comments.reduce((count, current) => (current.parentId === commentRoot.id ? (count += 1) : count), 0);
        return {
            meta: {
                current_page: page,
                page_row: limit,
                total,
                total_page: Math.ceil(total / limit),
            },
            data: comments,
            commentRootId: commentRoot.id,
        };
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map
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
const enum_1 = require("../auth/enum");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let CommentService = class CommentService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async create(articleId, createVisitorCommentDto) {
        let commentParent = await this.prisma.comment.findUnique({
            where: {
                id: +createVisitorCommentDto.parentId,
            },
        });
        let article = await this.prisma.article.findUnique({
            where: {
                id: articleId,
            },
        });
        await this.prisma.article.update({
            where: {
                id: articleId,
            },
            data: {
                commentCount: article.commentCount + 1,
            },
        });
        let email = createVisitorCommentDto.email;
        let user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: email,
                    name: 'visitor',
                    password: '12345678',
                    role: enum_1.Role.VISITOR,
                    avatar: 'http://localhost:3000/uploads/1663473559783-5332236027.png',
                },
            });
        }
        let commentLevelGroup = await this.prisma.comment.findMany({
            where: {
                articleId: articleId,
                level: {
                    startsWith: commentParent.level + '.',
                },
            },
        });
        let level = commentLevelGroup.length === 0
            ? commentParent.level + '.1'
            : commentParent.level + '.' + (commentLevelGroup.length + 1);
        return await this.prisma.comment.create({
            data: {
                parentId: +createVisitorCommentDto.parentId,
                content: createVisitorCommentDto.content,
                articleId: articleId,
                audit: false,
                show: false,
                userId: user.id,
                level: level,
            },
        });
    }
    async findOne(id, args) {
        const limit = +this.config.get('COMMENT_LIMIT');
        const page = args.page ? +args.page : 1;
        const commentRoot = await this.prisma.comment.findFirst({
            where: {
                articleId: id,
                parentId: 0,
            },
        });
        const comments = (await this.prisma.comment.findMany({
            where: {
                articleId: id,
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
                    },
                },
            },
        })) || [];
        let total = comments.reduce((count, current) => (current.parentId === commentRoot.id ? count++ : count), 0);
        let data = [];
        if (comments.length !== 0) {
            data = this.transform(comments).slice((page - 1) * limit, (page - 1) * limit + limit);
        }
        return {
            meta: {
                current_page: page,
                page_row: limit,
                total,
                total_page: Math.ceil(comments.length / limit),
            },
            data: data,
        };
    }
    transform(comments) {
        let data = comments.filter((comment) => comment.level.indexOf('0.') !== -1);
        data.forEach((item) => {
            item['secondaryComment'] = comments.filter((comment) => comment.level.indexOf(`${item.level}.`) !== -1);
        });
        return data.reverse();
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map
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
exports.ArticleService = void 0;
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ArticleService = class ArticleService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async create(createArticleDto) {
        const article = await this.prisma.article.create({
            data: {
                title: createArticleDto.title,
                content: createArticleDto.content,
                categoryId: +createArticleDto.categoryId,
            },
        });
        await this.prisma.comment.create({
            data: {
                parentId: 0,
                level: '0',
                content: '文章评论根节点',
                audit: true,
                show: false,
                articleId: article.id,
                userId: 1,
                secondaryParentId: 0,
            },
        });
        return article;
    }
    async findAll(args) {
        const row = +this.config.get('ARTICLE_PAGE_ROW');
        const page = args.page ? +args.page : 1;
        const articles = await this.prisma.article.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            skip: (page - 1) * row,
            take: row,
            include: {
                category: true,
            },
        });
        articles.forEach((item) => {
            item.content = item.content.slice(0, 75) + '...';
        });
        const total = await this.prisma.article.count();
        return {
            meta: {
                current_page: page,
                total,
                total_page: Math.ceil(total / row),
            },
            data: articles,
        };
    }
    async findAllCategory(args) {
        const row = +this.config.get('ARTICLE_PAGE_ROW');
        const page = args.page ? +args.page : 1;
        const categoryId = +args.categoryId;
        const articles = await this.prisma.article.findMany({
            where: {
                categoryId: categoryId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip: (page - 1) * row,
            take: row,
            include: {
                category: true,
            },
        });
        articles.forEach((item) => {
            item.content = item.content.slice(0, 75) + '...';
        });
        const total = await this.prisma.article.count({
            where: {
                categoryId: categoryId,
            },
        });
        return {
            meta: {
                current_page: page,
                total,
                total_page: Math.ceil(total / row),
            },
            data: articles,
        };
    }
    async findOne(id) {
        const article = await this.prisma.article.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
            },
        });
        await this.prisma.article.update({
            where: {
                id,
            },
            data: {
                viewCount: article.viewCount + 1,
            },
        });
        return article;
    }
    async update(id, updateArticleDto) {
        return await this.prisma.article.update({
            where: {
                id,
            },
            data: {
                title: updateArticleDto.title,
                content: updateArticleDto.content,
                categoryId: +updateArticleDto.categoryId,
            },
        });
    }
    async remove(id) {
        return await this.prisma.article.delete({
            where: {
                id,
            },
        });
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map
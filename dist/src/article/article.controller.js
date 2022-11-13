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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const enum_1 = require("../auth/enum");
const common_1 = require("@nestjs/common");
const article_service_1 = require("./article.service");
const ipAddress_decorator_1 = require("./decorators/ipAddress.decorator");
const create_article_dto_1 = require("./dto/create-article.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
const article_entity_1 = require("./entities/article.entity");
const articleList_entity_1 = require("./entities/articleList.entity");
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    create(createArticleDto) {
        return this.articleService.create(createArticleDto);
    }
    async findAll(args = {}) {
        const articleList = await this.articleService.findAll(args);
        return new articleList_entity_1.ArticleList(articleList);
    }
    async findAllCategory(args = {}) {
        const articleList = await this.articleService.findAllCategory(args);
        return new articleList_entity_1.ArticleList(articleList);
    }
    async findOne(routeName, clientIp) {
        const article = await this.articleService.findOne(routeName, clientIp);
        return new article_entity_1.Article(article);
    }
    update(routeName, updateArticleDto) {
        return this.articleService.update(routeName, updateArticleDto);
    }
    remove(routeName) {
        return this.articleService.remove(routeName);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_article_dto_1.CreateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('category'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAllCategory", null);
__decorate([
    (0, common_1.Get)(':routeName'),
    __param(0, (0, common_1.Param)('routeName')),
    __param(1, (0, ipAddress_decorator_1.IpAddress)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':routeName'),
    (0, auth_decorator_1.Auth)(enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('routeName')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_article_dto_1.UpdateArticleDto]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':routeName'),
    (0, auth_decorator_1.Auth)(enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)(':routeName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "remove", null);
ArticleController = __decorate([
    (0, common_1.Controller)('article'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
//# sourceMappingURL=article.controller.js.map
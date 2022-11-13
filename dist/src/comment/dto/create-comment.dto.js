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
exports.CreateVisitorCommentDto = void 0;
const class_validator_1 = require("class-validator");
class CreateVisitorCommentDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '邮件地址不能为空' }),
    __metadata("design:type", String)
], CreateVisitorCommentDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '名称不能为空' }),
    __metadata("design:type", String)
], CreateVisitorCommentDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '回复内容不能为空' }),
    __metadata("design:type", String)
], CreateVisitorCommentDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '父节点不能为空' }),
    __metadata("design:type", Number)
], CreateVisitorCommentDto.prototype, "parent_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '文章ID不能为空' }),
    __metadata("design:type", Number)
], CreateVisitorCommentDto.prototype, "articleId", void 0);
exports.CreateVisitorCommentDto = CreateVisitorCommentDto;
//# sourceMappingURL=create-comment.dto.js.map
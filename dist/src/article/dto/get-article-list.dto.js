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
exports.GetArticleListDto = void 0;
const is_exists_rule_1 = require("../../common/rules/is-exists.rule");
const class_validator_1 = require("class-validator");
class GetArticleListDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '前端路由名称不能为空（英文）' }),
    (0, is_exists_rule_1.IsExitsRule)('category', { message: '该前端路由不存在' }),
    __metadata("design:type", String)
], GetArticleListDto.prototype, "routeName", void 0);
exports.GetArticleListDto = GetArticleListDto;
//# sourceMappingURL=get-article-list.dto.js.map
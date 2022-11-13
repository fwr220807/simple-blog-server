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
exports.CreateCategoryDto = void 0;
const is_not_exists_rule_1 = require("../../common/rules/is-not-exists.rule");
const class_validator_1 = require("class-validator");
class CreateCategoryDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '栏目不能为空' }),
    (0, is_not_exists_rule_1.IsNotExitsRule)('category', { message: '栏目名称已存在' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '前端路由名称不能为空（英文）' }),
    (0, is_not_exists_rule_1.IsNotExitsRule)('category', { message: '栏目前端路由已存在' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "routeName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: '栏目描述不能为空' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "describe", void 0);
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=create-category.dto.js.map
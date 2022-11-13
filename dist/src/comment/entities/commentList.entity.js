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
exports.CommentList = void 0;
const class_transformer_1 = require("class-transformer");
const dayjs = require("dayjs");
class CommentList {
    constructor(options) {
        Object.assign(this, options);
    }
}
__decorate([
    (0, class_transformer_1.Transform)(({ value: comments }) => {
        const data = [];
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i];
            comment.createdAt = dayjs(comment.createdAt).format('YY 年 MM 月 DD 日');
            comment.people = comment.user || comment.visitor;
            delete comment.user;
            delete comment.visitor;
            comment.level = comment.level.slice(2);
            let level = comment.level.split('.')[0];
            if (!data[level - 1]) {
                comment['secondaryComment'] = [];
                data[level - 1] = comment;
            }
            else {
                data[level - 1]['secondaryComment'].push(comment);
            }
        }
        return data.filter((item) => Boolean(item)).reverse();
    }),
    __metadata("design:type", Object)
], CommentList.prototype, "data", void 0);
exports.CommentList = CommentList;
//# sourceMappingURL=commentList.entity.js.map
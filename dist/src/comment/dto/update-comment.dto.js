"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVisitorCommentDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_visitor_comment_dto_1 = require("./create-visitor-comment.dto");
class UpdateVisitorCommentDto extends (0, mapped_types_1.PartialType)(create_visitor_comment_dto_1.CreateVisitorCommentDto) {
}
exports.UpdateVisitorCommentDto = UpdateVisitorCommentDto;
//# sourceMappingURL=update-comment.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class Validate extends common_1.ValidationPipe {
    flattenValidationErrors(validationErrors) {
        const errors = {};
        validationErrors.forEach((error) => {
            errors[error.property] = Object.values(error.constraints)[0];
        });
        throw new common_1.HttpException({ statusCode: 422, errors }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.default = Validate;
//# sourceMappingURL=validate.js.map
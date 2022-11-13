"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadFile = exports.fileFilter = exports.Upload = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
function Upload(field = 'file', options) {
    return (0, common_1.applyDecorators)((0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)(field, options)));
}
exports.Upload = Upload;
function fileFilter(type) {
    return (req, file, callback) => {
        const check = type.some((item) => file.mimetype.includes(item));
        if (!check) {
            callback(new common_1.MethodNotAllowedException('文件类型错误'), false);
        }
        else {
            callback(null, true);
        }
    };
}
exports.fileFilter = fileFilter;
function UploadFile(field = 'file', type) {
    return Upload(field, {
        limits: { fieldSize: Math.pow(1024, 2) * 3 },
        fileFilter: fileFilter(type),
    });
}
exports.UploadFile = UploadFile;
//# sourceMappingURL=upload.decorator.js.map
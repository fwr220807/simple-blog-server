"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotAdminRule = void 0;
const class_validator_1 = require("class-validator");
function IsNotAdminRule(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsNotAdminRule',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value, args) {
                    console.log(value);
                    return Boolean(value !== 'admin');
                },
            },
        });
    };
}
exports.IsNotAdminRule = IsNotAdminRule;
//# sourceMappingURL=is-not-admin.rule.js.map
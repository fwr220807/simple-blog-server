"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsConfirmRule = void 0;
const class_validator_1 = require("class-validator");
function IsConfirmRule(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsConfirmRule',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                async validate(value, args) {
                    return Boolean(value === args.object[`${args.property}_confirm`]);
                },
            },
        });
    };
}
exports.IsConfirmRule = IsConfirmRule;
//# sourceMappingURL=is-confirm.rule.js.map
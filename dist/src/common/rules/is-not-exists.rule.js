"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotExitsRule = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
function IsNotExitsRule(table, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsNotExitsRule',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [table],
            options: validationOptions,
            validator: {
                async validate(value, args) {
                    const prisma = new client_1.PrismaClient();
                    const res = await prisma[table].findUnique({
                        where: {
                            [propertyName]: args.value,
                        },
                    });
                    return !Boolean(res);
                },
            },
        });
    };
}
exports.IsNotExitsRule = IsNotExitsRule;
//# sourceMappingURL=is-not-exists.rule.js.map
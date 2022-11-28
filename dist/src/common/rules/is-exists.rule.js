"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsExitsRule = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
function IsExitsRule(table, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'IsExitsRule',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [table],
            options: validationOptions,
            validator: {
                async validate(value, args) {
                    console.log(object);
                    console.log(propertyName);
                    const prisma = new client_1.PrismaClient();
                    const res = await prisma[table].findUnique({
                        where: {
                            [propertyName]: args.value,
                        },
                    });
                    return Boolean(res);
                },
            },
        });
    };
}
exports.IsExitsRule = IsExitsRule;
//# sourceMappingURL=is-exists.rule.js.map
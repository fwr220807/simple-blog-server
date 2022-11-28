import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

// 验证是否已经存在用户名的装饰器规则
// table 为传入的参数，为需要查询的数据库表名
export function IsExitsRule(table: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {



    registerDecorator({
      name: 'IsExitsRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [table],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          console.log(object);
          console.log(propertyName);
          const prisma = new PrismaClient()
          const res = await prisma[table].findUnique({
            where: {
              // 变量的属性名需要这样写
              [propertyName]: args.value,
            },
          })

          return Boolean(res)
        },
      },
    })
  }
}

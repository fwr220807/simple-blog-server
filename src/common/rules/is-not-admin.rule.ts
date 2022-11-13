import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

// 验证不能创建管理员权限的装饰器规则
// table 为传入的参数，为需要查询的数据库表名
export function IsNotAdminRule(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsNotAdminRule',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: string, args: ValidationArguments) {
          console.log(value)

          return Boolean(value !== 'admin')
        },
      },
    })
  }
}

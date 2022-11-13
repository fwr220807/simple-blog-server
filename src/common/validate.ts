// 自定义系统自带的验证管道 ValidationPipe，目的在重写出现错误时返回的数据，应用时在 main.ts 里 use 应用。并且想要配合 dto 验证类使用（如 auth 文件夹下的 dto 文件）
import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const errors = {}
    validationErrors.forEach((error) => {
      errors[error.property] = Object.values(error.constraints)[0]
    })

    throw new HttpException({ statusCode: 422, errors }, HttpStatus.UNPROCESSABLE_ENTITY)
  }
}

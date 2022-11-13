import { IsNotEmpty } from 'class-validator'
import { IsExitsRule } from 'src/common/rules/is-exists.rule'

export default class LoginDto {
  @IsNotEmpty({ message: '邮件地址不能为空' })
  // * 由于 visitor 也放user 表了，还需要判断 visitor 的情况
  @IsExitsRule('user', { message: '邮件地址账号不存在' })
  email: string
  @IsNotEmpty({ message: '密码不能为空' })
  password: string
}

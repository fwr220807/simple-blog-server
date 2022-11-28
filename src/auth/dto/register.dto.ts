// 定义数据的类型，并且带校验功能，需在路由接收数据时使用该类定义接收的数据，即可对数据进行校验。（如 auth.controller.ts 文件）
import { IsNotAdminRule } from '@/common/rules/is-not-admin.rule'
import { IsNotEmpty } from 'class-validator'
import { IsConfirmRule } from 'src/common/rules/is-confirm.rule'
import { IsNotExitsRule } from 'src/common/rules/is-not-exists.rule'

export default class RegisterDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  // 用装饰器自定义规则
  // * 由于 visitor 也放user 表了，还需要判断 visitor 的情况
  @IsNotExitsRule('user', { message: '用户名已经注册' })
  username: string
  @IsNotEmpty({ message: '邮件地址不能为空' })
  // 用装饰器自定义规则
  // * 由于 visitor 也放user 表了，还需要判断 visitor 的情况
  @IsNotExitsRule('user', { message: '邮件地址已经注册' })
  email: string
  @IsNotEmpty({ message: '名称不能为空' })
  name: string
  @IsNotEmpty({ message: '密码不能为空' })
  @IsConfirmRule({ message: '两次密码输入不一致' })
  password: string
  @IsNotEmpty({ message: '确认密码不能为空' })
  password_confirm: string
}

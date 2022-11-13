import { IsNotExitsRule } from '@/common/rules/is-not-exists.rule'
import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty({ message: '栏目不能为空' })
  @IsNotExitsRule('category', { message: '栏目名称已存在' })
  title: string
  @IsNotEmpty({ message: '前端路由名称不能为空（英文）' })
  @IsNotExitsRule('category', { message: '栏目前端路由已存在' })
  routeName: string
  @IsNotEmpty({ message: '栏目描述不能为空' })
  describe: string
}

import { IsNotEmpty } from 'class-validator'

// 游客身份下的评论校验，这里不对 email 校验
export class CreateVisitorCommentDto {
  @IsNotEmpty({ message: '邮件地址不能为空' })
  email: string
  @IsNotEmpty({ message: '名称不能为空' })
  name: string
  @IsNotEmpty({ message: '回复内容不能为空' })
  content: string
  website: string
  @IsNotEmpty({ message: '父节点 ID 不能为空' })
  parentId: number
}

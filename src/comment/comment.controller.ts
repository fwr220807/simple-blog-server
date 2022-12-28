import { Auth } from '@/auth/decorators/auth.decorator'
import { Role } from '@/auth/enum'
import { Controller, Get, Post, Body, Param, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CreateVisitorCommentDto } from './dto/create-visitor-comment.dto'
import { CommentList } from './entities/commentList.entity'

@Controller('comment')
// 序列化，处理出参数据，配合 entity 使用
@UseInterceptors(ClassSerializerInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  // 发表一个评论
  @Post(':routeName')
  create(@Param('routeName') routeName: string, @Body() createVisitorCommentDto: CreateVisitorCommentDto) {
    console.log(routeName)

    return this.commentService.create(routeName, createVisitorCommentDto)
  }

  // 获取文章评论
  @Get(':routeName')
  async findOne(@Param('routeName') routeName: string, @Query() args: Record<string, any>) {
    const commentList = await this.commentService.findOne(routeName, args)
    return new CommentList(commentList)
  }

  // 获取所有文章评论
}

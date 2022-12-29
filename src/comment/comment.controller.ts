import { Auth } from '@/auth/decorators/auth.decorator'
import { Role } from '@/auth/enum'
import { IpAddress } from '@/common/decorators/ipAddress.decorator'
import { Controller, Get, Post, Body, Param, Query, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common'
import { CommentService } from './comment.service'
import { Comment } from './constant/enum'
import { CreateVisitorCommentDto } from './dto/create-visitor-comment.dto'
import { AdminCommentsList } from './entities/adminCommentsList.entity'
import { CommentsList } from './entities/commentsList.entity'

@Controller('comment')
// 序列化，处理出参数据，配合 entity 使用
@UseInterceptors(ClassSerializerInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  // 后台管理系统 api
  @Post('read')
  @Auth(Role.ADMIN)
  // 获取已读评论（审核为 true + 展示为 true）
  async findReadComments() {
    const commentsList = await this.commentService.findComments(Comment.Read)
    return commentsList
  }

  // 后台管理系统 api
  @Post('unread')
  @Auth(Role.ADMIN)
  // 获取未读评论（审核为 false）
  async findUnReadComments() {
    const commentsList = await this.commentService.findComments(Comment.Unread)
    return new AdminCommentsList(commentsList)
  }

  // 后台管理系统 api
  @Post('garbage')
  @Auth(Role.ADMIN)
  // 获取垃圾评论（审核为 true + 展示为 false）
  async findGarbageComments() {
    const commentsList = await this.commentService.findComments(Comment.Garbage)
    return commentsList
  }

  // 发表一个评论
  @Post(':routeName')
  create(@Param('routeName') routeName: string, @Body() createVisitorCommentDto: CreateVisitorCommentDto, @IpAddress() clientIp: string) {
    return this.commentService.create(routeName, createVisitorCommentDto, clientIp)
  }

  // 获取文章评论
  @Get(':routeName')
  async findOne(@Param('routeName') routeName: string, @Query() args: Record<string, any>) {
    const commentsList = await this.commentService.findOne(routeName, args)
    return new CommentsList(commentsList)
  }
}

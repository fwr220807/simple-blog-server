import { PrismaService } from '@/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Comment } from './constant/enum'
import { CreateVisitorCommentDto } from './dto/create-visitor-comment.dto'
const md5 = require('md5')

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService, private config: ConfigService) { }
  // 创建评论
  async create(routeName: string, createVisitorCommentDto: CreateVisitorCommentDto, clientIp: string) {
    // 获取当前子评论所要回复的父评论
    let commentParent = await this.prisma.comment.findUnique({
      where: {
        id: +createVisitorCommentDto.parentId,
      },
    })

    // 文章评论数喜加一
    let article = await this.prisma.article.findUnique({
      where: {
        routeName: routeName,
      },
    })
    await this.prisma.article.update({
      where: {
        routeName: routeName,
      },
      data: {
        commentCount: article.commentCount + 1,
      },
    })

    let userId: number
    let visitorId: number
    let email = createVisitorCommentDto.email
    // 查询 email 是否已经在 user 表登记过
    let user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    //如果登记过，则直接记录其 userID，用于创建评论
    if (user) {
      userId = user.id
    } else {
      // 如果没在 user 表登记过，则接着查询 visitor 表
      let visitor = await this.prisma.visitor.findUnique({
        where: {
          email,
        },
      })
      // 没有登记过，则直接创建 visitor
      if (!visitor) {
        visitor = await this.prisma.visitor.create({
          data: {
            email: email,
            name: createVisitorCommentDto.name,
            avatar: `https://cravatar.cn/avatar/${md5(email)}?d=retro`,
            website: createVisitorCommentDto.website,
          },
        })
      }
      // 记录其 visitorID，用于创建评论
      visitorId = visitor.id
    }

    // 获取当前层级的评论
    let commentLevelGroup = await this.prisma.comment.findMany({
      where: {
        articleId: article.id,
        level: {
          startsWith: commentParent.level + '.',
        },
      },
    })
    // 给创建的评论推算出层级
    let tempLevel = 0
    commentLevelGroup.forEach(
      (item) => (tempLevel = Math.max(parseInt(item.level.slice(commentParent.level.length + 1)), tempLevel)),
    )
    let level = commentParent.level + '.' + (tempLevel + 1)

    return await this.prisma.comment.create({
      data: {
        parentId: +createVisitorCommentDto.parentId,
        content: createVisitorCommentDto.content,
        articleId: article.id,
        audit: false,
        show: false,
        userId: userId,
        visitorId: visitorId,
        level: level,
        ipAddress: clientIp
      },
    })
  }
  // 获取某一页评论
  async findOne(routeName: string, args: Record<string, any>) {
    // 获取每页限制的一级评论数
    const limit = +this.config.get('COMMENT_LIMIT')
    // 获取 query 参数的 page
    const page = args.page ? +args.page : 1
    // 获取该文章 ID
    const article = await this.prisma.article.findUnique({
      where: {
        routeName,
      },
    })

    if (!article) {
      throw new BadRequestException('请求文章路由名称错误')
    }

    // 获取该文章的评论根节点
    const commentRoot = await this.prisma.comment.findFirst({
      where: {
        articleId: article.id,
        parentId: 0,
      },
    })

    // 获取该文章所有审核过且符合要求的评论,如果没有评论则变成一个空数组
    const comments =
      (await this.prisma.comment.findMany({
        where: {
          articleId: article.id,
          show: true,
        },
        select: {
          id: true,
          createdAt: true,
          parentId: true,
          level: true,
          content: true,
          user: {
            select: {
              name: true,
              avatar: true,
              website: true,
            },
          },
          visitor: {
            select: {
              name: true,
              avatar: true,
              website: true,
            },
          },
        },
      })) || []
    // 计算主评论总数 total
    let total = comments.reduce((count, current) => (current.parentId === commentRoot.id ? (count += 1) : count), 0)

    return {
      // 用于前端展示
      meta: {
        // 当前页码
        current_page: page,
        // 一页多少条文章
        page_row: limit,
        // 主评论总数
        total,
        // 总页数
        total_page: Math.ceil(total / limit),
      },
      data: comments,
      commentRootId: commentRoot.id,
    }
  }

  async findComments(commentType: Comment) {
    // 根据评论的类型生成对应的过滤参数
    const whereArgs = commentType === Comment.Unread ? { audit: false } :
      commentType === Comment.Read ? { audit: true, show: true } :
        { audit: true, show: false }

    const comments = (await this.prisma.comment.findMany({
      where: {
        // level = '0' 是所有文章的根评论节点，不需要返回给前端
        level: {
          not: '0'
        },
        ...whereArgs
      },
      select: {
        id: true,
        createdAt: true,
        level: true,
        parentId: true,
        content: true,
        ipAddress: true,
        article: {
          select: {
            title: true,
            routeName: true
          }
        },
        user: {
          select: {
            name: true,
            email: true,
            avatar: true,
          },
        },
        visitor: {
          select: {
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    })) || []


    // 处理评论，如果是次评论，则附带上父评论的信息，如果是主评论则不需要处理
    const newComments = []
    comments.forEach(async (comment) => {
      // 匹配主评论的正则表达式
      const patternMajorComment = /^0.[0-9]+$/
      // 子评论
      if (!patternMajorComment.test(comment.level)) {
        // 获取父级评论相关信息
        const parentComment = await this.prisma.comment.findUnique({
          where: {
            id: comment.id
          },
          select: {
            id: true,
            createdAt: true,
            content: true,
            user: {
              select: {
                name: true,
              },
            },
            visitor: {
              select: {
                name: true,
              },
            },
          }
        })

        comment['parentComment'] = parentComment
      }
      newComments.push(comment)
    })


    return {
      meta: {},
      data: newComments
    }
  }
}

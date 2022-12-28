import { PrismaService } from '@/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Injectable()
export class ArticleService {
  private record = new Set()
  constructor(private prisma: PrismaService, private config: ConfigService) { }

  // 创建文章
  async create(createArticleDto: CreateArticleDto) {
    const article = await this.prisma.article.create({
      data: {
        title: createArticleDto.title,
        content: createArticleDto.content,
        routeName: createArticleDto.routeName,
        categoryId: +createArticleDto.categoryId,
      },
    })
    // 创建一个空的评论，parentId 为 0 ，作为该文章的评论根节点
    await this.prisma.comment.create({
      data: {
        parentId: 0,
        level: '0',
        content: '文章评论根节点',
        audit: true,
        show: false,
        articleId: article.id,
        userId: 1,
      },
    })

    return article
  }

  // 返回当前页文章列表，需要对内容修剪返回给前端
  async findArticles(args: Record<string, any>) {
    // 从 .env 取一页文章数，row 为 string 需转换成 int
    const row = +this.config.get('ARTICLE_PAGE_ROW')
    // 获取 query 参数的 page
    const page = args.page ? +args.page : 1

    const articles = await this.prisma.article.findMany({
      orderBy: {
        // 按创建时间倒序输出
        createdAt: 'desc',
      },
      // 跳过多少条文章
      skip: (page - 1) * row,
      // 取多少条文章
      take: row,
      include: {
        category: true,
      },
    })

    // 将返回的内容裁剪成100个字符
    articles.forEach((item) => {
      item.content = item.content.slice(0, 75) + '...'
    })

    const total = await this.prisma.article.count()

    return {
      // 用于前端展示
      meta: {
        // 当前页码
        current_page: page,
        // 一页多少条文章
        // page_row: row,
        // 文章总数
        total,
        // 总页数
        total_page: Math.ceil(total / row),
      },
      data: articles,
    }
  }

  // 返回所有文章
  async findAllArticles(orderBy: Record<string, any>) {
    const articles = await this.prisma.article.findMany({
      orderBy,
      include: {
        category: true
      },
    })

    // 将返回的内容裁剪成100个字符
    articles.forEach((item) => {
      item.content = item.content.slice(0, 75) + '...'
    })

    return {
      // 用于前端展示
      meta: {},
      data: articles,
    }
  }

  // 查询栏目文章
  async findAllCategory(args: Record<string, any>) {
    // 从 .env 取一页文章数，row 为 string 需转换成 int
    const row = +this.config.get('ARTICLE_PAGE_ROW')
    // 获取 query 参数的 page
    const page = args.page ? +args.page : 1
    const routeName = args.routeName
    // 根据 routeName 获取对应的 category
    const category = await this.prisma.category.findUnique({
      where: {
        routeName: routeName,
      },
    })

    if (!category) {
      throw new BadRequestException('栏目前端路由错误')
    }

    const articles = await this.prisma.article.findMany({
      where: {
        categoryId: category.id,
      },
      orderBy: {
        // 按创建时间倒序输出
        createdAt: 'desc',
      },
      // 跳过多少条文章
      skip: (page - 1) * row,
      // 取多少条文章
      take: row,
      include: {
        category: true,
      },
    })

    // 将返回的内容裁剪成100个字符
    articles.forEach((item) => {
      item.content = item.content.slice(0, 75) + '...'
    })

    const total = await this.prisma.article.count({
      where: {
        categoryId: category.id,
      },
    })

    return {
      // 用于前端展示
      meta: {
        // 当前页码
        current_page: page,
        // 一页多少条文章
        // page_row: row,
        // 文章总数
        total,
        // 总页数
        total_page: Math.ceil(total / row),
      },
      data: articles,
    }
  }
  // 获取一篇文章
  async findOne(routeName: string, clientIp: string) {
    const article = await this.prisma.article.findUnique({
      where: {
        routeName,
      },
      include: {
        category: true,
      },
    })

    if (!article) {
      throw new BadRequestException('请求文章路由名称错误')
    }
    // 文章访问量喜加一逻辑
    this.viewAddOne(article.id, clientIp, article.viewCount)
    return article
  }
  // 更新文章
  async update(routeName: string, updateArticleDto: UpdateArticleDto) {
    return await this.prisma.article.update({
      where: {
        routeName,
      },
      data: {
        title: updateArticleDto.title,
        content: updateArticleDto.content,
        categoryId: +updateArticleDto.categoryId,
        routeName: updateArticleDto.routeName,
      },
    })
  }
  // 删除文章
  async remove(routeName: string) {
    console.log(routeName)

    return await this.prisma.article.delete({
      where: {
        routeName: routeName,
      },
    })
  }
  // 访问量增加逻辑，使得同一 ip 对一篇文章 15 分钟内只能加一次访问量
  private async viewAddOne(id: number, clientIp: string, viewCount: number) {
    // 如果没记录，则添加记录，并且 15分钟后自动移除记录
    if (!this.record.has(clientIp + '+' + id)) {
      this.record.add(clientIp + '+' + id)
      setTimeout(() => {
        this.record.delete(clientIp + '+' + id)
      }, 900000)

      // 文章访问量喜加一
      await this.prisma.article.update({
        where: {
          id,
        },
        data: {
          viewCount: viewCount + 1,
        },
      })
    }
  }
}

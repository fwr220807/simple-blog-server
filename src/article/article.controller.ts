import { Auth } from '@/auth/decorators/auth.decorator'
import { Role } from '@/auth/enum'
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { IpAddress } from './decorators/ipAddress.decorator'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import { Article } from './entities/article.entity'
import { ArticlesList } from './entities/articleList.entity'

@Controller('article')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  // 后台管理系统用接口 api
  @Post('all')
  @Auth(Role.ADMIN)
  // 返回所有文章
  // 传递 query 参数
  async findAllArticles(@Query() orderBy = {}) {
    const articlesList = await this.articleService.findAllArticles(orderBy)
    return new ArticlesList(articlesList)
  }

  @Get()
  // 返回当前页数的文章
  // 传递 query 参数
  async findArticles(@Query() args = {}) {
    const articlesList = await this.articleService.findArticles(args)
    return new ArticlesList(articlesList)
  }



  @Get('category')
  // 传递 query 参数
  async findAllCategory(@Query() args = {}) {
    const articlesList = await this.articleService.findAllCategory(args)
    return new ArticlesList(articlesList)
  }

  @Get(':routeName')
  async findOne(@Param('routeName') routeName: string, @IpAddress() clientIp: string) {
    const article = await this.articleService.findOne(routeName, clientIp)
    return new Article(article)
  }

  // 后台管理系统用接口 api
  @Patch(':routeName')
  @Auth(Role.ADMIN)
  update(@Param('routeName') routeName: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(routeName, updateArticleDto)
  }

  // 后台管理系统用接口 api
  @Delete(':routeName')
  @Auth(Role.ADMIN)
  remove(@Param('routeName') routeName: string) {
    return this.articleService.remove(routeName)
  }
}

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
import { ArticleList } from './entities/articleList.entity'

@Controller('article')
@UseInterceptors(ClassSerializerInterceptor)
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  @Get()
  // 传递 query 参数
  async findAll(@Query() args = {}) {
    const articleList = await this.articleService.findAll(args)
    return new ArticleList(articleList)
  }
  // 获取
  @Get('category')
  // 传递 query 参数
  async findAllCategory(@Query() args = {}) {
    const articleList = await this.articleService.findAllCategory(args)
    return new ArticleList(articleList)
  }

  @Get(':routeName')
  async findOne(@Param('routeName') routeName: string, @IpAddress() clientIp: string) {
    const article = await this.articleService.findOne(routeName, clientIp)
    return new Article(article)
  }

  @Patch(':routeName')
  @Auth(Role.ADMIN)
  update(@Param('routeName') routeName: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(routeName, updateArticleDto)
  }

  @Delete(':routeName')
  @Auth(Role.ADMIN)
  remove(@Param(':routeName') routeName: string) {
    return this.articleService.remove(routeName)
  }
}

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { ArticleList } from './entities/articleList.entity';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    create(createArticleDto: CreateArticleDto): Promise<import(".prisma/client").article>;
    findAll(args?: {}): Promise<ArticleList>;
    findAllCategory(args?: {}): Promise<ArticleList>;
    findOne(routeName: string, clientIp: string): Promise<Article>;
    update(routeName: string, updateArticleDto: UpdateArticleDto): Promise<import(".prisma/client").article>;
    remove(routeName: string): Promise<import(".prisma/client").article>;
}

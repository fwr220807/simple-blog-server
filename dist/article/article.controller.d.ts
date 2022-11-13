import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticleController {
    private readonly articleService;
    constructor(articleService: ArticleService);
    create(createArticleDto: CreateArticleDto): Promise<import(".prisma/client").article>;
    findAll(args?: {}): Promise<{
        meta: {
            current_page: number;
            total: number;
            total_page: number;
        };
        data: (import(".prisma/client").article & {
            category: import(".prisma/client").category;
        })[];
    }>;
    findAllCategory(args?: {}): Promise<{
        meta: {
            current_page: number;
            total: number;
            total_page: number;
        };
        data: (import(".prisma/client").article & {
            category: import(".prisma/client").category;
        })[];
    }>;
    findOne(id: string): Promise<import(".prisma/client").article & {
        category: import(".prisma/client").category;
    }>;
    update(id: string, updateArticleDto: UpdateArticleDto): Promise<import(".prisma/client").article>;
    remove(id: string): Promise<import(".prisma/client").article>;
}

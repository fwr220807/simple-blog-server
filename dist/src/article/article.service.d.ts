import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticleService {
    private prisma;
    private config;
    private record;
    constructor(prisma: PrismaService, config: ConfigService);
    create(createArticleDto: CreateArticleDto): Promise<import(".prisma/client").article>;
    findAll(args: Record<string, any>): Promise<{
        meta: {
            current_page: number;
            total: number;
            total_page: number;
        };
        data: (import(".prisma/client").article & {
            category: import(".prisma/client").category;
        })[];
    }>;
    findAllCategory(args: Record<string, any>): Promise<{
        meta: {
            current_page: number;
            total: number;
            total_page: number;
        };
        data: (import(".prisma/client").article & {
            category: import(".prisma/client").category;
        })[];
    }>;
    findOne(routeName: string, clientIp: string): Promise<import(".prisma/client").article & {
        category: import(".prisma/client").category;
    }>;
    update(routeName: string, updateArticleDto: UpdateArticleDto): Promise<import(".prisma/client").article>;
    remove(routeName: string): Promise<import(".prisma/client").article>;
    private viewAddOne;
}

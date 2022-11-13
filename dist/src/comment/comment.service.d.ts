import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateVisitorCommentDto } from './dto/create-visitor-comment.dto';
export declare class CommentService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    create(routeName: string, createVisitorCommentDto: CreateVisitorCommentDto): Promise<import(".prisma/client").comment>;
    findOne(routeName: string, args: Record<string, any>): Promise<{
        meta: {
            current_page: number;
            page_row: number;
            total: number;
            total_page: number;
        };
        data: {
            createdAt: Date;
            content: string;
            id: number;
            user: {
                name: string;
                avatar: string;
                website: string;
            };
            visitor: {
                name: string;
                avatar: string;
                website: string;
            };
            parentId: number;
            level: string;
        }[];
        commentRootId: number;
    }>;
}

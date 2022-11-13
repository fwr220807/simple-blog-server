import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { comment } from '@prisma/client';
import { CreateVisitorCommentDto } from './dto/create-visitor-comment.dto';
export declare class CommentService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    create(articleId: number, createVisitorCommentDto: CreateVisitorCommentDto): Promise<comment>;
    findOne(id: number, args: Record<string, any>): Promise<{
        meta: {
            current_page: number;
            page_row: number;
            total: number;
            total_page: number;
        };
        data: any[];
    }>;
    private transform;
}

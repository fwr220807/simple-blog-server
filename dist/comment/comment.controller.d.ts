import { CommentService } from './comment.service';
import { CreateVisitorCommentDto } from './dto/create-visitor-comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(id: string, createVisitorCommentDto: CreateVisitorCommentDto): Promise<import(".prisma/client").comment>;
    findOne(id: string, args: Record<string, any>): Promise<{
        meta: {
            current_page: number;
            page_row: number;
            total: number;
            total_page: number;
        };
        data: any[];
    }>;
}

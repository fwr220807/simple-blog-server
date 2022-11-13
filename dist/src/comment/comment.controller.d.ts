import { CommentService } from './comment.service';
import { CreateVisitorCommentDto } from './dto/create-visitor-comment.dto';
import { CommentList } from './entities/commentList.entity';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    create(routeName: string, createVisitorCommentDto: CreateVisitorCommentDto): Promise<import(".prisma/client").comment>;
    findOne(routeName: string, args: Record<string, any>): Promise<CommentList>;
}

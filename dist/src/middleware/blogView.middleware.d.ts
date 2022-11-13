import { PrismaService } from '@/prisma/prisma.service';
import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class BlogViewMiddleware implements NestMiddleware {
    private prisma;
    private record;
    constructor(prisma: PrismaService);
    use(request: Request, response: Response, next: NextFunction): Promise<void>;
    private viewAddOne;
}

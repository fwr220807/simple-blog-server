import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogService {
    constructor(private prisma: PrismaService) { }

    async getBlogInfo() {
        const blog = await this.prisma.blog.findUnique({
            where: {
                id: 1
            }
        })
        return blog
    }
}

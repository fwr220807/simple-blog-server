import { Auth } from '@/auth/decorators/auth.decorator';
import { Role } from '@/auth/enum';
import { Controller, Post } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private blogService: BlogService) { }

    @Post('getBlogInfo')
    @Auth(Role.ADMIN)
    getInfo() {
        return this.blogService.getBlogInfo()
    }
}

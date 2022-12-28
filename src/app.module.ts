import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { ArticleModule } from './article/article.module'
import { CategoryModule } from './category/category.module'
import { UploadModule } from './upload/upload.module'
import { CommentModule } from './comment/comment.module'
import { BlogViewMiddleware } from './middleware/blogView.middleware'
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [AuthModule, PrismaModule, ArticleModule, CategoryModule, UploadModule, CommentModule, UserModule, BlogModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(BlogViewMiddleware).forRoutes('*')
  }
}

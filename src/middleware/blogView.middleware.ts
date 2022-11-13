// 利用中间件实现记录博客的访问量，逻辑为同一 ip 下每 15 分钟只能增加一次

import { PrismaService } from '@/prisma/prisma.service'
import { Injectable, NestMiddleware } from '@nestjs/common'

import { Request, Response, NextFunction } from 'express'

@Injectable()
export class BlogViewMiddleware implements NestMiddleware {
  private record = new Set()

  constructor(private prisma: PrismaService) {}

  async use(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { ip } = request

    const blog = await this.prisma.blog.findUnique({
      where: {
        id: 1,
      },
    })
    this.viewAddOne(ip, blog.viewCount)

    next()
  }

  private async viewAddOne(clientIp: string, viewCount: number) {
    // 如果没记录，则添加记录，并且 15分钟后自动移除记录
    if (!this.record.has(clientIp)) {
      this.record.add(clientIp)
      setTimeout(() => {
        this.record.delete(clientIp)
      }, 900000)

      // 文章访问量喜加一
      await this.prisma.blog.update({
        where: {
          id: 1,
        },
        data: {
          viewCount: viewCount + 1,
        },
      })
    }
  }
}

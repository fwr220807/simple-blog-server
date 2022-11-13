import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import Validate from './common/validate'
import { TransformInterceptor } from './interceptor/transform.interceptor'
import { logger } from './middleware/logger.middleware'
import * as express from 'express'
import { HttpExceptionFilter } from './filter/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new Validate())
  // 使用全局拦截器打印出参
  app.useGlobalInterceptors(new TransformInterceptor())
  // 以 api 接口为前缀
  app.setGlobalPrefix('api')
  // 设置静态目录
  app.useStaticAssets('uploads', { prefix: '/uploads' })
  // 全局设置序列化拦截器
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // 使用中间件拦截所有的请求打印日志记录,express.json() 和 express.urlencoded({ extended: true }) 是的可以记录 body 的参数
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(logger)
  // 过滤处理http异常
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}
bootstrap()

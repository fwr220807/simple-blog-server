// 定义拦截器,用于 data 包裹数据返回给前端，应用在 main.ts 里 use 即可
import { Logger } from '@/utils/log4js'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.getArgByIndex(1).req
    // request 为前端发送过来的数据
    // const request = context.switchToHttp().getRequest() as Request

    return next.handle().pipe(
      // 用 data 为包裹返回的数据
      map((data) => {
        const logFormat = ` <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        User: ${JSON.stringify(req.user)}
        Response data:\n ${JSON.stringify(req.data)}
        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`
        Logger.info(logFormat)
        Logger.access(logFormat)
        // 如果数据包含 meta 元信息，就不用包含直接返回（自己需要注意有meta元信息是要用 data 包裹），否则需要 data 包裹再返回。
        return data?.meta ? data : { data }
      }),
    )
  }
}

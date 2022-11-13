// 身份校验,需要注册到模块的 provides 里
import { PrismaService } from '@/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    super({
      //解析用户提交的header中的Bearer Token数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //加密码的 secret
      secretOrKey: configService.get('TOKEN_SECRET'),
    })
  }

  //验证通过后提供用户资料,其他方法（前提是方法提供 context 上下文参数）可通过 context.switchToHttp().getRequest().user 获取
  async validate({ sub: id }) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }
}

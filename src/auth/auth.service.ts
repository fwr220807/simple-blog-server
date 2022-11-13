import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'
import { Role } from './enum'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(role: Role, registerDto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        name: registerDto.name,
        // 利用 argon2 包生成密钥，不直接存储密码
        password: await hash(registerDto.password),
        role: role,
        // * 需自动生成头像路径
        avatar: 'http://localhost:3000/uploads/1663473559783-5332236027.png',
      },
    })

    return this.token(user)
  }

  // 利用 name 和 id 值生成 token，验证身份
  private async token({ id, email }) {
    return {
      token: await this.jwt.signAsync({
        email,
        sub: id,
      }),
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    })

    // 利用 argon2 包校验密钥和用户发送的密码是否一致
    if (!(await verify(user.password, loginDto.password))) {
      throw new BadRequestException('密码输入错误')
    }
    return this.token(user)
  }
}

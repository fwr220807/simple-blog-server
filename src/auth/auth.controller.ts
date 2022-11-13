import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Auth } from './decorators/auth.decorator'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'
import { Role } from './enum'

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // 正常注册，只能注册 user 角色
  @Post('register')
  @Auth(Role.ADMIN)
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(Role.USER, registerDto)
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }
}

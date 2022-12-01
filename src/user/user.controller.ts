import { Auth } from '@/auth/decorators/auth.decorator';
import { Controller, Post, Req } from '@nestjs/common';
import { User } from './decorator/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('getUserInfo')
    @Auth()
    getInfo(@User() user: any) {
        return this.userService.getUserInfo(user)
    }
}

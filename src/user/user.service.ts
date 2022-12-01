import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUserInfo(user: any) {
        console.log(user);

        return user
    }
}

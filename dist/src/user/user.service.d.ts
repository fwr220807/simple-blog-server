import { PrismaService } from '@/prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserInfo(user: any): Promise<any>;
}

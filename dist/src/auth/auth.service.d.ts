import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { Role } from './enum';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(role: Role, registerDto: RegisterDto): Promise<{
        token: string;
    }>;
    private token;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
}

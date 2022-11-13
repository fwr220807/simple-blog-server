import { PrismaService } from '@/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<import(".prisma/client").category>;
    findAll(): Promise<import(".prisma/client").category[]>;
    findOne(routeName: string): Promise<import(".prisma/client").category>;
    update(routeName: string, updateCategoryDto: UpdateCategoryDto): Promise<import(".prisma/client").category>;
    remove(routeName: string): Promise<import(".prisma/client").category>;
}

import { PrismaService } from '@/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCategoryDto: CreateCategoryDto): Promise<import(".prisma/client").category>;
    findAll(): Promise<import(".prisma/client").category[]>;
    findOne(id: number): Promise<import(".prisma/client").category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<import(".prisma/client").category>;
    remove(id: number): Promise<import(".prisma/client").category>;
}

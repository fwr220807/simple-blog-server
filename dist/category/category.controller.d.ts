import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<import(".prisma/client").category>;
    findAll(): Promise<import(".prisma/client").category[]>;
    findOne(id: string): Promise<import(".prisma/client").category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import(".prisma/client").category>;
    remove(id: string): Promise<import(".prisma/client").category>;
}

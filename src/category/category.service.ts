import { PrismaService } from '@/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  // 注入 prisma
  constructor(private prisma: PrismaService) {}

  // 创建栏目
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    })
  }

  // 获取所有栏目
  async findAll() {
    return await this.prisma.category.findMany()
  }

  // 获取某个栏目
  async findOne(routeName: string) {
    return await this.prisma.category.findUnique({ where: { routeName } })
  }

  // 更新栏目
  async update(routeName: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { routeName },
      data: updateCategoryDto,
    })
  }

  // 删除栏目
  async remove(routeName: string) {
    return await this.prisma.category.delete({ where: { routeName } })
  }
}

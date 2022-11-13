import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Auth } from '@/auth/decorators/auth.decorator'
import { Role } from '@/auth/enum'

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  // 守卫,利用 jwt 策略验证 token，策略文件夹在 auth/strategy 下
  @Auth(Role.ADMIN)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto)
  }

  @Get()
  findAll() {
    return this.categoryService.findAll()
  }

  @Get(':routeName')
  findOne(@Param('routeName') routeName: string) {
    return this.categoryService.findOne(routeName)
  }

  @Patch(':routeName')
  @Auth(Role.ADMIN)
  update(@Param('routeName') routeName: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(routeName, updateCategoryDto)
  }

  @Delete(':routeName')
  @Auth(Role.ADMIN)
  remove(@Param('routeName') routeName: string) {
    return this.categoryService.remove(routeName)
  }
}

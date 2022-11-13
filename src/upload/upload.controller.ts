import { Auth } from '@/auth/decorators/auth.decorator'
import { Role } from '@/auth/enum'
import { Controller, Post, UploadedFile } from '@nestjs/common'
import { UploadFile } from './decorators/upload.decorator'

@Controller('upload')
export class UploadController {
  @Post('image')
  // @UploadFile 上传文件的自定义装饰器
  @UploadFile('file', ['image'])
  // @UploadedFile 获取上传文件的系统装饰器
  @Auth(Role.ADMIN)
  image(@UploadedFile() file: Express.Multer.File) {
    return file
  }
}

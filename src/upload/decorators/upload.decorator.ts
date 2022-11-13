import { applyDecorators, MethodNotAllowedException, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

export function Upload(field = 'file', options?: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(field, options)))
}

export function fileFilter(type: string[]) {
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    const check = type.some((item) => file.mimetype.includes(item))
    if (!check) {
      callback(new MethodNotAllowedException('文件类型错误'), false)
    } else {
      callback(null, true)
    }
  }
}

export function UploadFile(field = 'file', type: string[]) {
  return Upload(field, {
    limits: { fieldSize: Math.pow(1024, 2) * 3 },
    fileFilter: fileFilter(type),
  })
}

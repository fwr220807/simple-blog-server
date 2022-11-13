import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export declare function Upload(field?: string, options?: MulterOptions): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function fileFilter(type: string[]): (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => void;
export declare function UploadFile(field: string, type: string[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;

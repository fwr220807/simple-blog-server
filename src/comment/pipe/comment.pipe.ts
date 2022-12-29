/*
* @Description: 将前端传入的参数转化成 Comment 枚举类型的数据
* @Author: Wren Fan
* @Date: 2022-12-29 22:58:09
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-29 22:58:09
**/
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Comment } from '../constant/enum';

@Injectable()
export class CommentPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Comment {
    // Object.values(Comment) 为 Comment 字符串枚举常量的值数组
    if (Object.values(Comment).includes(value)) {
      return value
    } else {
      // 参数传入错误，抛出错误
      throw new BadRequestException(' Params 参数 commentType 错误')
    }
  }
}

import { article } from '@prisma/client'
import { Exclude, Expose, Transform } from 'class-transformer'
import * as dayjs from 'dayjs'

export class Article {
  @Transform(({ value }) => dayjs(value).format('YYYY.MM.DD'))
  createdAt: string
  @Transform(({ value }) => dayjs(value).format('YYYY.MM.DD'))
  updatedAt: string
  constructor(options: Partial<article>) {
    Object.assign(this, options)
  }
}

import { Transform } from 'class-transformer'
import * as dayjs from 'dayjs'

export class ArticlesList {
  meta: Object
  @Transform(({ value }) =>
    value.map((article) => {
      article.createdAt = dayjs(article.createdAt).format('YYYY.MM.DD')
      article.updatedAt = dayjs(article.updatedAt).format('YYYY.MM.DD')
      return article
    }),
  )
  data: Object

  constructor(options: Partial<ArticlesList>) {
    Object.assign(this, options)
  }
}

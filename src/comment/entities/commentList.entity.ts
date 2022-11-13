// 序列化和把 data 变成层级关系
import { Transform } from 'class-transformer'
import * as dayjs from 'dayjs'

export class CommentList {
  @Transform(({ value: comments }) => {
    const data = []
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i]
      // 先处理日期和 people，再层级化
      comment.createdAt = dayjs(comment.createdAt).format('YY 年 MM 月 DD 日')
      comment.people = comment.user || comment.visitor
      delete comment.user
      delete comment.visitor
      // level 代表的是主评论以及它相关的子评论，但是遍历的第一个评论一定是主评论
      comment.level = comment.level.slice(2)
      let level = comment.level.split('.')[0]

      if (!data[level - 1]) {
        // 初始化子层级评论为空数组
        comment['secondaryComment'] = []
        data[level - 1] = comment
      } else {
        data[level - 1]['secondaryComment'].push(comment)
      }
    }

    return data.filter((item) => Boolean(item)).reverse()
  })
  data: Object

  constructor(options: Partial<CommentList>) {
    Object.assign(this, options)
  }
}

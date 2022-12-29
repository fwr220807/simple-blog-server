/*
* @Description: 用于后台管理网站的序列化，处理日期、和生成 people 属性，倒序输出
* @Author: Wren Fan
* @Date: 2022-12-29 16:29:32
* @LastEditors: Wren Fan
* @LastEditTime: 2022-12-29 16:29:32
**/
import { Transform } from 'class-transformer'
import * as dayjs from 'dayjs'

export class AdminCommentsList {
    @Transform(({ value: comments }) => {
        const data = []
        for (let i = 0; i < comments.length; i++) {
            const comment = comments[i]
            // 处理日期和 people，再层级化
            comment.createdAt = dayjs(comment.createdAt).format('YY.MM.DD')
            comment.people = comment.user || comment.visitor
            delete comment.user
            delete comment.visitor
            // 如果存在父级评论信息，则将该信息的时间处理和 people
            if (comment.parentComment) {
                comment.parentComment.createdAt = dayjs(comment.parentComment.createdAt).format('YY.MM.DD')
                comment.parentComment.people = comment.parentComment.user || comment.parentComment.visitor
                delete comment.parentComment.user
                delete comment.parentComment.visitor
            }

            data.push(comment)
        }
        // 倒序输出
        return data.filter((item) => Boolean(item)).reverse()
    })
    data: Object

    constructor(options: Partial<AdminCommentsList>) {
        Object.assign(this, options)
    }
}

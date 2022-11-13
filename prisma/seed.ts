import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { Random } from 'mockjs'
import { random } from 'lodash'
import { readFileSync } from 'fs'

const prisma = new PrismaClient()

async function run() {
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      name: 'admin',
      password: await hash('admin888'),
      role: 'admin',
      avatar: `http://localhost:3000/uploads/1663473559783-5332236027.png`,
    },
  })

  await prisma.blog.create({
    data: {
      viewCount: 0,
    },
  })

  const category = [
    ['随笔与杂谈', 'essay'],
    ['做个技术宅', 'tech'],
    ['进击的码农', 'coding'],
    ['设计新视界', 'design'],
    ['有趣的分享', 'share'],
  ]

  for (let i = 0; i < 5; i++) {
    await prisma.category.create({
      data: {
        title: category[i][0],
        routeName: category[i][1],
        describe: Random.title(5, 10),
      },
    })
  }

  for (let i = 0; i < 30; i++) {
    await prisma.article.create({
      data: {
        title: Random.ctitle(10, 20),
        content: Random.cparagraph(30, 50),
        categoryId: random(1, 5),
        routeName: Random.title(1, 1),
        viewCount: 0,
        commentCount: 0,
      },
    })

    await prisma.comment.create({
      data: {
        content: '',
        audit: true,
        articleId: i + 1,
        userId: 1,
        parentId: 0,
        level: '0',
        show: false,
      },
    })
  }

  // 创建一个 markdown 文章
  await prisma.article.create({
    data: {
      title: 'Vue3 深色主题的切换实现思路',
      content: readFileSync(__dirname + '/深色主题的切换实现思路.md').toString(),
      categoryId: random(1, 5),
      routeName: Random.title(1, 1),
      viewCount: 0,
      commentCount: 0,
    },
  })
  await prisma.comment.create({
    data: {
      content: '',
      audit: true,
      articleId: 31,
      userId: 1,
      parentId: 0,
      level: '0',
      show: false,
    },
  })
}

run()

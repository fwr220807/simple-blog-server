# simple-blog-server
基于 Nestjs 构建的 simple-blog 博客网站服务器，实现用户的注册登陆，栏目、文章、评论的增删改查，敏感操作的用户校验，日志记录等功能，数据库使用 mysql，搭配 simple-blog 的[前端系统](https://github.com/fwr220807/simple-blog-frontend)一起使用。

## 技术栈

Nodejs + Nestjs + mysql + prisma

## 特性

1. 用户的注册与登陆；
2. 栏目、文章、评论的增删改查；
3. 敏感操作的用户校验；
4. 日志记录。

## 准备

1. nodejs 环境，指路；
2. 安装 mysql，指路；

## 构建

下载项目到本地，并安装依赖；

```bash
git clone https://github.com/fwr220807/simple-blog-server
npm install
```

修改项目目录下的 .env.example 文件，并重命名为 .env；

```js
# 连接数据库信息，需修改对应的信息，如 username、password
DATABASE_URL="mysql://username:password@localhost:3306/nest-blog"

# TOKEN 密钥，需填写，随意填即可
TOKEN_SECRET=""

# 每页文章数量
ARTICLE_PAGE_ROW="10"

# 每篇文章的主评论数
COMMENT_LIMIT="4"
```

初始化 prisma，并 seed 数据；

```bash
npx prisma migrate dev
npx prisma migrate reset // 此命令会删除指定数据库之前的所有数据，并重新 seed 数据
```

初始化服务器；

```bash
npm run dev
```

## 证书

[MIT](https://github.com/fwr220807/simple-blog-server/blob/main/LICENSE)

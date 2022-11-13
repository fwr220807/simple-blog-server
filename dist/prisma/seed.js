"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const mockjs_1 = require("mockjs");
const lodash_1 = require("lodash");
const prisma = new client_1.PrismaClient();
async function run() {
    await prisma.user.create({
        data: {
            email: 'admin@admin.com',
            name: 'admin',
            password: await (0, argon2_1.hash)('admin888'),
            role: 'admin',
            avatar: `http://localhost:3000/uploads/1663473559783-5332236027.png`,
        },
    });
    await prisma.blog.create({
        data: {
            viewCount: 0,
        },
    });
    const category = [
        ['随笔与杂谈', 'essay'],
        ['做个技术宅', 'tech'],
        ['进击的码农', 'coding'],
        ['设计新视界', 'design'],
        ['有趣的分享', 'share'],
    ];
    for (let i = 0; i < 5; i++) {
        await prisma.category.create({
            data: {
                title: category[i][0],
                routeName: category[i][1],
                describe: mockjs_1.Random.title(5, 10),
            },
        });
    }
    for (let i = 0; i < 30; i++) {
        await prisma.article.create({
            data: {
                title: mockjs_1.Random.ctitle(10, 20),
                content: mockjs_1.Random.cparagraph(30, 50),
                categoryId: (0, lodash_1.random)(1, 5),
                routeName: mockjs_1.Random.title(1, 1),
                viewCount: 0,
                commentCount: 0,
            },
        });
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
        });
    }
}
run();
//# sourceMappingURL=seed.js.map
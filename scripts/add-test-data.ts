/**
 * 添加测试数据到 Notion 数据库
 */

import { config } from "dotenv";
import { Client } from "@notionhq/client";

// 加载 .env.local 文件
config({ path: ".env.local" });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function addTestData() {
  console.log("🚀 开始添加测试数据...\n");

  const timelineId = process.env.NOTION_TIMELINE_DB;
  const fragmentsId = process.env.NOTION_FRAGMENTS_DB;
  const notesId = process.env.NOTION_NOTES_DB;
  const demosId = process.env.NOTION_DEMOS_DB;

  if (!timelineId || !fragmentsId || !notesId || !demosId) {
    console.error("❌ 数据库 ID 未配置完整");
    process.exit(1);
  }

  try {
    // 1. 添加 Timeline 记录
    console.log("📅 添加 Timeline 记录...");
    await notion.pages.create({
      parent: { database_id: timelineId },
      properties: {
        Content: {
          title: [
            {
              text: {
                content: "开始使用 Notion API 构建个人博客 🎉",
              },
            },
          ],
        },
        Date: {
          date: {
            start: new Date().toISOString().split("T")[0],
          },
        },
        Type: {
          multi_select: [
            { name: "学习" },
            { name: "有趣" },
          ],
        },
        Tags: {
          multi_select: [
            { name: "技术" },
            { name: "成长" },
          ],
        },
        Mood: {
          select: {
            name: "开心",
          },
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "今天成功配置了 Notion Integration，创建了 4 个数据库，并通过 API 连接到了 Next.js 博客项目。一切都很顺利！",
                },
              },
            ],
          },
        },
      ],
    });
    console.log("✅ Timeline 添加成功\n");

    // 2. 添加 Fragment 记录
    console.log("✨ 添加 Fragment 记录...");
    await notion.pages.create({
      parent: { database_id: fragmentsId },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: "学习 Notion API",
              },
            },
          ],
        },
        Category: {
          multi_select: [{ name: "AI学习" }],
        },
        Date: {
          date: {
            start: new Date().toISOString().split("T")[0],
          },
        },
        Status: {
          select: {
            name: "进行中",
          },
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "探索 Notion API 的各种功能，包括数据库查询、页面创建、block 内容管理等。目标是熟练掌握 Notion 作为 CMS 的使用方法。",
                },
              },
            ],
          },
        },
      ],
    });
    console.log("✅ Fragment 添加成功\n");

    // 3. 添加 Note 记录
    console.log("📚 添加 Note 记录...");
    await notion.pages.create({
      parent: { database_id: notesId },
      properties: {
        Title: {
          title: [
            {
              text: {
                content: "Next.js 15 App Router 完全指南",
              },
            },
          ],
        },
        Tags: {
          multi_select: [
            { name: "Next.js" },
            { name: "React" },
          ],
        },
        Date: {
          date: {
            start: new Date().toISOString().split("T")[0],
          },
        },
        Difficulty: {
          select: {
            name: "入门",
          },
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "App Router 是 Next.js 13+ 推出的新路由方式，提供了更好的性能和开发体验。",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "heading_1",
          heading_1: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "主要特性",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "numbered_list_item",
          numbered_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Server Components 默认开启",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "numbered_list_item",
          numbered_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Streaming 支持",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "numbered_list_item",
          numbered_list_item: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Server Actions",
                },
              },
            ],
          },
        },
      ],
    });
    console.log("✅ Note 添加成功\n");

    // 4. 添加 Demo 记录
    console.log("🚀 添加 Demo 记录...");
    await notion.pages.create({
      parent: { database_id: demosId },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: "Annie's Block",
              },
            },
          ],
        },
        Description: {
          rich_text: [
            {
              type: "text",
              text: {
                content: "基于 Next.js 和 Notion API 构建的个人博客系统，支持时间线、碎片记录、技术笔记和作品展示。",
              },
            },
          ],
        },
        TechStack: {
          multi_select: [
            { name: "Next.js" },
            { name: "React" },
            { name: "TypeScript" },
            { name: "Notion API" },
          ],
        },
        DemoURL: {
          url: "https://github.com/AnnCoding/Annie-s-blog",
        },
        GitHubURL: {
          url: "https://github.com/AnnCoding/Annie-s-blog",
        },
        Featured: {
          checkbox: true,
        },
      },
    });
    console.log("✅ Demo 添加成功\n");

    console.log("=".repeat(50));
    console.log("🎉 所有测试数据添加完成！");
    console.log("=".repeat(50));
    console.log("\n🌐 刷新浏览器查看：http://localhost:3000\n");
  } catch (error) {
    console.error("❌ 添加数据失败:", error);
    process.exit(1);
  }
}

addTestData();

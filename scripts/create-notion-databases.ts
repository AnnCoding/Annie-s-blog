/**
 * Notion 数据库自动创建脚本
 *
 * 使用方法：
 * 1. 在 .env.local 中配置 NOTION_TOKEN
 * 2. 运行：npm run create-databases
 */

import { config } from "dotenv";
import { Client } from "@notionhq/client";

// 加载 .env.local 文件
config({ path: ".env.local" });

// 从环境变量读取 token
const token = process.env.NOTION_TOKEN;

if (!token) {
  console.error("❌ 错误: 请在 .env.local 中设置 NOTION_TOKEN");
  process.exit(1);
}

// 创建 Notion 客户端，指定 API 版本
const notion = new Client({
  auth: token,
  // 明确指定 Notion 版本
  // @ts-ignore - 添加版本参数
  notionVersion: "2022-06-28",
});

// 数据库配置
const DATABASES = {
  timeline: {
    name: "📅 Timeline - 生活时间线",
    description: "记录每日生活点滴",
    icon: "📅",
    properties: {
      Content: { type: "title" },
      Date: { type: "date" },
      Type: {
        type: "multi_select",
        options: ["健身", "学习", "看书", "思考", "有趣"],
      },
      Tags: {
        type: "multi_select",
        options: ["健康", "成长", "思考", "技术", "生活"],
      },
      Mood: {
        type: "select",
        options: ["开心", "平静", "疲惫", "兴奋", "感恩", "其他"],
      },
    },
  },

  fragments: {
    name: "✨ Fragments - 碎片化记录",
    description: "记录进行中的小项目、习惯打卡",
    icon: "✨",
    properties: {
      Title: { type: "title" },
      Category: {
        type: "multi_select",
        options: ["AI学习", "健身打卡", "羽毛球", "游泳", "理财炒股", "社会思考"],
      },
      Content: { type: "rich_text" },
      Date: { type: "date" },
      Status: {
        type: "select",
        options: ["进行中", "已完成", "归档"],
      },
    },
  },

  notes: {
    name: "📚 Notes - 技术笔记",
    description: "沉淀技术知识，形成个人知识体系",
    icon: "📚",
    properties: {
      Title: { type: "title" },
      Tags: {
        type: "multi_select",
        options: ["React", "Next.js", "TypeScript", "AI", "JavaScript", "CSS", "Node.js", "其他"],
      },
      Content: { type: "rich_text" },
      Date: { type: "date" },
      Difficulty: {
        type: "select",
        options: ["入门", "进阶", "高级"],
      },
      URL: { type: "url" },
    },
  },

  demos: {
    name: "🚀 Demos - 作品展示",
    description: "展示个人项目和 Demo",
    icon: "🚀",
    properties: {
      Name: { type: "title" },
      Description: { type: "rich_text" },
      TechStack: {
        type: "multi_select",
        options: ["React", "Next.js", "Vue", "TypeScript", "Node.js", "Python", "AI/ML", "其他"],
      },
      DemoURL: { type: "url" },
      GitHubURL: { type: "url" },
      Featured: { type: "checkbox" },
    },
  },
};

/**
 * 转换属性为 Notion API 格式
 */
function buildProperties(config: any): Record<string, any> {
  const properties: Record<string, any> = {};

  for (const [key, value] of Object.entries(config)) {
    const prop = value as any;

    switch (prop.type) {
      case "title":
        properties[key] = { title: {} };
        break;
      case "rich_text":
        properties[key] = { rich_text: {} };
        break;
      case "date":
        properties[key] = { date: {} };
        break;
      case "url":
        properties[key] = { url: {} };
        break;
      case "checkbox":
        properties[key] = { checkbox: {} };
        break;
      case "select":
        properties[key] = {
          select: {
            options: prop.options.map((name: string) => ({ name, color: "default" })),
          },
        };
        break;
      case "multi_select":
        properties[key] = {
          multi_select: {
            options: prop.options.map((name: string) => ({ name, color: "default" })),
          },
        };
        break;
    }
  }

  return properties;
}

/**
 * 创建一个数据库
 * 父页面 ID: 3324661856e58078a8c7ce15c51c15c7
 */
async function createDatabase(
  name: string,
  description: string,
  icon: string,
  properties: Record<string, any>
): Promise<string> {
  try {
    // 首先获取当前用户信息，验证 token
    const user = await notion.users.me({});
    console.log(`   ✅ Token 有效，用户: ${user.name || "Unknown"}`);

    // 使用用户提供的空白页面作为父页面
    const parentPageId = "3324661856e58078a8c7ce15c51c15c7";
    console.log(`   📍 父页面 ID: ${parentPageId}`);

    // 准备数据库创建请求
    const dbConfig: any = {
      parent: {
        type: "page_id",
        page_id: parentPageId,
      },
      title: [
        {
          type: "text",
          text: { content: name },
        },
      ],
      properties,
    };

    // 添加图标
    if (icon) {
      dbConfig.icon = {
        type: "emoji",
        emoji: icon,
      };
    }

    // 添加描述
    if (description) {
      dbConfig.description = [
        {
          type: "text",
          text: { content: description },
        },
      ];
    }

    // 创建数据库
    const response = await notion.databases.create(dbConfig);
    return response.id;
  } catch (error: any) {
    console.error(`   ❌ 错误详情: ${error.message || error.code}`);
    if (error.code === "unauthorized") {
      console.error(`   💡 提示: 请检查 Integration 是否已启用 "Insert content" 权限`);
    }
    throw error;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log("🚀 开始创建 Notion 数据库...\n");
  console.log(`🔑 使用 Token: ${token?.substring(0, 15)}...\n`);

  const results: Record<string, string> = {};

  for (const [key, config] of Object.entries(DATABASES)) {
    console.log(`📦 正在创建: ${config.name}`);

    try {
      const properties = buildProperties(config.properties);
      const databaseId = await createDatabase(
        config.name,
        config.description,
        config.icon,
        properties
      );

      results[key] = databaseId;
      console.log(`✅ 创建成功! Database ID: ${databaseId}\n`);
    } catch (error) {
      console.error(`❌ 创建失败\n`);
    }
  }

  // 输出结果
  const successCount = Object.keys(results).length;

  if (successCount > 0) {
    console.log("\n" + "=".repeat(50));
    console.log(`✨ 成功创建 ${successCount}/4 个数据库！`);
    console.log("=".repeat(50) + "\n");

    console.log("📝 请将以下内容复制到你的 .env.local 文件中：\n");
    console.log("```env");
    console.log(`NOTION_TIMELINE_DB=${results.timeline || ""}`);
    console.log(`NOTION_FRAGMENTS_DB=${results.fragments || ""}`);
    console.log(`NOTION_NOTES_DB=${results.notes || ""}`);
    console.log(`NOTION_DEMOS_DB=${results.demos || ""}`);
    console.log("```\n");

    console.log("⚠️ 重要提示：");
    console.log("1. 在 Notion 中找到新创建的数据库");
    console.log("2. 点击每个数据库右上角的 ···");
    console.log("3. 选择 'Add connections' 或 '添加连接'");
    console.log("4. 添加你的 Integration\n");
  } else {
    console.log("\n" + "=".repeat(50));
    console.log("❌ 所有数据库创建失败");
    console.log("=".repeat(50) + "\n");
    console.log("💡 可能的原因：");
    console.log("1. Integration 没有启用 'Insert content' 权限");
    console.log("2. 请访问 https://www.notion.so/my-integrations 检查配置");
    console.log("3. 或者选择手动创建数据库（推荐）\n");
  }
}

main().catch(console.error);

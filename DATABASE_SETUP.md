# 🗄️ Notion 数据库创建指南

本指南将帮助你一键创建博客所需的 4 个 Notion 数据库。

## 📋 准备工作

### 步骤 1：创建 Notion Integration

1. 访问 https://www.notion.so/my-integrations
2. 点击 **"New integration"** 或 **"新建集成"**
3. 填写信息：
   - **Name**: `Annie's Blog Blog`
   - **Associated workspace**: 选择你的工作区
   - **Type**: Internal（内部）
4. 点击 **Submit**（提交）
5. **复制 Internal Integration Token**（类似 `secret_xxx...`）

### 步骤 2：配置环境变量

创建 `.env.local` 文件：

```bash
cp .env.local.example .env.local
```

编辑 `.env.local`，填入你的 token：

```env
NOTION_TOKEN=secret_你复制的token
NOTION_TIMELINE_DB=
NOTION_FRAGMENTS_DB=
NOTION_NOTES_DB=
NOTION_DEMOS_DB=
```

> ⚠️ 注意：数据库 ID 留空，脚本会自动生成

---

## 🚀 一键创建数据库

运行创建脚本：

```bash
npm run create-databases
```

脚本会自动创建 4 个数据库：
- 📅 Timeline - 生活时间线
- ✨ Fragments - 碎片化记录
- 📚 Notes - 技术笔记
- 🚀 Demos - 作品展示

创建完成后，脚本会输出类似这样的内容：

```
🎉 所有数据库创建完成！

📝 请将以下内容复制到你的 .env.local 文件中：

NOTION_TIMELINE_DB=abcd1234567890
NOTION_FRAGMENTS_DB=efgh1234567890
NOTION_NOTES_DB=ijkl1234567890
NOTION_DEMOS_DB=mnop1234567890
```

**复制这些 ID 到你的 `.env.local` 文件中！**

---

## ⚠️ 重要：分享数据库给 Integration

每个数据库都需要单独授权：

1. 在 Notion 中找到新创建的数据库
2. 点击右上角 **`···`**
3. 选择 **"Add connections"** 或 **"添加连接"**
4. 选择你的 Integration：**"Annie's Blog Blog"**

**对 4 个数据库都重复以上步骤！**

---

## ✅ 验证配置

运行测试命令：

```bash
npm run dev
```

访问 http://localhost:3000，如果你能看到模拟数据显示，说明配置成功！

现在可以在 Notion 中添加一些测试数据，刷新页面就能看到真实内容了。

---

## 📊 数据库结构说明

### 1. Timeline（生活时间线）

| 字段 | 类型 | 说明 |
|------|------|------|
| Date | 日期 | 主排序字段 |
| Type | 多选 | 健身、学习、看书、思考、有趣 |
| Content | 标题 | 简短描述 |
| Details | 正文 | 详情内容（点击页面后在正文添加） |
| Tags | 多选 | 自定义标签 |
| Mood | 单选 | 开心、平静、疲惫、兴奋、感恩、其他 |

### 2. Fragments（碎片化记录）

| 字段 | 类型 | 说明 |
|------|------|------|
| Title | 标题 | 项目/计划名称 |
| Category | 多选 | AI学习、健身打卡、羽毛球、游泳、理财炒股、社会思考 |
| Content | 正文 | 详细记录 |
| Date | 日期 | 开始/更新日期 |
| Status | 单选 | 进行中、已完成、归档 |

### 3. Notes（技术笔记）

| 字段 | 类型 | 说明 |
|------|------|------|
| Title | 标题 | 笔记主题 |
| Tags | 多选 | React、Next.js、TypeScript、AI、JavaScript、CSS、Node.js、其他 |
| Content | 正文 | 笔记内容（支持 Markdown） |
| Date | 日期 | 学习日期 |
| Difficulty | 单选 | 入门、进阶、高级 |
| URL | URL | 外部链接（可选） |

### 4. Demos（作品展示）

| 字段 | 类型 | 说明 |
|------|------|------|
| Name | 标题 | 项目名称 |
| Description | 正文 | 项目介绍 |
| TechStack | 多选 | React、Next.js、Vue、TypeScript、Node.js、Python、AI/ML、其他 |
| DemoURL | URL | 在线演示链接 |
| GitHubURL | URL | 源码链接 |
| Thumbnail | 文件 | 封面图片 |
| Featured | 复选框 | 是否精选 |

---

## 🔧 手动创建数据库

如果脚本运行失败，你也可以手动创建：

### 在 Notion 中创建数据库

1. 在 Notion 中新建页面
2. 输入 `/database` 选择 **"Table - Inline"**
3. 按照上面的结构添加列
4. 设置多选/单选选项

### 获取数据库 ID

从数据库 URL 中复制 ID：

```
https://notion.so/abcd1234567890?v=xxx
              ↑ 这个就是 ID
```

---

## ❓ 常见问题

### Q: 脚本报错 "Unauthorized"
A: 检查 `.env.local` 中的 `NOTION_TOKEN` 是否正确

### Q: 数据库创建成功但无法读取
A: 确保已经把数据库分享给 Integration（步骤 3）

### Q: 想修改多选选项
A: 可以直接在 Notion 中修改，代码会自动读取新选项

### Q: 想添加新字段
A:
1. 先在 Notion 中添加字段
2. 然后在 `lib/types.ts` 中更新类型定义
3. 在 `lib/notion.ts` 中添加读取逻辑

---

## 🎉 下一步

数据库创建完成后：

1. ✅ 在 Notion 中添加一些测试数据
2. ✅ 运行 `npm run dev` 本地预览
3. ✅ 部署到 Vercel 上线

**Vercel 部署教程：** 访问 https://vercel.com/new

# Annie's Blog

一个多功能个人博客，整合生活记录、学习笔记和作品展示。采用 Next.js + Notion 架构，无需额外后台管理界面，直接在 Notion 中管理内容。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS 4
- **数据源**: Notion API
- **语言**: TypeScript
- **部署**: Vercel

## 设计风格

大海与樱花主题：
- 主色调：深海蓝 (#1e3a5f) + 樱花粉 (#f8b3c6)
- 辅助色：浅蓝 (#e8f4f8) + 浅粉 (#fff0f5)
- 强调色：珊瑚粉 (#ff7a93)

## 项目结构

```
annies-block/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── timeline/           # 生活时间线
│   ├── fragments/          # 碎片化记录
│   ├── notes/              # 技术笔记
│   ├── demos/              # Demo 展示
│   └── api/notion/         # Notion 数据 API
├── components/             # React 组件
├── lib/                    # 工具函数
├── styles/                 # 全局样式
└── public/                 # 静态资源
```

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd annies-block
npm install
```

### 2. 配置 Notion

#### 步骤 1：创建 Notion Integration

1. 访问 [Notion My Integrations](https://www.notion.so/my-integrations)
2. 点击 "New integration"
3. 填写名称（如 "Annie's Blog"）
4. 选择关联的 workspace
5. 复制生成的 "Internal Integration Token"

#### 步骤 2：创建数据库

在你的 Notion workspace 中创建 4 个数据库：

##### Database 1: 生活时间线 (Timeline)
| 属性名 | 类型 | 名称 |
|--------|------|------|
| Date | 日期 | 日期 |
| Type | 多选 | 类型 (健身/学习/看书/思考/有趣) |
| Content | 标题 | 内容 |
| Details | 正文 | 详细描述 |
| Tags | 多选 | 标签 |
| Mood | 多选 | 心情 (开心/平静/疲惫/兴奋/感恩/其他) |

##### Database 2: 碎片化记录 (Fragments)
| 属性名 | 类型 | 名称 |
|--------|------|------|
| Title | 标题 | 标题 |
| Category | 多选 | 分类 (AI学习/健身打卡/羽毛球/游泳/理财炒股/社会思考) |
| Content | 正文 | 内容 |
| Date | 日期 | 日期 |
| Status | 多选 | 状态 (进行中/已完成/归档) |

##### Database 3: 技术笔记 (TechNotes)
| 属性名 | 类型 | 名称 |
|--------|------|------|
| Title | 标题 | 标题 |
| Tags | 多选 | 标签 |
| Content | 正文 | 内容 |
| Date | 日期 | 日期 |
| Difficulty | 多选 | 难度 (入门/进阶/高级) |
| URL | URL | 外部链接（可选） |

##### Database 4: Demo 展示 (Demos)
| 属性名 | 类型 | 名称 |
|--------|------|------|
| Name | 标题 | 名称 |
| Description | 正文 | 描述 |
| TechStack | 多选 | 技术栈 |
| DemoURL | URL | Demo 链接 |
| GitHubURL | URL | GitHub 链接 |
| Thumbnail | 文件 | 缩略图 |
| Featured | 复选框 | 是否精选 |

#### 步骤 3：分享数据库给 Integration

1. 打开每个数据库
2. 点击右上角 "..." 菜单
3. 选择 "Add connections"
4. 选择你创建的 Integration

#### 步骤 4：获取数据库 ID

从数据库 URL 中获取 ID：
`https://notion.so/{database_id}?v=...`

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

填入你的 Notion Token 和数据库 ID：

```env
NOTION_TOKEN=secret_xxxxxxxxxxxxxx
NOTION_TIMELINE_DB=xxxxxxxxxxxxx
NOTION_FRAGMENTS_DB=xxxxxxxxxxxxx
NOTION_NOTES_DB=xxxxxxxxxxxxx
NOTION_DEMOS_DB=xxxxxxxxxxxxx
```

### 4. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署完成！

## 功能特性

- 📅 **生活时间线**：垂直时间轴展示生活点滴
- ✨ **碎片记录**：分类管理各类兴趣活动
- 📚 **技术笔记**：整理学习心得和技术总结
- 🚀 **Demo 展示**：作品集展示，支持外链跳转
- 🎨 **响应式设计**：完美适配移动端和桌面端
- 🔍 **筛选功能**：支持按类型、标签、难度筛选

## 开发

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## License

MIT

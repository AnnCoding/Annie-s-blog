# Notion 联动指南

## 快速开始

### 1. 创建 Integration（免费）
访问：https://www.notion.so/my-integrations

### 2. 创建数据库

在 Notion 中创建 4 个数据库，结构如下：

#### Timeline 数据库
| 列名 | 类型 | 选项 |
|------|------|------|
| Date | 日期 | - |
| Type | 多选 | 健身、学习、看书、思考、有趣 |
| Content | 标题 | - |
| Details | 无 | 点击页面后添加正文内容 |
| Tags | 多选 | 自定义标签 |
| Mood | 单选 | 开心、平静、疲惫、兴奋、感恩、其他 |

#### Fragments 数据库
| 列名 | 类型 | 选项 |
|------|------|------|
| Title | 标题 | - |
| Category | 多选 | AI学习、健身打卡、羽毛球、游泳、理财炒股、社会思考 |
| Content | 无 | 正文内容 |
| Date | 日期 | - |
| Status | 单选 | 进行中、已完成、归档 |

#### Notes 数据库
| 列名 | 类型 | 选项 |
|------|------|------|
| Title | 标题 | - |
| Tags | 多选 | React、Next.js、TypeScript、AI、JavaScript、CSS、Node.js、其他 |
| Content | 无 | 正文内容 |
| Date | 日期 | - |
| Difficulty | 单选 | 入门、进阶、高级 |
| URL | URL | 外部链接（可选） |

#### Demos 数据库
| 列名 | 类型 | 选项 |
|------|------|------|
| Name | 标题 | - |
| Description | 无 | 描述内容 |
| TechStack | 多选 | React、Next.js、Vue、TypeScript、Node.js、Python、AI/ML、其他 |
| DemoURL | URL | Demo链接 |
| GitHubURL | URL | GitHub链接 |
| Thumbnail | 文件 | 上传图片 |
| Featured | 复选框 | 是否精选 |

### 3. 获取数据库 ID

从数据库 URL 中复制 ID：
```
https://notion.so/abcd1234567890?v=xxx
              ↑ 这个就是 ID
```

### 4. 分享数据库给 Integration

每个数据库都要：
1. 点击右上角 `···`
2. 选择 `Add connections`
3. 选择你的 Integration

### 5. 配置环境变量

```bash
cp .env.local.example .env.local
# 编辑 .env.local 填入你的 token 和数据库 ID
```

## 测试

在 Notion 中添加一条记录，然后刷新浏览器查看你的网站！

## 费用说明

- ✅ Notion API：**完全免费**
- ✅ Notion 个人版：**免费**（足够使用）
- ✅ Vercel 部署：**免费**（个人项目）

# 🚀 Vercel 环境变量配置指南

## 问题说明

Vercel 部署后无法从 Notion 读取数据，是因为**环境变量没有在 Vercel 上配置**。

`.env.local` 文件只在本地开发时有效，部署到 Vercel 后需要在 Vercel 控制台单独配置。

---

## 🔧 配置步骤

### 方法 1：通过 Vercel 控制台配置（推荐）

1. **打开 Vercel 项目**
   - 访问 https://vercel.com/dashboard
   - 找到并点击 `Annie-s-blog` 项目

2. **进入环境变量设置**
   - 点击顶部 **Settings** 标签
   - 在左侧菜单点击 **Environment Variables**

3. **添加以下 5 个环境变量**

   点击 **"Add New"** 按钮，逐个添加：

   | Key | Value |
   |-----|-------|
   | `NOTION_TOKEN` | 你的 Notion Token (从 .env.local 复制) |
   | `NOTION_TIMELINE_DB` | 你的 Timeline 数据库 ID |
   | `NOTION_FRAGMENTS_DB` | 你的 Fragments 数据库 ID |
   | `NOTION_NOTES_DB` | 你的 Notes 数据库 ID |
   | `NOTION_DEMOS_DB` | 你的 Demos 数据库 ID |

4. **选择环境**
   - 每个变量添加时，确保选择了 **Production**、**Preview**、**Development** 三个环境
   - 或者选择 **All** 适用所有环境

5. **保存并重新部署**
   - 添加完所有变量后，点击 **Save**
   - 进入 **Deployments** 标签
   - 找到最新的部署记录，点击右上角 **···**
   - 选择 **Redeploy**（重新部署）

---

### 方法 2：通过 Vercel CLI 配置

如果你已安装 Vercel CLI：

```bash
# 1. 登录 Vercel
vercel login

# 2. 进入项目目录
cd /path/to/annies-block

# 3. 添加环境变量（从 .env.local 复制值）
vercel env add NOTION_TOKEN production
# 粘贴你的 token

vercel env add NOTION_TIMELINE_DB production
# 粘贴你的数据库 ID

# ... 其他变量同理

# 4. 重新部署
vercel --prod
```

---

## ✅ 验证配置

部署完成后：

1. 访问你的 Vercel 网站链接
2. 打开浏览器开发者工具（F12）
3. 查看 Console 是否有错误
4. 如果看到 "暂无数据" 提示，说明环境变量配置正确，只是 Notion 数据库是空的

---

## 🔍 检查当前环境变量

在 Vercel 控制台：

1. **Settings** → **Environment Variables**
2. 你应该能看到已添加的变量列表
3. 点击变量旁的 👁️ 图标可以查看值（已隐藏）

---

## 📝 从 .env.local 获取值

你的 `.env.local` 文件中有所有需要配置的值：

```env
NOTION_TOKEN=你的token
NOTION_TIMELINE_DB=你的数据库ID
NOTION_FRAGMENTS_DB=你的数据库ID
NOTION_NOTES_DB=你的数据库ID
NOTION_DEMOS_DB=你的数据库ID
```

**把这些值复制到 Vercel 的环境变量配置中！**

---

## 🆘 常见问题

### Q: 部署后还是看不到数据？
A:
1. 确认环境变量已添加到 **Production** 环境
2. 重新部署项目
3. 检查 Notion 数据库是否已授权给 Integration

### Q: 显示 "暂无数据"？
A: 说明环境变量配置正确，但 Notion 数据库是空的。在 Notion 中添加一些测试数据。

### Q: 显示 "Unauthorized" 或 API 错误？
A:
1. 检查 NOTION_TOKEN 是否正确
2. 确认 Integration 已授权访问数据库

---

配置完成后，你的网站就能正常从 Notion 读取数据了！🎉

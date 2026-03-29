#!/bin/bash

# Vercel 环境变量自动配置脚本
# 使用方法: bash scripts/setup-vercel-env.sh

set -e

echo "🚀 Vercel 环境变量配置脚本"
echo "================================"
echo ""

# 检查是否已安装 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI 未安装"
    echo "请先运行: npm install -g vercel"
    exit 1
fi

# 检查是否已登录
echo "📋 检查登录状态..."
if ! vercel whoami &> /dev/null; then
    echo "⚠️  需要先登录 Vercel"
    echo "正在打开登录页面..."
    vercel login
fi

echo "✅ 已登录"
echo ""

# 从 .env.local 读取环境变量
if [ ! -f .env.local ]; then
    echo "❌ 找不到 .env.local 文件"
    exit 1
fi

echo "📝 从 .env.local 读取环境变量..."
echo ""

# 读取环境变量并设置
while IFS='=' read -r key value; do
  # 跳过注释和空行
  [[ $key =~ ^#.*$ ]] && continue
  [[ -z $key ]] && continue

  # 只处理 NOTION_ 开头的变量
  if [[ $key == NOTION_* ]]; then
    echo "设置 $key..."

    # 为每个环境添加变量
    for environment in production preview development; do
        echo "$value" | vercel env add "$key" "$environment" &> /dev/null || true
    done

    echo "   ✅ $key 已设置"
  fi
done < .env.local

echo ""
echo "================================"
echo "✅ 环境变量配置完成！"
echo ""
echo "🔄 正在重新部署..."
vercel --prod --yes

echo ""
echo "🎉 完成！"
echo "🌐 你的网站将在几分钟内更新，请稍后刷新查看"

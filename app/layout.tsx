import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Annie's Block | 个人博客",
  description: "Annie 的个人博客 - 记录生活、学习与成长",
  keywords: ["博客", "个人网站", "学习笔记", "生活记录"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}

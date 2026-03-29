"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import { Fragment, FragmentCategory } from "@/lib/types";

const categoryIcons: Record<string, string> = {
  "AI学习": "🤖",
  "健身打卡": "💪",
  "羽毛球": "🏸",
  "游泳": "🏊",
  "理财炒股": "💰",
  "社会思考": "🤔",
  "牛马不敢停": "🐴",
  // 默认图标
  default: "📌",
};

export default function FragmentsPage() {
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [filteredFragments, setFilteredFragments] = useState<Fragment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [loading, setLoading] = useState(true);

  // 动态从数据中提取所有分类
  const categories = useMemo(() => {
    const allCategories = new Set<string>();
    fragments.forEach((f) => {
      f.category.forEach((cat) => allCategories.add(cat));
    });

    return Array.from(allCategories).map((cat) => ({
      value: cat,
      label: cat,
      icon: categoryIcons[cat] || categoryIcons.default,
    }));
  }, [fragments]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/notion/fragments?limit=100");
        const data = await response.json();
        if (data.success) {
          setFragments(data.data);
          setFilteredFragments(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch fragments:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "全部") {
      setFilteredFragments(fragments);
    } else {
      setFilteredFragments(
        fragments.filter((f) => f.category.includes(selectedCategory))
      );
    }
  }, [selectedCategory, fragments]);

  return (
    <>
      <Header />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-ocean-deep mb-4">
              ✨ 碎片化记录
            </h1>
            <p className="text-text-secondary">
              记录生活中的点点滴滴，见证成长轨迹
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
              onClick={() => setSelectedCategory("全部")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "全部"
                  ? "bg-ocean-deep text-white"
                  : "bg-white text-text-secondary hover:bg-ocean-light"
              }`}
            >
              📋 全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.value
                    ? "bg-ocean-deep text-white"
                    : "bg-white text-text-secondary hover:bg-ocean-light"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Fragments Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-deep"></div>
            </div>
          ) : filteredFragments.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary">
                {selectedCategory !== "全部"
                  ? `"${selectedCategory}" 分类下暂无内容`
                  : "暂无内容，快去 Notion 添加吧！"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFragments.map((fragment) => (
                <CategoryCard key={fragment.id} fragment={fragment} />
              ))}
            </div>
          )}

          {/* Empty State Hint */}
          {!loading && selectedCategory !== "全部" && filteredFragments.length === 0 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setSelectedCategory("全部")}
                className="text-sakura-coral hover:text-sakura-pink transition-colors"
              >
                ← 返回查看全部
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

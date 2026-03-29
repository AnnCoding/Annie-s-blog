"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import { Fragment, FragmentCategory } from "@/lib/types";

const categories: { value: FragmentCategory; label: string; icon: string }[] = [
  { value: "AI学习", label: "AI学习", icon: "🤖" },
  { value: "健身打卡", label: "健身打卡", icon: "💪" },
  { value: "羽毛球", label: "羽毛球", icon: "🏸" },
  { value: "游泳", label: "游泳", icon: "🏊" },
  { value: "理财炒股", label: "理财炒股", icon: "💰" },
  { value: "社会思考", label: "社会思考", icon: "🤔" },
];

export default function FragmentsPage() {
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [filteredFragments, setFilteredFragments] = useState<Fragment[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<FragmentCategory | "全部">("全部");
  const [loading, setLoading] = useState(true);

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
              学习、健身、理财... 收集生活中的每一个片段
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setSelectedCategory("全部")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === "全部"
                  ? "bg-ocean-deep text-white"
                  : "bg-white text-text-secondary hover:bg-ocean-light"
              }`}
            >
              全部
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
                <span className="mr-1">{cat.icon}</span>
                {cat.label}
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

          {/* Stats */}
          {!loading && fragments.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-text-secondary text-sm">
                共 <span className="font-semibold text-ocean-deep">{fragments.length}</span> 条碎片记录
                {selectedCategory !== "全部" && (
                  <>
                    ，当前显示 <span className="font-semibold text-ocean-deep">{filteredFragments.length}</span> 条
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

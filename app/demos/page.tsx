"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import DemoCard from "@/components/DemoCard";
import { Demo, DemoTech } from "@/lib/types";

const techStacks: DemoTech[] = ["React", "Next.js", "Vue", "TypeScript", "Node.js", "Python", "AI/ML", "其他"];

export default function DemosPage() {
  const [demos, setDemos] = useState<Demo[]>([]);
  const [filteredDemos, setFilteredDemos] = useState<Demo[]>([]);
  const [selectedTech, setSelectedTech] = useState<DemoTech | "全部">("全部");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/notion/demos?limit=100");
        const data = await response.json();
        if (data.success) {
          setDemos(data.data);
          setFilteredDemos(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch demos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = demos;

    if (selectedTech !== "全部") {
      filtered = filtered.filter((demo) => demo.techStack.includes(selectedTech));
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter((demo) => demo.featured);
    }

    setFilteredDemos(filtered);
  }, [selectedTech, showFeaturedOnly, demos]);

  return (
    <>
      <Header />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-ocean-deep mb-4">
              🚀 Demo 展示
            </h1>
            <p className="text-text-secondary">
              个人作品、实验项目、创意 Demo
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
            {/* Tech Stack Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-text-secondary mb-3">按技术栈筛选</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTech("全部")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTech === "全部"
                      ? "bg-ocean-deep text-white"
                      : "bg-ocean-light text-ocean-deep hover:bg-ocean-medium hover:text-white"
                  }`}
                >
                  全部
                </button>
                {techStacks.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTech === tech
                        ? "bg-ocean-deep text-white"
                        : "bg-ocean-light text-ocean-deep hover:bg-ocean-medium hover:text-white"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFeaturedOnly}
                  onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-sakura-coral focus:ring-sakura-coral"
                />
                <span className="text-sm font-medium text-text-secondary">只显示精选</span>
              </label>

              {/* Reset button */}
              {(selectedTech !== "全部" || showFeaturedOnly) && (
                <button
                  onClick={() => {
                    setSelectedTech("全部");
                    setShowFeaturedOnly(false);
                  }}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-sakura-pink text-white hover:bg-sakura-coral transition-all"
                >
                  重置筛选
                </button>
              )}
            </div>
          </div>

          {/* Demos Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-deep"></div>
            </div>
          ) : filteredDemos.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🚀</p>
              <p className="text-text-secondary">
                {selectedTech !== "全部" || showFeaturedOnly
                  ? "没有找到符合筛选条件的 Demo"
                  : "暂无内容，快去 Notion 添加你的第一个 Demo 吧！"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDemos.map((demo) => (
                <DemoCard key={demo.id} demo={demo} />
              ))}
            </div>
          )}

          {/* Stats */}
          {!loading && demos.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-text-secondary text-sm">
                共 <span className="font-semibold text-ocean-deep">{demos.length}</span> 个 Demo
                {(selectedTech !== "全部" || showFeaturedOnly) && (
                  <>
                    ，当前显示 <span className="font-semibold text-ocean-deep">{filteredDemos.length}</span> 个
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

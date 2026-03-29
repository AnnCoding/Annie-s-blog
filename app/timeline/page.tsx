"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import TimelineCard from "@/components/TimelineCard";
import { TimelineEntry, TimelineType } from "@/lib/types";

const typeOptions: { value: TimelineType; label: string; color: string }[] = [
  { value: "健身", label: "💪 健身", color: "bg-green-100 text-green-700" },
  { value: "学习", label: "📖 学习", color: "bg-blue-100 text-blue-700" },
  { value: "看书", label: "📚 看书", color: "bg-purple-100 text-purple-700" },
  { value: "思考", label: "💭 思考", color: "bg-amber-100 text-amber-700" },
  { value: "有趣", label: "✨ 有趣", color: "bg-pink-100 text-pink-700" },
];

export default function TimelinePage() {
  const [entries, setEntries] = useState<TimelineEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<TimelineEntry[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<TimelineType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/notion/timeline?limit=100");
        const data = await response.json();
        if (data.success) {
          setEntries(data.data);
          setFilteredEntries(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch timeline:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTypes.length === 0) {
      setFilteredEntries(entries);
    } else {
      setFilteredEntries(
        entries.filter((entry) =>
          entry.type.some((t) => selectedTypes.includes(t))
        )
      );
    }
  }, [selectedTypes, entries]);

  function toggleType(type: TimelineType) {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  }

  return (
    <>
      <Header />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-ocean-deep mb-4">
              📅 生活时间线
            </h1>
            <p className="text-text-secondary">
              记录生活点滴，见证成长轨迹
            </p>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {typeOptions.map((option) => {
              const isSelected = selectedTypes.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleType(option.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-ocean-deep text-white"
                      : "bg-white text-text-secondary hover:bg-ocean-light"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
            {selectedTypes.length > 0 && (
              <button
                onClick={() => setSelectedTypes([])}
                className="px-4 py-2 rounded-full text-sm font-medium bg-sakura-pink text-white hover:bg-sakura-coral transition-all"
              >
                清除筛选
              </button>
            )}
          </div>

          {/* Timeline */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-deep"></div>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary">
                {selectedTypes.length > 0
                  ? "没有找到符合筛选条件的内容"
                  : "暂无内容，快去 Notion 添加吧！"}
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-0 bottom-0 w-0.5 bg-ocean-light"></div>
              <div className="space-y-0">
                {filteredEntries.map((entry) => (
                  <TimelineCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

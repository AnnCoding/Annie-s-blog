"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import { TechNote, NoteTag, NoteDifficulty } from "@/lib/types";

const tags: NoteTag[] = ["React", "Next.js", "TypeScript", "AI", "JavaScript", "CSS", "Node.js", "其他"];
const difficulties: NoteDifficulty[] = ["入门", "进阶", "高级"];

export default function NotesPage() {
  const [notes, setNotes] = useState<TechNote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<TechNote[]>([]);
  const [selectedTag, setSelectedTag] = useState<NoteTag | "全部">("全部");
  const [selectedDifficulty, setSelectedDifficulty] = useState<NoteDifficulty | "全部">("全部");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/notion/notes?limit=100");
        const data = await response.json();
        if (data.success) {
          setNotes(data.data);
          setFilteredNotes(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = notes;

    if (selectedTag !== "全部") {
      filtered = filtered.filter((note) => note.tags.includes(selectedTag));
    }

    if (selectedDifficulty !== "全部") {
      filtered = filtered.filter((note) => note.difficulty === selectedDifficulty);
    }

    setFilteredNotes(filtered);
  }, [selectedTag, selectedDifficulty, notes]);

  return (
    <>
      <Header />

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-ocean-deep mb-4">
              📚 技术笔记
            </h1>
            <p className="text-text-secondary">
              学习笔记、技术总结、心得体会
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8">
            {/* Tag Filter */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-text-secondary mb-3">按标签筛选</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag("全部")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedTag === "全部"
                      ? "bg-ocean-deep text-white"
                      : "bg-ocean-light text-ocean-deep hover:bg-ocean-medium hover:text-white"
                  }`}
                >
                  全部
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? "bg-ocean-deep text-white"
                        : "bg-ocean-light text-ocean-deep hover:bg-ocean-medium hover:text-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <h3 className="text-sm font-medium text-text-secondary mb-3">按难度筛选</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDifficulty("全部")}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedDifficulty === "全部"
                      ? "bg-ocean-deep text-white"
                      : "bg-ocean-light text-ocean-deep hover:bg-ocean-medium hover:text-white"
                  }`}
                >
                  全部
                </button>
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedDifficulty === diff
                        ? "bg-ocean-deep text-white"
                        : "bg-ocean-light text-ocean-deep hover:bg-ocean-medium hover:text-white"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset button */}
            {(selectedTag !== "全部" || selectedDifficulty !== "全部") && (
              <button
                onClick={() => {
                  setSelectedTag("全部");
                  setSelectedDifficulty("全部");
                }}
                className="mt-4 px-4 py-2 rounded-full text-sm font-medium bg-sakura-pink text-white hover:bg-sakura-coral transition-all"
              >
                重置筛选
              </button>
            )}
          </div>

          {/* Notes Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-deep"></div>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-secondary">
                {selectedTag !== "全部" || selectedDifficulty !== "全部"
                  ? "没有找到符合筛选条件的笔记"
                  : "暂无内容，快去 Notion 添加吧！"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          )}

          {/* Stats */}
          {!loading && notes.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-text-secondary text-sm">
                共 <span className="font-semibold text-ocean-deep">{notes.length}</span> 篇笔记
                {(selectedTag !== "全部" || selectedDifficulty !== "全部") && (
                  <>
                    ，当前显示 <span className="font-semibold text-ocean-deep">{filteredNotes.length}</span> 篇
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

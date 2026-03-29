import Header from "@/components/Header";
import TimelineCard from "@/components/TimelineCard";
import CategoryCard from "@/components/CategoryCard";
import NoteCard from "@/components/NoteCard";
import DemoCard from "@/components/DemoCard";
import Link from "next/link";
import {
  getTimelineEntries,
  getFragments,
  getTechNotes,
  getDemos,
} from "@/lib/notion";

// 获取首页预览数据（每个模块取前 3 条）
async function getHomePageData() {
  try {
    const [timeline, fragments, notes, demos] = await Promise.all([
      getTimelineEntries(3),
      getFragments(undefined, 3),
      getTechNotes(undefined, undefined, 3),
      getDemos(true, 3),
    ]);

    return {
      timeline,
      fragments,
      notes,
      demos,
    };
  } catch (error) {
    console.error("Error fetching home page data:", error);
    // 返回空数据而不是模拟数据
    return {
      timeline: [],
      fragments: [],
      notes: [],
      demos: [],
    };
  }
}

export default async function HomePage() {
  const { timeline, fragments, notes, demos } = await getHomePageData();

  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-sakura-pink/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-ocean-medium/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative z-10 text-center px-4">
            <div className="text-6xl mb-4 animate-bounce">👋</div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-ocean-deep via-ocean-medium to-sakura-coral bg-clip-text text-transparent">
                Annie&apos;s Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
              记录生活点滴 · 分享学习心得 · 展示创意作品
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/timeline" className="btn-primary">
                探索时间线
              </Link>
              <Link href="/demos" className="btn-secondary">
                查看 Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Timeline Preview */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-ocean-deep">📅 最新动态</h2>
              <Link href="/timeline" className="text-sakura-coral hover:text-sakura-pink transition-colors">
                查看全部 →
              </Link>
            </div>
            {timeline.length > 0 ? (
              <div className="space-y-0">
                {timeline.map((entry) => (
                  <TimelineCard key={entry.id} entry={entry} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary">
                <p>暂无数据，请在 Notion 中添加记录</p>
              </div>
            )}
          </div>
        </section>

        {/* Fragments Preview */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-ocean-deep">✨ 碎片记录</h2>
              <Link href="/fragments" className="text-sakura-coral hover:text-sakura-pink transition-colors">
                查看全部 →
              </Link>
            </div>
            {fragments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fragments.map((fragment) => (
                  <CategoryCard key={fragment.id} fragment={fragment} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary">
                <p>暂无数据，请在 Notion 中添加记录</p>
              </div>
            )}
          </div>
        </section>

        {/* Notes Preview */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-ocean-deep">📚 技术笔记</h2>
              <Link href="/notes" className="text-sakura-coral hover:text-sakura-pink transition-colors">
                查看全部 →
              </Link>
            </div>
            {notes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {notes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary">
                <p>暂无数据，请在 Notion 中添加记录</p>
              </div>
            )}
          </div>
        </section>

        {/* Demos Preview */}
        <section className="py-16 px-4 bg-white/50">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-ocean-deep">🚀 精选 Demo</h2>
              <Link href="/demos" className="text-sakura-coral hover:text-sakura-pink transition-colors">
                查看全部 →
              </Link>
            </div>
            {demos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {demos.map((demo) => (
                  <DemoCard key={demo.id} demo={demo} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary">
                <p>暂无数据，请在 Notion 中添加记录</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center text-text-secondary">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🌸</span>
            <span className="text-ocean-deep font-semibold">Annie&apos;s Blog</span>
          </div>
          <p className="text-sm">
            用 Next.js 和 Notion 构建 · 记录成长的每一个瞬间
          </p>
          <p className="text-xs mt-2">© 2026 Annie. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

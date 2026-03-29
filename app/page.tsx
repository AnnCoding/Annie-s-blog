import Header from "@/components/Header";
import TimelineCard from "@/components/TimelineCard";
import CategoryCard from "@/components/CategoryCard";
import NoteCard from "@/components/NoteCard";
import DemoCard from "@/components/DemoCard";
import Link from "next/link";

// Mock data - replace with actual API calls after setting up Notion
const mockTimeline: Array<{
  id: string;
  date: string;
  type: Array<"健身" | "学习" | "看书" | "思考" | "有趣">;
  content: string;
  details: string;
  tags: string[];
  mood?: "开心" | "平静" | "疲惫" | "兴奋" | "感恩" | "其他";
  created_time: string;
}> = [
  {
    id: "1",
    date: "2026-03-29",
    type: ["学习"],
    content: "开始学习 Next.js 15",
    details: "探索 App Router 的新特性，包括 Server Actions 和优化的数据获取方式。",
    tags: ["前端开发", "React"],
    mood: "兴奋",
    created_time: "2026-03-29T00:00:00Z",
  },
  {
    id: "2",
    date: "2026-03-28",
    type: ["健身"],
    content: "完成力量训练",
    details: "今日完成胸肌和三头肌训练，感受到明显的肌肉酸痛。",
    tags: ["健康"],
    mood: "疲惫",
    created_time: "2026-03-28T00:00:00Z",
  },
  {
    id: "3",
    date: "2026-03-27",
    type: ["思考"],
    content: "关于技术学习的思考",
    details: "持续学习是保持竞争力的关键，但要找到适合自己的节奏。",
    tags: ["成长", "思考"],
    mood: "平静",
    created_time: "2026-03-27T00:00:00Z",
  },
];

const mockFragments: Array<{
  id: string;
  title: string;
  category: Array<"AI学习" | "健身打卡" | "羽毛球" | "游泳" | "理财炒股" | "社会思考">;
  content: string;
  date: string;
  status: "进行中" | "已完成" | "归档";
  created_time: string;
}> = [
  {
    id: "1",
    title: "AI 工具使用笔记",
    category: ["AI学习"],
    content: "探索各种 AI 工具在开发工作流中的应用，包括代码生成、调试辅助等。",
    date: "2026-03-29",
    status: "进行中",
    created_time: "2026-03-29T00:00:00Z",
  },
  {
    id: "2",
    title: "游泳训练计划",
    category: ["游泳"],
    content: "制定每周三次的游泳计划，目标是连续游1000米不间断。",
    date: "2026-03-28",
    status: "进行中",
    created_time: "2026-03-28T00:00:00Z",
  },
];

const mockNotes: Array<{
  id: string;
  title: string;
  tags: Array<"React" | "Next.js" | "TypeScript" | "AI" | "JavaScript" | "CSS" | "Node.js" | "其他">;
  content: string;
  date: string;
  difficulty: "入门" | "进阶" | "高级";
  url?: string;
  created_time: string;
}> = [
  {
    id: "1",
    title: "React Server Components 深度解析",
    tags: ["React", "Next.js"],
    content: "Server Components 带来的性能优化和开发体验提升。",
    date: "2026-03-29",
    difficulty: "进阶",
    url: "https://example.com",
    created_time: "2026-03-29T00:00:00Z",
  },
  {
    id: "2",
    title: "TypeScript 高级类型技巧",
    tags: ["TypeScript"],
    content: "掌握泛型、条件类型、映射类型等高级特性。",
    date: "2026-03-27",
    difficulty: "高级",
    created_time: "2026-03-27T00:00:00Z",
  },
];

const mockDemos: Array<{
  id: string;
  name: string;
  description: string;
  techStack: Array<"React" | "Next.js" | "Vue" | "TypeScript" | "Node.js" | "Python" | "AI/ML" | "其他">;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  created_time: string;
}> = [
  {
    id: "1",
    name: "Annie's Task Manager",
    description: "一个简洁优雅的任务管理应用，支持拖拽排序和主题切换。",
    techStack: ["React", "Next.js", "TypeScript"],
    demoUrl: "https://demo.example.com",
    githubUrl: "https://github.com/example",
    featured: true,
    created_time: "2026-03-29T00:00:00Z",
  },
];

export default function HomePage() {
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
                Annie&apos;s Block
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
            <div className="space-y-0">
              {mockTimeline.map((entry) => (
                <TimelineCard key={entry.id} entry={entry} />
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFragments.map((fragment) => (
                <CategoryCard key={fragment.id} fragment={fragment} />
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDemos.map((demo) => (
                <DemoCard key={demo.id} demo={demo} />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 text-center text-text-secondary">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🌸</span>
            <span className="text-ocean-deep font-semibold">Annie&apos;s Block</span>
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

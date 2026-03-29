import { TechNote } from "@/lib/types";
import Link from "next/link";

interface NoteCardProps {
  note: TechNote;
}

const difficultyColors: Record<string, string> = {
  入门: "bg-green-100 text-green-700",
  进阶: "bg-amber-100 text-amber-700",
  高级: "bg-red-100 text-red-700",
};

const tagColors: Record<string, string> = {
  React: "bg-cyan-100 text-cyan-700",
  "Next.js": "bg-slate-100 text-slate-700",
  TypeScript: "bg-blue-100 text-blue-700",
  AI: "bg-violet-100 text-violet-700",
  JavaScript: "bg-yellow-100 text-yellow-700",
  CSS: "bg-pink-100 text-pink-700",
  "Node.js": "bg-green-100 text-green-700",
  其他: "bg-gray-100 text-gray-700",
};

export default function NoteCard({ note }: NoteCardProps) {
  const diffStyle = difficultyColors[note.difficulty] || difficultyColors["入门"];

  return (
    <Link
      href={note.url || "#"}
      target={note.url ? "_blank" : undefined}
      className="card p-5 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col group"
    >
      {/* Header with difficulty badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${diffStyle}`}
        >
          {note.difficulty}
        </span>
        {note.url && (
          <span className="text-text-secondary group-hover:text-sakura-coral transition-colors">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-ocean-deep transition-colors">
        {note.title}
      </h3>

      {/* Content preview */}
      <p className="text-text-secondary text-sm line-clamp-3 mb-3 flex-grow">
        {note.content}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {note.tags.slice(0, 3).map((tag) => {
          const tagStyle = tagColors[tag] || tagColors["其他"];
          return (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${tagStyle}`}
            >
              {tag}
            </span>
          );
        })}
        {note.tags.length > 3 && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium text-text-secondary">
            +{note.tags.length - 3}
          </span>
        )}
      </div>

      {/* Date */}
      <div className="text-xs text-text-secondary pt-3 border-t border-ocean-light">
        {note.date || new Date(note.created_time).toLocaleDateString("zh-CN")}
      </div>
    </Link>
  );
}

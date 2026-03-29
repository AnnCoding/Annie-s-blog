import { TimelineEntry } from "@/lib/types";

interface TimelineCardProps {
  entry: TimelineEntry;
}

const typeColors: Record<string, string> = {
  健身: "bg-green-100 text-green-700",
  学习: "bg-blue-100 text-blue-700",
  看书: "bg-purple-100 text-purple-700",
  思考: "bg-amber-100 text-amber-700",
  有趣: "bg-pink-100 text-pink-700",
};

const moodEmojis: Record<string, string> = {
  开心: "😊",
  平静: "😌",
  疲惫: "😴",
  兴奋: "🤩",
  感恩: "🙏",
  其他: "💭",
};

export default function TimelineCard({ entry }: TimelineCardProps) {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-ocean-light last:pb-0">
      {/* Timeline dot */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-sakura-pink border-4 border-white shadow-md" />

      <div className="card p-5 hover:translate-x-1 transition-transform duration-300">
        {/* Date and Mood */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-ocean-deep">
            {entry.date || new Date(entry.created_time).toLocaleDateString("zh-CN")}
          </span>
          {entry.mood && (
            <span className="text-xl" title={entry.mood}>
              {moodEmojis[entry.mood] || moodEmojis["其他"]}
            </span>
          )}
        </div>

        {/* Type badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          {entry.type.map((type) => (
            <span
              key={type}
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                typeColors[type] || "bg-gray-100 text-gray-700"
              }`}
            >
              {type}
            </span>
          ))}
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {entry.content}
        </h3>

        {/* Details */}
        {entry.details && (
          <p className="text-text-secondary text-sm line-clamp-3">
            {entry.details}
          </p>
        )}

        {/* Tags */}
        {entry.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {entry.tags.map((tag) => (
              <span key={tag} className="tag-ocean text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

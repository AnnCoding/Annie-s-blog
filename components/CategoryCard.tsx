import { Fragment, FragmentCategory } from "@/lib/types";

interface CategoryCardProps {
  fragment: Fragment;
}

const categoryStyles: Record<FragmentCategory, { bg: string; text: string; icon: string }> = {
  "AI学习": { bg: "bg-violet-100", text: "text-violet-700", icon: "🤖" },
  "健身打卡": { bg: "bg-green-100", text: "text-green-700", icon: "💪" },
  "羽毛球": { bg: "bg-blue-100", text: "text-blue-700", icon: "🏸" },
  "游泳": { bg: "bg-cyan-100", text: "text-cyan-700", icon: "🏊" },
  "理财炒股": { bg: "bg-amber-100", text: "text-amber-700", icon: "💰" },
  "社会思考": { bg: "bg-rose-100", text: "text-rose-700", icon: "🤔" },
};

const statusStyles: Record<string, { bg: string; text: string }> = {
  进行中: { bg: "bg-blue-100", text: "text-blue-700" },
  已完成: { bg: "bg-green-100", text: "text-green-700" },
  归档: { bg: "bg-gray-100", text: "text-gray-700" },
};

export default function CategoryCard({ fragment }: CategoryCardProps) {
  const mainCategory = fragment.category[0];
  const categoryStyle = categoryStyles[mainCategory] || {
    bg: "bg-gray-100",
    text: "text-gray-700",
    icon: "📝",
  };
  const statusStyle = statusStyles[fragment.status] || statusStyles["进行中"];

  return (
    <div className="card p-5 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
      {/* Category badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${categoryStyle.bg} ${categoryStyle.text} flex items-center gap-1.5`}
        >
          <span>{categoryStyle.icon}</span>
          <span>{mainCategory}</span>
        </span>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
        >
          {fragment.status}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
        {fragment.title}
      </h3>

      {/* Content preview */}
      <p className="text-text-secondary text-sm line-clamp-3 mb-3 flex-grow">
        {fragment.content}
      </p>

      {/* Date */}
      <div className="flex items-center justify-between text-xs text-text-secondary pt-3 border-t border-ocean-light">
        <span>
          {fragment.date || new Date(fragment.created_time).toLocaleDateString("zh-CN")}
        </span>
        {fragment.category.length > 1 && (
          <span>+{fragment.category.length - 1} 更多</span>
        )}
      </div>
    </div>
  );
}

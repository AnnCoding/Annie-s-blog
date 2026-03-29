import { Demo } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface DemoCardProps {
  demo: Demo;
}

const techColors: Record<string, string> = {
  React: "bg-cyan-500",
  "Next.js": "bg-slate-800",
  Vue: "bg-green-500",
  TypeScript: "bg-blue-500",
  "Node.js": "bg-green-600",
  Python: "bg-yellow-500",
  "AI/ML": "bg-violet-500",
  其他: "bg-gray-500",
};

export default function DemoCard({ demo }: DemoCardProps) {
  return (
    <div className="card overflow-hidden hover:-translate-y-1 transition-all duration-300 group">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-ocean-light to-sakura-light overflow-hidden">
        {demo.thumbnail ? (
          <Image
            src={demo.thumbnail}
            alt={demo.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">🚀</span>
          </div>
        )}

        {/* Featured badge */}
        {demo.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-sakura-coral text-white text-xs font-medium rounded-full flex items-center gap-1">
            <span>⭐</span>
            <span>精选</span>
          </div>
        )}

        {/* Links overlay on hover */}
        <div className="absolute inset-0 bg-ocean-deep/80 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {demo.demoUrl && (
            <Link
              href={demo.demoUrl}
              target="_blank"
              className="px-4 py-2 bg-white text-ocean-deep rounded-full text-sm font-medium hover:bg-sakura-pink hover:text-white transition-colors"
            >
              查看 Demo
            </Link>
          )}
          {demo.githubUrl && (
            <Link
              href={demo.githubUrl}
              target="_blank"
              className="px-4 py-2 bg-white text-ocean-deep rounded-full text-sm font-medium hover:bg-ocean-deep hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-ocean-deep transition-colors line-clamp-1">
          {demo.name}
        </h3>
        <p className="text-text-secondary text-sm line-clamp-2 mb-3">
          {demo.description}
        </p>

        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-1.5">
          {demo.techStack.map((tech) => {
            const bgClass = techColors[tech] || techColors["其他"];
            return (
              <span
                key={tech}
                className={`px-2 py-0.5 rounded text-xs font-medium text-white ${bgClass}`}
              >
                {tech}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Notion API Types
export interface NotionPage {
  id: string;
  created_time: string;
  last_edited_time: string;
  cover?: string;
  icon?: string;
  archived: boolean;
  properties: Record<string, any>;
  url: string;
}

export interface NotionBlock {
  id: string;
  type: string;
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
  [key: string]: any;
}

// Timeline Types
export type TimelineType = '健身' | '学习' | '看书' | '思考' | '有趣';
export type TimelineMood = '开心' | '平静' | '疲惫' | '兴奋' | '感恩' | '其他';

export interface TimelineEntry {
  id: string;
  date: string;
  type: TimelineType[];
  content: string;
  details: string;
  tags: string[];
  mood?: TimelineMood;
  created_time: string;
}

// Fragments Types
export type FragmentCategory = 'AI学习' | '健身打卡' | '羽毛球' | '游泳' | '理财炒股' | '社会思考';
export type FragmentStatus = '进行中' | '已完成' | '归档';

export interface Fragment {
  id: string;
  title: string;
  category: FragmentCategory[];
  content: string;
  date: string;
  status: FragmentStatus;
  created_time: string;
}

// Notes Types
export type NoteTag = 'React' | 'Next.js' | 'TypeScript' | 'AI' | 'JavaScript' | 'CSS' | 'Node.js' | '其他';
export type NoteDifficulty = '入门' | '进阶' | '高级';

export interface TechNote {
  id: string;
  title: string;
  tags: NoteTag[];
  content: string;
  date: string;
  difficulty: NoteDifficulty;
  url?: string;
  created_time: string;
}

// Demo Types
export type DemoTech = 'React' | 'Next.js' | 'Vue' | 'TypeScript' | 'Node.js' | 'Python' | 'AI/ML' | '其他';

export interface Demo {
  id: string;
  name: string;
  description: string;
  techStack: DemoTech[];
  demoUrl?: string;
  githubUrl?: string;
  thumbnail?: string;
  featured: boolean;
  created_time: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Category Types for UI
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

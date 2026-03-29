import { Client } from "@notionhq/client";
import type {
  NotionPage,
  TimelineEntry,
  Fragment,
  TechNote,
  Demo,
  NotionBlock
} from "./types";

// Initialize Notion Client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Database IDs
export const DATABASE_IDS = {
  timeline: process.env.NOTION_TIMELINE_DB || "",
  fragments: process.env.NOTION_FRAGMENTS_DB || "",
  notes: process.env.NOTION_NOTES_DB || "",
  demos: process.env.NOTION_DEMOS_DB || "",
};

// Helper function to extract text from Notion property
function getTextFromProperty(property: any): string {
  if (!property) return "";

  switch (property.type) {
    case "title":
      return property.title?.map((t: any) => t.plain_text).join("") || "";
    case "rich_text":
      return property.rich_text?.map((t: any) => t.plain_text).join("") || "";
    case "select":
      return property.select?.name || "";
    case "multi_select":
      return property.multi_select?.map((s: any) => s.name).join(", ") || "";
    case "date":
      return property.date?.start || "";
    case "url":
      return property.url || "";
    default:
      return "";
  }
}

// Helper function to get array from multi_select
function getMultiSelectArray(property: any): string[] {
  if (!property || property.type !== "multi_select") return [];
  return property.multi_select?.map((s: any) => s.name) || [];
}

// Helper function to get checkbox value
function getCheckboxValue(property: any): boolean {
  if (!property || property.type !== "checkbox") return false;
  return property.checkbox || false;
}

// Helper function to get file URL
function getFileUrl(property: any): string | undefined {
  if (!property) return undefined;
  if (property.type === "files" && property.files?.[0]) {
    const file = property.files[0];
    if (file.type === "external") return file.external.url;
    if (file.type === "file") return file.file.url;
  }
  return undefined;
}

// Fetch blocks content for a page
async function getPageBlocks(pageId: string): Promise<string> {
  try {
    const blocks = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    let content = "";
    for (const block of blocks.results) {
      switch ((block as any).type) {
        case "paragraph":
          content += getTextFromProperty((block as any).paragraph) + "\n\n";
          break;
        case "heading_1":
          content += `# ${getTextFromProperty((block as any).heading_1)}\n\n`;
          break;
        case "heading_2":
          content += `## ${getTextFromProperty((block as any).heading_2)}\n\n`;
          break;
        case "heading_3":
          content += `### ${getTextFromProperty((block as any).heading_3)}\n\n`;
          break;
        case "bulleted_list_item":
          content += `- ${getTextFromProperty((block as any).bulleted_list_item)}\n`;
          break;
        case "numbered_list_item":
          content += `1. ${getTextFromProperty((block as any).numbered_list_item)}\n`;
          break;
        case "code":
          const code = (block as any).code;
          content += "```" + code.language + "\n" +
            code.rich_text?.map((t: any) => t.plain_text).join("") + "\n```\n\n";
          break;
        case "quote":
          content += `> ${getTextFromProperty((block as any).quote)}\n\n`;
          break;
      }
    }
    return content;
  } catch (error) {
    console.error("Error fetching page blocks:", error);
    return "";
  }
}

// ============ TIMELINE ============
export async function getTimelineEntries(limit: number = 50): Promise<TimelineEntry[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_IDS.timeline,
      sorts: [{ property: "Date", direction: "descending" }],
      page_size: limit,
    });

    const entries: TimelineEntry[] = [];

    for (const page of response.results as unknown as NotionPage[]) {
      const props = page.properties;
      const details = await getPageBlocks(page.id);

      entries.push({
        id: page.id,
        date: getTextFromProperty(props.Date || props.date),
        type: getMultiSelectArray(props.Type || props.type) as any,
        content: getTextFromProperty(props.Content || props.content),
        details,
        tags: getMultiSelectArray(props.Tags || props.tags),
        mood: (props.Mood || props.mood)?.select?.name,
        created_time: page.created_time,
      });
    }

    return entries;
  } catch (error) {
    console.error("Error fetching timeline:", error);
    return [];
  }
}

// ============ FRAGMENTS ============
export async function getFragments(category?: string, limit: number = 50): Promise<Fragment[]> {
  try {
    const query: any = {
      database_id: DATABASE_IDS.fragments,
      sorts: [{ property: "Date", direction: "descending" }],
      page_size: limit,
    };

    if (category) {
      query.filter = {
        property: "Category",
        multi_select: {
          contains: category,
        },
      };
    }

    const response = await notion.databases.query(query);
    const fragments: Fragment[] = [];

    for (const page of response.results as unknown as NotionPage[]) {
      const props = page.properties;
      const content = await getPageBlocks(page.id);

      fragments.push({
        id: page.id,
        title: getTextFromProperty(props.Title || props.title),
        category: getMultiSelectArray(props.Category || props.category) as any,
        content,
        date: getTextFromProperty(props.Date || props.date),
        status: (props.Status || props.status)?.select?.name || "进行中",
        created_time: page.created_time,
      });
    }

    return fragments;
  } catch (error) {
    console.error("Error fetching fragments:", error);
    return [];
  }
}

// ============ TECH NOTES ============
export async function getTechNotes(tag?: string, difficulty?: string, limit: number = 50): Promise<TechNote[]> {
  try {
    const query: any = {
      database_id: DATABASE_IDS.notes,
      sorts: [{ property: "Date", direction: "descending" }],
      page_size: limit,
    };

    const filters: any[] = [];

    if (tag) {
      filters.push({
        property: "Tags",
        multi_select: {
          contains: tag,
        },
      });
    }

    if (difficulty) {
      filters.push({
        property: "Difficulty",
        select: {
          equals: difficulty,
        },
      });
    }

    if (filters.length > 0) {
      query.filter = filters.length === 1 ? filters[0] : { and: filters };
    }

    const response = await notion.databases.query(query);
    const notes: TechNote[] = [];

    for (const page of response.results as unknown as NotionPage[]) {
      const props = page.properties;
      const content = await getPageBlocks(page.id);

      notes.push({
        id: page.id,
        title: getTextFromProperty(props.Title || props.title),
        tags: getMultiSelectArray(props.Tags || props.tags) as any,
        content,
        date: getTextFromProperty(props.Date || props.date),
        difficulty: (props.Difficulty || props.difficulty)?.select?.name || "入门",
        url: props.URL?.url || props.url?.url,
        created_time: page.created_time,
      });
    }

    return notes;
  } catch (error) {
    console.error("Error fetching tech notes:", error);
    return [];
  }
}

// ============ DEMOS ============
export async function getDemos(featured: boolean = false, limit: number = 50): Promise<Demo[]> {
  try {
    const query: any = {
      database_id: DATABASE_IDS.demos,
      sorts: [{ timestamp: "created_time", direction: "descending" }],
      page_size: limit,
    };

    if (featured) {
      query.filter = {
        property: "Featured",
        checkbox: {
          equals: true,
        },
      };
    }

    const response = await notion.databases.query(query);
    const demos: Demo[] = [];

    for (const page of response.results as unknown as NotionPage[]) {
      const props = page.properties;

      demos.push({
        id: page.id,
        name: getTextFromProperty(props.Name || props.name || props.Title),
        description: getTextFromProperty(props.Description || props.description),
        techStack: getMultiSelectArray(props.TechStack || props.techStack) as any,
        demoUrl: props.DemoURL?.url || props.demoUrl?.url || props.demoURL?.url,
        githubUrl: props.GitHubURL?.url || props.githubUrl?.url || props.githubURL?.url,
        thumbnail: getFileUrl(props.Thumbnail || props.thumbnail),
        featured: getCheckboxValue(props.Featured || props.featured),
        created_time: page.created_time,
      });
    }

    return demos;
  } catch (error) {
    console.error("Error fetching demos:", error);
    return [];
  }
}

// Get a single page by ID
export async function getPageById(pageId: string): Promise<NotionPage | null> {
  try {
    const page = await notion.pages.retrieve({ page_id: pageId });
    return page as unknown as NotionPage;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

// Test Notion connection
export async function testConnection(): Promise<boolean> {
  try {
    await notion.users.me({});
    return true;
  } catch (error) {
    console.error("Notion connection failed:", error);
    return false;
  }
}

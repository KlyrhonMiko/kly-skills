import fs from "fs";
import path from "path";

export interface SkillSummary {
  slug: string;
  description: string;
}

export interface SkillDetails extends SkillSummary {
  content: string; // Markdown content
}

const SKILLS_DIR_1 = path.join(process.cwd(), "../data/skills"); // If cwd is website
const SKILLS_DIR_2 = path.join(process.cwd(), "data/skills"); // If cwd is workspace root

export function getSkillsDir() {
  if (fs.existsSync(SKILLS_DIR_2)) return SKILLS_DIR_2;
  return SKILLS_DIR_1;
}

export async function getSkillsList(): Promise<SkillSummary[]> {
  const SKILLS_DIR = getSkillsDir();
  try {
    const llmsPath = path.join(SKILLS_DIR, "llms.txt");
    const content = await fs.promises.readFile(llmsPath, "utf-8");
    const lines = content.replace(/\r/g, "").split("\n");

    const skills: SkillSummary[] = [];

    for (const line of lines) {
      if (!line.trim()) continue;
      const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
      if (match) {
        skills.push({
          slug: match[1],
          description: match[2],
        });
      }
    }

    return skills;
  } catch (error: any) {
    console.error("Error reading llms.txt:", error);
    return [
      {
        slug: "error-loading-skills",
        description: `Failed: ${error.message} | cwd: ${process.cwd()} | dir: ${SKILLS_DIR}`,
      }
    ];
  }
}

export async function getSkillDetails(slug: string): Promise<SkillDetails | null> {
  const SKILLS_DIR = getSkillsDir();
  try {
    const skillDir = path.join(SKILLS_DIR, slug);
    
    // Check if directory exists
    const stats = await fs.promises.stat(skillDir).catch(() => null);
    if (!stats || !stats.isDirectory()) {
      return null;
    }

    // Try reading README.md or SKILL.md
    let content = "";
    try {
      content = await fs.promises.readFile(path.join(skillDir, "README.md"), "utf-8");
    } catch {
      try {
        content = await fs.promises.readFile(path.join(skillDir, "SKILL.md"), "utf-8");
      } catch {
        content = "No README.md or SKILL.md found for this skill.";
      }
    }

    // Strip YAML frontmatter if present
    content = content.replace(/^\s*---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trim();

    // Rewrite relative asset paths to use the API route
    content = content.replace(/src="(\.\/)?assets\//g, `src="/api/skills/${slug}/assets/`);
    content = content.replace(/srcset="(\.\/)?assets\//g, `srcset="/api/skills/${slug}/assets/`);
    content = content.replace(/\]\((\.\/)?assets\//g, `](/api/skills/${slug}/assets/`);

    // Get description from llms.txt
    const skillsList = await getSkillsList();
    const summary = skillsList.find((s) => s.slug === slug);

    return {
      slug,
      description: summary?.description || "No description available.",
      content,
    };
  } catch (error) {
    console.error(`Error reading skill details for ${slug}:`, error);
    return null;
  }
}

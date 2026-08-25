import fs from "fs";
import path from "path";

export interface SkillSummary {
  slug: string;
  description: string;
}

export interface SkillDetails extends SkillSummary {
  content: string; // Markdown content
}

const SKILLS_DIR = path.join(process.cwd(), "../data/skills");

export async function getSkillsList(): Promise<SkillSummary[]> {
  try {
    const llmsPath = path.join(SKILLS_DIR, "llms.txt");
    const content = await fs.promises.readFile(llmsPath, "utf-8");
    const lines = content.split("\n");

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
  } catch (error) {
    console.error("Error reading llms.txt:", error);
    return [];
  }
}

export async function getSkillDetails(slug: string): Promise<SkillDetails | null> {
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

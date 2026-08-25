import { getSkillDetails } from "@/lib/skills";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface SkillPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SkillPage({ params }: SkillPageProps) {
  const { slug } = await params;
  const skill = await getSkillDetails(slug);

  if (!skill) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 max-w-[800px] mx-auto relative">
      {/* Background Glow */}
      <div className="fixed top-1/3 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <Link
        href="/"
        className="inline-flex items-center text-sm font-semibold tracking-wide uppercase text-muted hover:text-primary transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Skills
      </Link>

      <header className="mb-16">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 glass rounded-xl border-border-light shadow-sm text-primary">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-heading">{skill.slug}</h1>
        </div>
        <p className="text-xl text-body leading-relaxed max-w-2xl">
          {skill.description}
        </p>
      </header>

      <div className="glass-strong rounded-2xl p-8 md:p-12 shadow-xl shadow-black/5 relative">
        {/* Subtle inner grid pattern could go here, for now just premium glass */}
        <MarkdownRenderer content={skill.content} />
      </div>
    </main>
  );
}

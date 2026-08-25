"use client";

import Link from "next/link";
import { Terminal, ArrowRight, Code2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HomeClient({ skills }: { skills: any[] }) {
  return (
    <main className="min-h-[100dvh] pt-32 pb-16 px-6 max-w-[1200px] mx-auto relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent-teal/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center space-y-8 mb-32 relative z-10"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-surface/50 px-4 py-2 rounded-full text-sm font-semibold border border-primary/20 text-primary tracking-wide shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>Antigravity Skills Directory</span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-balance text-heading leading-[1.1]">
          Discover & Master <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-teal inline-block">
            Agentic Workflows
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-body max-w-2xl text-balance leading-relaxed">
          Explore our collection of specialized AI skills, prompts, and documentation to build premium interfaces and robust software faster than ever.
        </motion.p>
      </motion.div>

      {/* Skills Grid */}
      <div className="relative z-10">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((skill) => (
            <motion.div key={skill.slug} variants={itemVariants}>
              <Link
                href={`/skills/${skill.slug}`}
                className="group relative flex flex-col p-8 rounded-2xl glass card-glow h-full"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-surface-elevated rounded-xl shadow-sm border border-border-light text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:-rotate-45 transition-all duration-300" />
                </div>
                
                <h2 className="text-2xl font-bold mb-3 text-heading">{skill.slug}</h2>
                <p className="text-body leading-relaxed line-clamp-3">
                  {skill.description}
                </p>

                <div className="mt-8 flex-grow flex items-end">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary/70 group-hover:text-primary transition-colors">
                    View Documentation &rarr;
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}

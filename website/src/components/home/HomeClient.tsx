"use client";

import Link from "next/link";
import { ArrowRight, Copy, Check } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useLenis } from "lenis/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function HomeClient({ skills }: { skills: any[] }) {
  const [mounted, setMounted] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(skills[0] || null);
  const [isCopied, setIsCopied] = useState(false);
  const lenis = useLenis();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npx kly-skills");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Split skills into rows for the infinite marquee
  const { row1, row2 } = useMemo(() => {
    // Shuffle skills for a more random distribution
    const shuffled = [...skills].sort(() => Math.random() - 0.5);
    const mid = Math.ceil(shuffled.length / 2);
    // Duplicate arrays to allow for seamless infinite scrolling
    const firstHalf = shuffled.slice(0, mid);
    const secondHalf = shuffled.slice(mid);
    
    // We triple the array so we can animate 1/3 of the width seamlessly
    return {
      row1: [...firstHalf, ...firstHalf, ...firstHalf],
      row2: [...secondHalf, ...secondHalf, ...secondHalf]
    };
  }, [skills]);

  return (
    <main className="relative flex flex-col items-center min-h-[100dvh] bg-background">
      
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center w-full min-h-[100dvh] overflow-hidden">
        
        {/* Infinite Glass Marquee Layer */}
        {mounted && (
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col items-center justify-center opacity-80 gap-8 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            
            {/* Row 1: Moves Left */}
            <div className="w-full relative flex items-center min-w-max">
              <motion.div
                className="flex gap-6 min-w-max pointer-events-auto px-3"
                initial={{ x: 0 }}
                animate={{ x: "-33.33%" }} // Translate exactly 1/3 since we tripled the array
                transition={{
                  x: { duration: 40, repeat: Infinity, ease: "linear" }
                }}
              >
                {row1.map((skill, i) => (
                  <Link
                    key={`${skill.slug}-${i}`}
                    href={`/skills/${skill.slug}`}
                    className="group inline-flex items-center justify-center gap-6 px-8 text-xl md:text-2xl font-medium tracking-tight text-foreground/15 hover:text-foreground transition-colors duration-500 whitespace-nowrap"
                  >
                    <span className="text-foreground/10 font-mono text-sm group-hover:text-foreground/40 transition-colors duration-500">+</span>
                    <span>{skill.slug.toLowerCase()}</span>
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Row 2: Moves Right */}
            <div className="w-full relative flex items-center min-w-max">
              <motion.div
                className="flex gap-6 min-w-max pointer-events-auto px-3"
                initial={{ x: "-33.33%" }}
                animate={{ x: 0 }}
                transition={{
                  x: { duration: 45, repeat: Infinity, ease: "linear" }
                }}
              >
                {row2.map((skill, i) => (
                  <Link
                    key={`${skill.slug}-${i}`}
                    href={`/skills/${skill.slug}`}
                    className="group inline-flex items-center justify-center gap-6 px-8 text-xl md:text-2xl font-medium tracking-tight text-foreground/15 hover:text-foreground transition-colors duration-500 whitespace-nowrap"
                  >
                    <span className="text-foreground/10 font-mono text-sm group-hover:text-foreground/40 transition-colors duration-500">+</span>
                    <span>{skill.slug.toLowerCase()}</span>
                  </Link>
                ))}
              </motion.div>
            </div>

          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8 relative z-20 max-w-5xl px-6"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-muted">
              Antigravity Skills Directory
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-medium tracking-[-0.04em] text-balance text-heading leading-[1.1] md:leading-[0.9]">
            Discover & master <br className="hidden sm:block" />
            <span className="italic opacity-80 mt-2 sm:mt-0 inline-block">agentic workflows.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-muted max-w-xl text-balance leading-[1.6] pt-4">
            A definitive library of AI skills and prompts to refine code, design premium interfaces, and automate development.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-10 flex flex-col sm:flex-row items-center gap-6">
            <a 
              href="#skills" 
              onClick={(e) => {
                e.preventDefault();
                lenis?.scrollTo('#skills');
              }}
              className="group flex items-center justify-center w-full sm:w-auto h-12 px-8 bg-heading text-background text-sm font-medium hover:bg-heading/90 transition-colors rounded-sm"
            >
              Browse Directory
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="relative group/copy w-full sm:w-auto">
              <button 
                onClick={handleCopy}
                className="group flex items-center justify-between w-full sm:w-auto h-12 px-5 font-mono text-xs border border-border text-muted bg-surface/50 hover:bg-surface hover:border-border-light transition-all duration-300 rounded-sm cursor-pointer"
                aria-label="Copy installation command"
              >
                <div className="flex items-center">
                  <span className="opacity-40 mr-3">$</span>
                  <span className="text-foreground/80 group-hover:text-foreground transition-colors">npx kly-skills</span>
                </div>
                <div className="ml-6 flex items-center justify-center w-6 h-6 rounded-md bg-transparent group-hover:bg-foreground/[0.04] transition-colors">
                  {isCopied ? (
                    <Check size={13} className="text-primary" />
                  ) : (
                    <Copy size={13} className="opacity-40 group-hover:opacity-80 transition-opacity" />
                  )}
                </div>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-surface border border-border/80 rounded shadow-sm text-[11px] font-medium text-muted opacity-0 group-hover/copy:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap translate-y-1 group-hover/copy:translate-y-0 z-50">
                Run in terminal to browse and install
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* SKILLS DIRECTORY LIST (Split Interactive View) */}
      <section id="skills" className="w-full max-w-7xl mx-auto px-6 py-32 relative z-20 bg-background">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-heading">
              Available Skills.
            </h2>
            <p className="text-muted max-w-xl text-lg md:text-xl leading-relaxed">
              Browse the standard library of agentic workflows designed to elevate your AI development process.
            </p>
          </div>
          <div className="text-sm font-mono text-muted/60 uppercase tracking-widest hidden md:block pb-2">
            Directory ({skills.length})
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 relative border-t border-border/40 pt-12">
          
          {/* Left: Scrollable Index List (Col Span 5) */}
          <div className="hidden md:flex flex-col space-y-1 md:col-span-5">
            {skills.map((skill, i) => (
              <div 
                key={skill.slug}
                onMouseEnter={() => setHoveredSkill(skill)}
                className={`group cursor-pointer py-3 px-4 -mx-4 rounded-lg transition-all duration-300 ${hoveredSkill?.slug === skill.slug ? 'bg-surface-elevated/50' : 'hover:bg-foreground/[0.02]'}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`font-mono text-xs transition-colors duration-300 ${hoveredSkill?.slug === skill.slug ? 'text-primary' : 'text-muted/40 group-hover:text-foreground/40'}`}>
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className={`text-xl font-medium tracking-tight transition-colors duration-300 ${hoveredSkill?.slug === skill.slug ? 'text-primary' : 'text-heading group-hover:text-foreground/80'}`}>
                    {skill.slug}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sticky Preview Pane (Col Span 7) */}
          <div className="md:col-span-7 relative hidden md:block">
            <div className="sticky top-32 flex flex-col items-start pt-4">
              {hoveredSkill && (
                <motion.div 
                  key={hoveredSkill.slug}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex flex-col space-y-8"
                >
                  <div className="space-y-6">
                    <h3 className="text-4xl lg:text-5xl font-medium tracking-tight text-heading">
                      {hoveredSkill.slug}
                    </h3>
                    <p className="text-muted text-lg lg:text-xl leading-relaxed max-w-2xl line-clamp-6 lg:line-clamp-[10]">
                      {hoveredSkill.description}
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link 
                      href={`/skills/${hoveredSkill.slug}`}
                      className="group inline-flex items-center justify-center h-12 px-8 bg-heading text-background text-sm font-medium hover:bg-primary transition-colors rounded-sm shadow-sm"
                    >
                      Read Documentation
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Mobile Fallback (Hidden on Desktop): Basic List */}
          <div className="md:hidden col-span-1 flex flex-col pt-8 space-y-8">
            {skills.map((skill, i) => (
               <Link 
                  key={`mobile-${skill.slug}`}
                  href={`/skills/${skill.slug}`}
                  className="flex flex-col gap-3 group"
               >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted/40">{(i + 1).toString().padStart(2, '0')}</span>
                    <h3 className="text-2xl font-medium tracking-tight text-heading group-hover:text-primary transition-colors">{skill.slug}</h3>
                  </div>
                  <p className="text-muted text-base line-clamp-3 pl-8">
                    {skill.description}
                  </p>
               </Link>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}

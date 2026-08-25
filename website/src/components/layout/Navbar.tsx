"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Terminal, Github } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass border-b border-border/40" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center text-foreground/80 group-hover:text-primary transition-colors duration-300">
            <Terminal size={18} strokeWidth={2} />
          </div>
          <span className="text-[15px] font-medium tracking-tight text-foreground/90 group-hover:text-foreground transition-colors duration-300">
            Klyrhon Skills
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="https://github.com/KlyrhonMiko/kly-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[14px] font-medium text-muted hover:text-foreground transition-colors duration-300"
          >
            <span className="hidden sm:inline-block">GitHub</span>
            <Github size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

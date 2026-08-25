"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Github } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(var(--background-rgb), 0)", "var(--glass-bg)"]
  );
  
  const borderColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "var(--glass-border)"]
  );

  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(20px)"]
  );

  return (
    <motion.header
      style={{
        backgroundColor,
        borderColor,
        backdropFilter,
        borderBottomWidth: "1px",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
            <Terminal size={20} />
          </div>
          <span className="font-bold tracking-tight text-heading">Klyrhon Skills</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/KlyrhonMiko/kly-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-light bg-surface/50 text-muted transition-all duration-300 hover:border-primary/30 hover:text-primary hover:shadow-lg hover:shadow-primary/15"
          >
            <Github size={18} />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

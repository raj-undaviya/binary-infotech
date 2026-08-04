"use client";

import { useState } from "react";
import { 
  Code2, 
  Server, 
  Cloud, 
  Cpu, 
  Database, 
  Smartphone, 
  CheckCircle,
  Sparkles,
  Braces
} from "lucide-react";
import Card from "@/components/design-system/Card";

export default function TechnologiesPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Technologies", icon: Sparkles },
    { id: "frontend", name: "Frontend", icon: Code2 },
    { id: "backend", name: "Backend", icon: Braces },
    { id: "cloud", name: "Cloud & DevOps", icon: Cloud },
    { id: "ai", name: "AI & ML", icon: Cpu },
    { id: "databases", name: "Databases", icon: Database },
    { id: "mobile", name: "Mobile", icon: Smartphone },
  ];

  const techList = [
    // Frontend
    { name: "React", cat: "frontend", desc: "For building component-driven interactive user interfaces." },
    { name: "Next.js", cat: "frontend", desc: "Our flagship framework for static & server rendering." },
    { name: "TypeScript", cat: "frontend", desc: "Providing robust type checking for enterprise code." },
    { name: "Tailwind CSS", cat: "frontend", desc: "For clean, responsive, utility-first CSS styling." },
    { name: "Redux / Zustand", cat: "frontend", desc: "State management frameworks for heavy web apps." },

    // Backend
    { name: "Node.js", cat: "backend", desc: "For scaling JavaScript execution pipelines on servers." },
    { name: "Python", cat: "backend", desc: "The cornerstone of our data science and AI architectures." },
    { name: "FastAPI", cat: "backend", desc: "High-performance Python frameworks for REST APIs." },
    { name: "Django", cat: "backend", desc: "Secure, structured corporate backend systems." },
    { name: "Golang", cat: "backend", desc: "For compile-fast, high-throughput microservices." },

    // Cloud & DevOps
    { name: "Amazon Web Services", cat: "cloud", desc: "Secure cloud hosting, S3 uploads, and EC2 scaling." },
    { name: "Docker", cat: "cloud", desc: "Isolating runtime dependencies into lightweight containers." },
    { name: "Kubernetes", cat: "cloud", desc: "Orchestrating container pools and traffic configurations." },
    { name: "GitHub Actions", cat: "cloud", desc: "Continuous testing and automated compilation workflows." },
    { name: "Vercel / Netlify", cat: "cloud", desc: "Optimized serverless hosting for frontends." },

    // AI & ML
    { name: "PyTorch", cat: "ai", desc: "Fine-tuning deep learning models and logistics forecasts." },
    { name: "TensorFlow", cat: "ai", desc: "Building neural networks for text and image data." },
    { name: "Pinecone", cat: "ai", desc: "Vector indexing database for semantic search." },
    { name: "Custom RAG Models", cat: "ai", desc: "RAG frameworks queryable in natural language." },

    // Databases
    { name: "PostgreSQL", cat: "databases", desc: "Our primary relational database choice for structured schemas." },
    { name: "MongoDB", cat: "databases", desc: "NoSQL document storage for semi-structured database tables." },
    { name: "Redis", cat: "databases", desc: "In-memory caching and session key rotations." },
    { name: "SQLite", cat: "databases", desc: "Embedded databases for lightweight local storage." },

    // Mobile
    { name: "React Native", cat: "mobile", desc: "Cross-platform mobile apps compiling near-native speed." },
    { name: "Flutter", cat: "mobile", desc: "Google's UI software development kit using Dart." },
    { name: "Swift / SwiftUI", cat: "mobile", desc: "Native iOS applications optimizing hardware performance." },
    { name: "Kotlin", cat: "mobile", desc: "Platform language for native Android mobile applications." }
  ];

  const filteredTech = activeCategory === "all" 
    ? techList 
    : techList.filter(t => t.cat === activeCategory);

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg-pattern opacity-45 pointer-events-none" />
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Cpu className="h-4 w-4" />
            Technology Stack
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-6">
            Supported Enterprise Ecosystems
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We avoid outdated web stacks. We build using modern compilation pipelines, scalable clouds, and type-safe systems that stand the test of time.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-16 max-w-5xl mx-auto">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-background border-primary shadow-md shadow-primary/10"
                    : "bg-surface text-muted border-border hover:border-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredTech.map((tech) => (
            <Card key={tech.name} variant="hoverable" className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-2">
                <h3 className="text-sm font-extrabold text-foreground">{tech.name}</h3>
                <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-accent/15 text-accent">
                  {tech.cat === "cloud" ? "DevOps" : tech.cat}
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                {tech.desc}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent">
                <CheckCircle className="h-3.5 w-3.5" />
                Production Ready
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}

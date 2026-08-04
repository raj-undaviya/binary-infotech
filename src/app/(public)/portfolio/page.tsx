import { BookOpen, FolderGit2, CheckCircle2, Server, Star, ArrowUpRight } from "lucide-react";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";
import Link from "next/link";

export const metadata = {
  title: "Case Studies & Portfolio | Binary Infotech",
  description: "Review our premium software engineering case studies including FileNova SaaS, CogniFuel AI prediction systems, and Radhe Imitations retail portals.",
};

export default function PortfolioPage() {
  const caseStudies = [
    {
      id: "filenova",
      title: "FileNova",
      tagline: "Flagship Secure SaaS Collaboration Platform",
      category: "SaaS Product",
      problem: "Enterprise architectural and manufacturing clients struggled to share complex CAD files and raw 3D assets securely across geographically dispersed engineering teams due to network latency, upload timeouts, and lack of granular access logs.",
      solution: "We designed a decoupled hybrid Next.js + React architecture leveraging AWS S3 chunked multipart uploads. Strict digital governance and access histories are logged mutatively to an isolated PostgreSQL cluster, optimized via Redis caching at the edge.",
      impact: "Reduced multipart file synchronization latencies by 72% and guaranteed 100% compliance with corporate data audit regulations for over 40 global engineering firms.",
      techStack: ["Next.js", "React", "Node.js", "AWS S3", "Redis", "PostgreSQL", "TypeScript"]
    },
    {
      id: "cognifuel-ai",
      title: "CogniFuel AI",
      tagline: "Predictive Fuel & Logistics Automation System",
      category: "AI & Data Science",
      problem: "Mid-sized distribution and supply chain agencies suffered from massive budget variances due to an inability to forecast fuel price spikes and optimal routing patterns during peak distribution seasons.",
      solution: "We implemented an asynchronous FastAPI data engine using Python and PyTorch. The platform digests macro-economic price indices, weather alerts, and legacy routing logs, mapping spatial vectors via pgvector to recommend high-efficiency routes.",
      impact: "Saved an average of 14.2% on monthly fuel and logistical expenditures, and automated 85% of dynamic fleet dispatch decisions.",
      techStack: ["FastAPI", "PyTorch", "Python", "Docker", "pgvector", "Redis", "Kubernetes"]
    },
    {
      id: "radhe-jewels",
      title: "Radhe Imitations & Jewels",
      tagline: "High-Performance Headless E-commerce Ecosystem",
      category: "Web Development",
      problem: "A prominent jewelry merchant experienced 4.5-second page load latencies on mobile configurations, leading to high cart abandonment rates (up to 65%) during seasonal discount rushes.",
      solution: "We engineered a static-first Next.js headless e-commerce store backed by incremental regeneration (ISR). Implemented optimized image rendering pipelines, sub-second edge caching, and a responsive Tailwind CSS layout.",
      impact: "Reduced page load time to 0.8 seconds (under LCP metrics) and increased mobile checkout conversions by 38.4% within the first month of deployment.",
      techStack: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Redis", "Node.js"]
    }
  ];

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <FolderGit2 className="h-4 w-4" />
            Case Studies
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-6">
            Engineering Digital Excellence in Production
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Discover how we apply architectural rigor, modern compilers, and data-driven optimization to resolve complex business challenges.
          </p>
        </div>

        {/* Case Studies Loop */}
        <div className="space-y-20">
          {caseStudies.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <article
                key={project.id}
                id={project.id}
                className="scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  
                  {/* Left: Graphic and Meta info */}
                  <div className={`lg:col-span-5 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
                      <span className="px-3 py-1 rounded bg-accent/15 text-accent text-[10px] font-extrabold uppercase tracking-wider">
                        {project.category}
                      </span>
                      <h2 className="text-3xl font-extrabold text-foreground mt-2">
                        {project.title}
                      </h2>
                      <p className="text-xs text-muted italic -mt-2 font-medium">
                        {project.tagline}
                      </p>

                      <div className="border-t border-border/65 pt-6 space-y-4">
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-accent" />
                          Business Impact
                        </h4>
                        <p className="text-sm font-bold text-foreground leading-relaxed">
                          {project.impact}
                        </p>
                      </div>

                      <div className="border-t border-border/65 pt-6">
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5 mb-3">
                          <Server className="h-4 w-4 text-accent" />
                          Technology Stack
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-md bg-background border border-border text-[11px] text-muted font-semibold hover:border-accent hover:text-accent transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Problem & Solution Details */}
                  <div className={`lg:col-span-7 space-y-8 ${isEven ? "" : "lg:order-1"}`}>
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-accent uppercase tracking-widest">The Problem</h3>
                      <p className="text-foreground text-sm sm:text-base leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-accent uppercase tracking-widest">The Solution</h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    <div className="pt-4 flex gap-4">
                      <Link href="/contact">
                        <Button variant="primary" size="sm">
                          Discuss Similar Project
                        </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </div>
  );
}

import { ShieldCheck, Cloud, Cpu, Code, CheckCircle, Sparkles, Server } from "lucide-react";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";
import Link from "next/link";

export const metadata = {
  title: "Solutions | Enterprise Technology Integrations",
  description: "Explore our corporate solutions in Cloud Infrastructure, AI Systems, Enterprise Architecture, and legacy migrations.",
};

export default function SolutionsPage() {
  const solutionsList = [
    {
      id: "enterprise",
      title: "Enterprise Architecture",
      desc: "Robust, decoupled application designs capable of scaling horizontally to support millions of active connections. We build workflows tailored for security-first corporate compliance and auditing rules.",
      icon: ShieldCheck,
      features: [
        "Distributed Microservices (Go, Node.js, Python)",
        "Rigid API Gateway Integrations & Sanitization",
        "Role-Based Access Management (RBAC) & OAuth",
        "Continuous Audits & Security Orchestrations"
      ]
    },
    {
      id: "cloud",
      title: "Cloud Infrastructure & DevOps",
      desc: "Comprehensive cloud migration and cost optimization using modern DevOps frameworks. We package applications in isolated Docker containers, orchestrating them using Kubernetes under multi-cloud configurations.",
      icon: Cloud,
      features: [
        "AWS, GCP & Azure Cloud Deployments",
        "Docker Containerization & Kubernetes Clusters",
        "CI/CD Pipelines (GitHub Actions, Jenkins)",
        "High-Availability Redis & PostgreSQL Configurations"
      ]
    },
    {
      id: "ai",
      title: "AI Integration & Data Science",
      desc: "Optimize business efficiency through machine learning models. We build custom retrieval augmented generation (RAG) models, predictive data models, and natural language interfaces to automate backoffice operations.",
      icon: Cpu,
      features: [
        "LLM Fine-Tuning & Custom RAG Pipelines",
        "Predictive Modeling (FastAPI, PyTorch)",
        "Natural Language Processing (NLP) Chatbots",
        "Vector Databases (Pinecone, pgvector)"
      ]
    },
    {
      id: "transformation",
      title: "Digital Transformation & Migrations",
      desc: "Breathe new life into legacy tech. We migrate legacy WordPress, PHP, or ASP.NET projects to high-performance, edge-rendered Next.js layouts, reducing page loading latencies by up to 80%.",
      icon: Code,
      features: [
        "Legacy to Next.js + React Migrations",
        "Static and Incremental Regeneration (ISR)",
        "Database Architecture & Normalization",
        "SEO Optimization & Analytics Instrumentation"
      ]
    }
  ];

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4" />
            Corporate Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-6">
            Enterprise Technology Integrations
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We build and optimize high-throughput cloud architectures, secure API layers, and AI automations designed for government departments, large corporations, and startups.
          </p>
        </div>

        {/* Detailed Solutions Section */}
        <div className="space-y-16">
          {solutionsList.map((sol, idx) => {
            const Icon = sol.icon;
            const isEven = idx % 2 === 0;

            return (
              <section
                key={sol.id}
                id={sol.id}
                className={`scroll-mt-24 rounded-3xl p-8 sm:p-12 card-border bg-surface/50 backdrop-blur-sm ${
                  isEven ? "" : "bg-surface"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Info Column */}
                  <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-2"}`}>
                    <div className="p-3.5 rounded-2xl bg-accent/10 text-accent w-fit mb-6 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      {sol.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed mb-6">
                      {sol.desc}
                    </p>
                    <Link href="/contact">
                      <Button variant="primary" size="sm">
                        Consult Our Architect
                      </Button>
                    </Link>
                  </div>

                  {/* Checklist Column */}
                  <div className={`lg:col-span-6 ${isEven ? "" : "lg:order-1"}`}>
                    <div className="bg-background rounded-2xl border border-border p-6 sm:p-8 space-y-4">
                      <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest flex items-center gap-1.5">
                        <Server className="h-4 w-4 text-accent" />
                        Technical Deliverables
                      </h3>
                      
                      <div className="space-y-3 pt-2">
                        {sol.features.map((feat, fidx) => (
                          <div
                            key={fidx}
                            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface transition-colors"
                          >
                            <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                            <span className="text-foreground text-xs sm:text-sm font-medium">
                              {feat}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
}

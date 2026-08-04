import { Briefcase, MapPin, Clock, Calendar, Star, Sparkles } from "lucide-react";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";
import Link from "next/link";

export const metadata = {
  title: "Careers | Join Our Engineering Team",
  description: "Explore career opportunities at Binary Infotech. We are looking for senior Next.js, Python, and cloud infrastructure engineers.",
};

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Next.js & React Architect",
      dept: "Frontend Engineering",
      location: "HQ (Hybrid) / Remote (India)",
      experience: "5+ Years",
      type: "Full-Time",
      description: "Lead the migration of enterprise client architectures from legacy CMS databases to edge-rendered, static-hybrid Next.js and Tailwind CSS platforms. Experience with React 19, Turbopack, and advanced CSS compilers required.",
    },
    {
      title: "Cloud Infrastructure & DevOps Lead",
      dept: "DevOps & Cloud Systems",
      location: "Remote (Global)",
      experience: "6+ Years",
      type: "Full-Time",
      description: "Design and maintain high-throughput Kubernetes clusters and CI/CD automation pipelines for government and financial clients. Expert-level knowledge of AWS S3, IAM, Docker, and multi-tenant PostgreSQL replication needed.",
    },
    {
      title: "Full-Stack Python / Golang Developer",
      dept: "Backend Engineering",
      location: "HQ (Hybrid)",
      experience: "3+ Years",
      type: "Full-Time",
      description: "Build secure, asynchronous microservices and API gateways using FastAPI, Django, or Go. Integrate vector search indexes (Pinecone/pgvector) and cache layers using Redis cluster parameters.",
    }
  ];

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 right-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Briefcase className="h-4 w-4" />
            Careers
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-6">
            Build the Future of Enterprise Software
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We are looking for detail-oriented software engineers and cloud architects passionate about clean layouts, sub-second compile times, and secure distributed logic.
          </p>
        </div>

        {/* Corporate Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl border border-border bg-surface/40">
            <span className="p-2 bg-accent/15 text-accent rounded-lg inline-block mb-4 text-xs font-bold uppercase tracking-wider">
              01 / MINDSET
            </span>
            <h3 className="text-sm font-bold text-foreground mb-2">Engineering First</h3>
            <p className="text-xs text-muted leading-relaxed">
              We value architectural decisions over ad-hoc hacks. We allocate time to refactoring, type-checking, and layout profiling to guarantee quality.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-surface/40">
            <span className="p-2 bg-accent/15 text-accent rounded-lg inline-block mb-4 text-xs font-bold uppercase tracking-wider">
              02 / LOCATION
            </span>
            <h3 className="text-sm font-bold text-foreground mb-2">Global Flexibility</h3>
            <p className="text-xs text-muted leading-relaxed">
              Work from our modern collaborative offices in India, or coordinate from your home workspace under hybrid/remote configurations.
            </p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-surface/40">
            <span className="p-2 bg-accent/15 text-accent rounded-lg inline-block mb-4 text-xs font-bold uppercase tracking-wider">
              03 / GROWTH
            </span>
            <h3 className="text-sm font-bold text-foreground mb-2">Advanced Stacks</h3>
            <p className="text-xs text-muted leading-relaxed">
              Never get stuck on legacy PHP code. Train and deploy platforms using React Server Components, vector analytics, and cloud clusters.
            </p>
          </div>
        </div>

        {/* Job Openings List */}
        <section className="space-y-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-bold text-foreground">Open Positions</h2>
          </div>

          <div className="space-y-6">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-surface/50 p-6 sm:p-8 space-y-6 card-border"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                    <span className="text-xs text-accent font-semibold">{job.dept}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-[10px] font-extrabold uppercase tracking-wider text-muted">
                    <span className="flex items-center gap-1 bg-background border border-border px-2.5 py-1 rounded-full">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 bg-background border border-border px-2.5 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1 bg-background border border-border px-2.5 py-1 rounded-full">
                      <Star className="h-3 w-3 animate-pulse text-brand-teal" />
                      {job.experience}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {job.description}
                </p>

                <div className="pt-2">
                  <a
                    href={`mailto:careers@binaries.org.in?subject=Application for ${job.title}`}
                    className="glow-btn inline-flex items-center justify-center px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-brand-indigo to-brand-violet hover:scale-[1.01] transition-transform"
                  >
                    Apply for Position
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

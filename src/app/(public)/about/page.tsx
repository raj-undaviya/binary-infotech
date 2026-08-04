import { MessageSquare, BookOpen, Layers, CheckCircle2, Rocket, Settings2, Sparkles, Code } from "lucide-react";
import Card from "@/components/design-system/Card";

export const metadata = {
  title: "About Us | Binary Infotech",
  description: "Learn about our engineering principles, heritage since 2001, and our rigid 6-stage systems development lifecycle.",
};

export default function AboutPage() {
  const steps = [
    {
      title: "Chat",
      icon: MessageSquare,
      color: "text-accent bg-accent/10",
      description: "We start by having an open conversation to understand your needs, goals, and expectations. This sets the foundation for a solution that aligns with your vision.",
    },
    {
      title: "Learn",
      icon: BookOpen,
      color: "text-secondary bg-secondary/10",
      description: "We research your target market and your field. We study what your competitors are doing and find strategies to place your platform on top.",
    },
    {
      title: "Create",
      icon: Layers,
      color: "text-brand-teal bg-brand-teal/10",
      description: "Our dedicated coders, designers, and SEO experts build your website. You are kept in the loop the entire way through to ensure absolute satisfaction.",
    },
    {
      title: "Test",
      icon: CheckCircle2,
      color: "text-red-400 bg-red-400/10",
      description: "Our rigorous quality control team tests the final product to ensure no bugs or layout errors survive launch day, providing flawless performance.",
    },
    {
      title: "Launch",
      icon: Rocket,
      color: "text-brand-emerald bg-brand-emerald/10",
      description: "We publish your application to production. We walk you through what we did, explaining how it works and how it benefits your target customers.",
    },
    {
      title: "Maintain",
      icon: Settings2,
      color: "text-amber-400 bg-amber-400/10",
      description: "We provide ongoing support through content updates, new feature releases, server checks, and whatever your business requires to stay on top.",
    },
  ];

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4" />
            Corporate Profile
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-6">
            Engineering-First Development Heritage
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Binary Infotech is a corporate software development agency. Established with a vision to empower organizations through secure, performant technologies, we construct tailored logic.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 max-w-6xl mx-auto">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Who We Are?</h2>
            <p className="text-muted text-sm leading-relaxed">
              Binary Infotech is a leading provider in custom web design, database programming, cloud automation, and SEO strategies. Operable in the technology space (with legacy operations spanning back to 2001), our focus remains on providing robust web applications, mobile platforms, and integrations that scale.
            </p>
            <p className="text-muted text-sm leading-relaxed">
              We started as a small start-up team, and we have seen tremendous growth. Today, we coordinate with government organizations, enterprise divisions, and startups to secure and scale their digital products.
            </p>
          </div>

          <div className="lg:col-span-6">
            <Card variant="default" className="space-y-6">
              <span className="text-[10px] font-mono text-accent font-bold">// heritage-index</span>
              <h3 className="text-lg font-bold text-foreground">Connecting Brands through Architectural Quality</h3>
              <p className="text-xs text-muted leading-relaxed">
                Whether migrating legacy WordPress backends to Next.js layouts, optimizing databases, or deploying AI routing algorithms, we maintain code standards and strict governance.
              </p>
              <div className="border-l-2 border-accent pl-4 text-xs text-muted italic">
                &ldquo;No matter what stage of digital migration your firm is in, our architects have the experience to guide you.&rdquo;
              </div>
            </Card>
          </div>
        </div>

        {/* Development Lifecycle */}
        <div className="border-t border-border/40 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Our SDLC</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">6-Stage Systems Engineering Lifecycle</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Card key={idx} variant="hoverable" className="flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-4">
                      <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                      <div className={`p-2 rounded-lg ${step.color}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{step.description}</p>
                  </div>
                  <span className="text-[9px] font-mono text-muted mt-4 block">// STAGE 0{idx + 1}</span>
                </Card>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

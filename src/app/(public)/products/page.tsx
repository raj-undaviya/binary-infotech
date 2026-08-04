import { Code, Server, ShieldCheck, ArrowRight, Layers, Database, Sparkles, Check } from "lucide-react";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";
import Link from "next/link";

export const metadata = {
  title: "Flagship Products & SaaS | Binary Infotech",
  description: "Explore FileNova - our flagship secure enterprise collaboration portal, along with our upcoming product pipeline.",
};

export default function ProductsPage() {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      desc: "For growing engineering teams requiring secure file distributions.",
      features: ["Up to 10 active developers", "100 GB Secure storage", "Basic audit logs (30 days)", "Standard API keys"],
    },
    {
      name: "Enterprise Core",
      price: "$299",
      period: "per month",
      desc: "Comprehensive tools for global corporate engineering divisions.",
      features: [
        "Unlimited active developers",
        "2 TB Secure CAD storage",
        "Granular audit logs & histories (1 year)",
        "SSO, RBAC & custom credentials",
        "Dedicated cloud database backups",
        "Priority 24/7 technical support",
      ],
      featured: true,
    },
    {
      name: "Government Cloud",
      price: "Custom",
      period: "annual contract",
      desc: "Rigid security deployments for regulatory and military sectors.",
      features: [
        "Dedicated isolated cloud partition",
        "Unlimited storage & connection threads",
        "Permanent write-once audit histories",
        "HIPAA, FedRAMP & SOC 2 compliance",
        "On-premise hybrid database fallback",
        "Dedicated account manager",
      ],
    },
  ];

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/10 right-1/10 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Flagship Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4" />
            Flagship Product
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-6">
            Meet FileNova
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            Enterprise-grade secure file collaboration and 3D CAD distribution for high-security manufacturing, architectural, and aerospace clients.
          </p>
        </div>

        {/* Product Visual Showcase Section */}
        <section className="rounded-3xl border border-border bg-surface/50 backdrop-blur-sm p-8 sm:p-12 mb-24 max-w-6xl mx-auto card-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="px-2.5 py-1 rounded bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                Flagship SaaS
              </span>
              <h2 className="text-3xl font-bold text-foreground">
                Secure Collaboration. Speed-Optimized.
              </h2>
              <p className="text-muted text-sm leading-relaxed">
                FileNova resolves file sharing bottlenecks by using multipart streaming algorithms, slicing massive CAD drawings and architectural renders into secure encrypted chunks that stream simultaneously to edge data vaults.
              </p>
              
              <ul className="space-y-3.5">
                {[
                  "100% Granular Audit Logs & access logs",
                  "AES-256 local encryption on write cycles",
                  "Integrations with Slack, Microsoft Teams & Jira",
                  "Zero file size limit support for CAD/3D binaries"
                ].map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs font-bold text-foreground">
                    <Check className="h-4 w-4 text-accent" />
                    {feat}
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex gap-4">
                <Link href="/contact">
                  <Button variant="primary" size="sm">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Simulated UI graphic */}
            <div className="lg:col-span-6 bg-slate-950 rounded-2xl border border-border p-6 shadow-2xl relative aspect-[4/3] flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <span className="text-[10px] font-mono text-brand-teal flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                  filenova-secure-vault
                </span>
                <span className="text-[9px] font-mono text-slate-500">v2.4.1</span>
              </div>
              
              <div className="space-y-3 flex-grow justify-center flex flex-col">
                <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-white">EngineDesign_Final.cad</span>
                  <span className="text-[10px] text-brand-teal">Synced (0.4s)</span>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-white">SitePlan_Phase2.dwg</span>
                  <span className="text-[10px] text-brand-teal">Synced (0.8s)</span>
                </div>
                <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">SecurityAuditHistory.log</span>
                  <span className="text-[10px] text-slate-500">Writing...</span>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 text-[9px] font-mono text-slate-400">
                // System check: AES-256 enabled. SSL secure.
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Grid */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">FileNova Licensing Plans</h2>
            <p className="text-muted text-xs sm:text-sm mt-2">Choose the optimal configuration for your engineering division.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border flex flex-col justify-between transition-all duration-300 relative ${
                  plan.featured
                    ? "border-accent bg-surface/80 shadow-md scale-105"
                    : "border-border bg-surface/30"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </span>
                )}
                
                <div>
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">{plan.name}</h3>
                  <p className="text-xs text-muted leading-relaxed mb-6">{plan.desc}</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                    <span className="text-xs text-muted">{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-xs text-foreground">
                        <Check className="h-4.5 w-4.5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact" className="w-full">
                  <Button variant={plan.featured ? "secondary" : "outline"} className="w-full text-xs py-3">
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Future Pipeline Placeholders */}
        <section className="border-t border-border pt-20">
          <div className="text-center mb-12">
            <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Future Pipeline</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">SaaS Development Roadmap</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl p-6 border border-border bg-surface/35 flex gap-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent h-fit">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  CogniFuel Core
                  <span className="px-2 py-0.5 rounded bg-muted/15 text-muted text-[8px] font-bold">R&amp;D</span>
                </h3>
                <p className="text-[11px] text-muted leading-relaxed">
                  Logistics and fleet routing cost optimizations API built on PyTorch, calculating optimal delivery parameters using historical and weather telemetry.
                </p>
              </div>
            </div>

            <div className="rounded-2xl p-6 border border-border bg-surface/35 flex gap-4">
              <div className="p-3 rounded-lg bg-accent/10 text-accent h-fit">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-foreground uppercase tracking-widest mb-1.5 flex items-center gap-2">
                  Binary Gate
                  <span className="px-2 py-0.5 rounded bg-muted/15 text-muted text-[8px] font-bold">Concept</span>
                </h3>
                <p className="text-[11px] text-muted leading-relaxed">
                  Decoupled API gateway validator and access control manager enforcing RBAC policies, JWT rotations, and encryption logs for cloud services.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

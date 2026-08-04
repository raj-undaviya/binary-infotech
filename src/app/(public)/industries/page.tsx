import { Shield, Sparkles, Building2, HeartPulse, Landmark, Truck, ShieldAlert, Cpu } from "lucide-react";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";
import Link from "next/link";

export const metadata = {
  title: "Industries | Enterprise Software Verticals",
  description: "Learn how Binary Infotech engineers compliant software for Healthcare, Finance, Logistics, Government, and SaaS sectors.",
};

export default function IndustriesPage() {
  const industries = [
    {
      name: "Healthcare",
      icon: HeartPulse,
      desc: "HIPAA-compliant telemedicine applications and secure database partitions for patient records. We build secure HL7 pathways mapping to clinical records.",
      highlight: "HIPAA Compliant",
    },
    {
      name: "Finance & Fintech",
      icon: Landmark,
      desc: "High-frequency trade ledgers, transactional safety, and fraud telemetry. Encrypted pipelines handling complex OAuth and banking authentication API flows.",
      highlight: "Bank-Grade Encryption",
    },
    {
      name: "Logistics & Fleet",
      icon: Truck,
      desc: "Fleet coordination, spatial routing engine optimizations, and delivery logs. Dynamic updates connecting warehouse telemetry to mobile courier apps.",
      highlight: "Real-Time Telemetry",
    },
    {
      name: "Government",
      icon: Building2,
      desc: "Accessibility compliant (WCAG) public portals and high-scale registration portals. Decoupled databases securing citizen profiles with FedRAMP compliance.",
      highlight: "FedRAMP & A11y Ready",
    },
    {
      name: "SaaS & Tech Startups",
      icon: Cpu,
      desc: "Rapid mvp compilation, Next.js static builds for marketing pages, Stripe checkout flows, and decoupled microservices architectures to scale.",
      highlight: "Stripe & Next.js scaling",
    },
    {
      name: "Retail & E-commerce",
      icon: ShieldAlert,
      desc: "Headless shopping systems built on Next.js ISR, handles high visitor counts during sales, integrating vector searches and product database synchronization.",
      highlight: "Sub-Second page loads",
    },
  ];

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Building2 className="h-4 w-4" />
            Vertical Focus
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-6">
            Engineered Verticals for Compliant Sectors
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We understand sector-specific compliance. We build applications designed to meet strict regulatory audits while providing sub-second load times.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <Card key={ind.name} variant="hoverable" className="flex flex-col justify-between h-[280px]">
                <div>
                  <div className="flex items-center justify-between border-b border-border/40 pb-4 mb-4">
                    <h3 className="text-sm font-extrabold text-foreground">{ind.name}</h3>
                    <div className="p-2 rounded bg-accent/10 text-accent">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
                
                <div className="border-t border-border/40 pt-4 flex items-center justify-between text-[9px] font-extrabold uppercase tracking-widest">
                  <span className="text-brand-teal">{ind.highlight}</span>
                  <Link href="/contact" className="text-accent hover:underline flex items-center gap-1">
                    Details
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
export const ArrowRight = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

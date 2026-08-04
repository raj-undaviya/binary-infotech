import { getServices } from "@/lib/db";
import Link from "next/link";
import { 
  Code, 
  Layers, 
  Smartphone, 
  Gamepad, 
  Gamepad2,
  Play, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Server
} from "lucide-react";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";

export const metadata = {
  title: "Services & Capabilities | Binary Infotech",
  description: "Explore our detailed software engineering capabilities including custom web development, mobile apps, UI/UX designs, and digital marketing.",
};

const iconMap: Record<string, any> = {
  Code,
  Palette: Layers,
  Smartphone,
  Gamepad,
  Play: Gamepad2,
  TrendingUp,
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/10 right-1/10 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="h-4 w-4" />
            Capabilities Directory
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mt-2 mb-6">
            Detailed Software Engineering Services
          </h1>
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            We build and optimize high-throughput architectures, native mobile platforms, and interactive gaming engines tailored for modern organizations.
          </p>
        </div>

        {/* Categories jump anchors */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-16 max-w-4xl mx-auto">
          {services.map((svc) => (
            <a
              key={svc.id}
              href={`#${svc.id}`}
              className="px-4 py-2.5 rounded-full text-xs font-bold text-muted bg-surface border border-border hover:border-accent hover:text-accent transition-colors"
            >
              {svc.title}
            </a>
          ))}
        </div>

        {/* Services Detail List */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {services.map((svc, idx) => {
            const Icon = iconMap[svc.icon] || Code;
            const isEven = idx % 2 === 0;

            return (
              <section
                key={svc.id}
                id={svc.id}
                className={`scroll-mt-24 rounded-3xl p-8 sm:p-12 card-border bg-surface/50 backdrop-blur-sm ${
                  isEven ? "" : "bg-surface"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Info Column */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="p-3 rounded-xl bg-accent/15 text-accent w-fit shadow-sm">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {svc.title}
                    </h2>
                    <p className="text-muted text-sm leading-relaxed">
                      {svc.description}
                    </p>
                    <Link href="/contact">
                      <Button variant="primary" size="sm">
                        Consult Our Engineers
                      </Button>
                    </Link>
                  </div>

                  {/* Features Column */}
                  <div className="lg:col-span-7 bg-background rounded-2xl border border-border p-6 sm:p-8 space-y-4">
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5 mb-4">
                      <Server className="h-4 w-4 text-accent" />
                      Core Capabilities
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {svc.features.map((feat, fidx) => (
                        <div
                          key={fidx}
                          className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-surface transition-colors"
                        >
                          <CheckCircle className="h-4.5 w-4.5 text-accent flex-shrink-0 mt-0.5" />
                          <span className="text-foreground text-xs sm:text-sm font-medium">
                            {feat}
                          </span>
                        </div>
                      ))}
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

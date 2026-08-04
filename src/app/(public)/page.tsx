import Link from "next/link";
import { getPosts, getServices } from "@/lib/db";
import { 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Award, 
  Code, 
  Layers, 
  Smartphone, 
  Play, 
  Gamepad,
  Gamepad2,
  TrendingUp, 
  Users, 
  Coffee, 
  Trophy, 
  CheckCircle,
  Calendar,
  User,
  Activity,
  Server,
  Fingerprint,
  Compass,
  FileCheck,
  Package,
  Wrench,
  Settings,
  HelpCircle,
  Quote,
  Briefcase,
  Wallet,
  ShoppingBag,
  Building,
  GraduationCap,
  Truck,
  Home
} from "lucide-react";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";
import InteractiveTimeline from "@/components/InteractiveTimeline";

// Icon mapper for dynamic services
const iconMap: Record<string, any> = {
  Code,
  Palette: Layers,
  Smartphone,
  Gamepad,
  Play: Gamepad2,
  TrendingUp,
};

export default async function HomePage() {
  const posts = (await getPosts()).slice(0, 3); // Get latest 3 posts
  const services = await getServices();

  const whyChooseUs = [
    { title: "Engineering-First Mindset", desc: "We prioritize clean algorithms, typed parameters, and layout performance profiles over fast, fragile shortcuts.", icon: Code },
    { title: "Scalable Architecture", desc: "Our decoupled microservices compile instantly and handle horizontal traffic surges on serverless clusters.", icon: Layers },
    { title: "Cloud Native", desc: "Orchestrated Docker environments utilizing Kubernetes pods for resilient, multi-region cloud safety.", icon: Server },
    { title: "AI-Powered Automation", desc: "Custom prediction models and vector search integration to optimize backoffice operations.", icon: Cpu },
    { title: "Security Focused", desc: "Strict RBAC compliance, end-to-end data encryption, and HIPAA/SOC2 compliant databases.", icon: Fingerprint },
    { title: "Long-Term Partnership", desc: "We support products post-launch, providing server updates, maintenance, and analytics.", icon: Users },
  ];

  const processTimeline = [
    { stage: "Discovery", desc: "Discuss goals, audit legacy scopes, and establish project parameters.", icon: Compass },
    { stage: "Planning", desc: "Build detailed interactive wireframes, normal schemas, and task backlogs.", icon: FileCheck },
    { stage: "Design", desc: "Iterate custom design prototypes, HSL color system, and typographies.", icon: Layers },
    { stage: "Development", desc: "Write type-safe frontend components and robust API connection handlers.", icon: Code },
    { stage: "Testing", desc: "Execute automated unit testing and end-to-end user navigation checks.", icon: ShieldCheck },
    { stage: "Deployment", desc: "Package containers and release static builds to edge cloud CDNs.", icon: Package },
    { stage: "Support", desc: "Track errors in production, scale resources, and release feature iterations.", icon: Wrench },
  ];

  const techCategories = [
    { title: "Frontend", techs: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Redux"] },
    { title: "Backend", techs: ["Node.js", "FastAPI", "Django", "Golang", "Python"] },
    { title: "Cloud & DevOps", techs: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Terraform"] },
    { title: "AI & Databases", techs: ["PyTorch", "Pinecone", "PostgreSQL", "MongoDB", "Redis"] },
  ];

  const industries = [
    { name: "Healthcare", icon: Activity },
    { name: "Finance & Fintech", icon: Wallet },
    { name: "Retail & E-commerce", icon: ShoppingBag },
    { name: "Manufacturing", icon: Settings },
    { name: "Government", icon: Building },
    { name: "Education", icon: GraduationCap },
    { name: "Logistics & Fleet", icon: Truck },
    { name: "Real Estate", icon: Home },
    { name: "SaaS & Tech Startups", icon: Cpu },
  ];

  const stats = [
    { label: "Completed Projects", value: "350+", icon: Trophy },
    { label: "Technologies Maintained", value: "32+", icon: Cpu },
    { label: "Senior Developers", value: "48+", icon: Users },
    { label: "Years of Experience", value: "25+", icon: Award },
  ];

  const trustedTech = [
    "React", "Next.js", "Node.js", "Python", "Django", "FastAPI", 
    "AWS", "Docker", "Kubernetes", "Redis", "PostgreSQL", "MongoDB", "TypeScript"
  ];

  return (
    <div className="relative w-full bg-background text-foreground">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg-pattern opacity-40 pointer-events-none" />
      
      {/* Decorative colored blobs */}
      <div className="absolute top-[-5%] left-[-5%] w-[45%] h-[45%] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[25%] right-[-5%] w-[40%] h-[40%] bg-highlight/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
              <Activity className="h-4 w-4" />
              Engineering Digital Excellence
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              Empowering Enterprise through{" "}
              <span className="text-gradient bg-gradient-to-r from-accent via-secondary to-highlight">
                Digital Excellence
              </span>
            </h1>
            
            <p className="text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
              We build scalable software, cloud platforms, AI solutions, and enterprise applications that empower businesses through technology. Certified engineers and security-first compliance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/contact">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Let&apos;s Build Together
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  View Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero graphic */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] aspect-square rounded-3xl bg-surface border border-border p-6 shadow-xl flex flex-col justify-between relative overflow-hidden card-border bg-gradient-to-br from-surface to-background">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full filter blur-xl" />
              
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <span className="text-xs font-mono text-accent font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  architecture-pipeline
                </span>
                <span className="text-[10px] font-mono text-muted">v4.0.0</span>
              </div>
              
              <div className="space-y-4 py-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-accent/15 text-accent flex items-center justify-center font-bold text-xs">
                    CS
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Next.js Edge Hydration</h4>
                    <p className="text-[10px] text-muted">Prerendered via Cloud CDN (0.2s)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-brand-teal/15 text-brand-teal flex items-center justify-center font-bold text-xs">
                    DB
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">PostgreSQL Replication</h4>
                    <p className="text-[10px] text-muted">Active pool: 12 shards synced</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-red-400/15 text-red-400 flex items-center justify-center font-bold text-xs">
                    ML
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-foreground">RAG Telemetry Models</h4>
                    <p className="text-[10px] text-muted">Semantic accuracy index: 98.4%</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/40 pt-4 flex items-center justify-between text-[10px] text-muted font-semibold">
                <span>FedRAMP Compliance: OK</span>
                <span>Audit Logs: Active</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* TRUSTED TECHNOLOGIES TICKER */}
      <section className="py-10 border-y border-border bg-surface/50 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted">
            Engineered with Industry Standards
          </span>
        </div>
        <div className="flex whitespace-nowrap overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          
          <div className="flex gap-16 animate-marquee">
            {trustedTech.concat(trustedTech).map((tech, idx) => (
              <span
                key={idx}
                className="text-sm font-extrabold text-muted hover:text-foreground transition-colors font-mono cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BINARY INFOTECH */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Why Binary Infotech</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Built for Performance &amp; Trust</h2>
          <p className="text-muted text-xs sm:text-sm mt-3">
            We merge corporate accountability with bleeding-edge technology to build elite digital platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyChooseUs.map((w, idx) => {
            const Icon = w.icon;
            return (
              <Card key={idx} variant="hoverable" className="space-y-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent w-fit mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">{w.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{w.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 md:py-16 bg-surface/50 border-y border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Check our Services</h2>
            </div>
            <Link
              href="/service"
              className="text-accent hover:text-secondary text-xs font-bold flex items-center gap-1 mt-4 md:mt-0 transition-colors"
            >
              View Full Directory
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => {
              const Icon = iconMap[svc.icon] || Code;
              return (
                <Card key={svc.id} variant="hoverable" className="flex flex-col justify-between min-h-[300px]">
                  <div>
                    <div className="p-3 rounded-xl bg-accent/15 text-accent w-fit mb-6">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-3">{svc.title}</h3>
                    <p className="text-xs text-muted leading-relaxed mb-6">{svc.description}</p>
                  </div>
                  
                  <div className="border-t border-border/40 pt-4 mt-auto space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {svc.features.slice(0, 2).map((f, fidx) => (
                        <span key={fidx} className="text-[9px] font-bold text-muted bg-surface border border-border px-2.5 py-1 rounded-md">
                          {f.split(":")[0]}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/10">
                      <span className="text-[9px] text-muted font-bold font-mono">// Ready</span>
                      <Link
                        href={`/service#${svc.id}`}
                        className="text-xs font-bold text-accent hover:text-secondary flex items-center gap-1 group transition-colors"
                      >
                        Read Details
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRODUCTS HIGHLIGHT (FileNova) */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest">SaaS Products</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Flagship Solutions</h2>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 max-w-5xl mx-auto card-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="px-2.5 py-1 rounded bg-accent/10 text-accent text-[9px] font-extrabold uppercase tracking-widest">
                Flagship Platform
              </span>
              <h3 className="text-3xl font-extrabold text-foreground">FileNova Secure Collaboration</h3>
              <p className="text-muted text-sm leading-relaxed">
                A secure web portal facilitating CAD file shares, multi-tenant databases, and sub-second chunked uploads built specifically for engineering and manufacturing sectors.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-bold text-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  AES-256 local encryption
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  SSO &amp; RBAC access controls
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  S3 multipart edge servers
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  Permanent audit histories
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Link href="/products">
                  <Button variant="primary" size="sm">
                    Explore FileNova Plans
                  </Button>
                </Link>
              </div>
            </div>

            {/* Graphic */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-border p-6 shadow-2xl relative aspect-[4/3] flex flex-col justify-between overflow-hidden">
              <span className="text-[10px] font-mono text-brand-teal">// filenova-vault</span>
              <div className="space-y-2 flex-grow justify-center flex flex-col">
                <div className="bg-white/5 rounded-lg p-2 flex items-center justify-between text-xs text-white">
                  <span>EngineDesign_3D.cad</span>
                  <span className="text-brand-teal text-[10px]">Synced</span>
                </div>
                <div className="bg-white/5 rounded-lg p-2 flex items-center justify-between text-xs text-white">
                  <span>SitePlan_Final.dwg</span>
                  <span className="text-brand-teal text-[10px]">Synced</span>
                </div>
              </div>
              <span className="text-[9px] font-mono text-slate-500">// Audit Logs: SECURE</span>
            </div>

          </div>
        </div>
      </section>

      {/* PORTFOLIO HIGHLIGHT */}
      <section className="py-12 md:py-16 bg-surface/30 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Case Studies</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Latest Work in Production</h2>
            </div>
            <Link
              href="/portfolio"
              className="text-accent hover:text-secondary text-xs font-bold flex items-center gap-1 mt-4 md:mt-0 transition-colors"
            >
              Explore Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "FileNova Secure Portal", tag: "SaaS Product", desc: "Multipart file synchronization latencies reduced by 72% for aerospace firms.", link: "/portfolio#filenova" },
              { title: "CogniFuel AI Analytics", tag: "AI & Data Science", desc: "Saved 14.2% on fuel costs and optimized route logistics via FastAPI pipelines.", link: "/portfolio#cognifuel-ai" },
              { title: "Radhe Imitations eStore", tag: "Headless E-commerce", desc: "Reduced page load time to 0.8s and boosted conversion rates by 38.4%.", link: "/portfolio#radhe-jewels" },
            ].map((p, idx) => (
              <Card key={idx} variant="hoverable" className="flex flex-col justify-between h-[240px]">
                <div>
                  <span className="text-[10px] font-extrabold text-accent uppercase tracking-wider block mb-2">{p.tag}</span>
                  <h3 className="text-base font-bold text-foreground mb-3">{p.title}</h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-3">{p.desc}</p>
                </div>
                <Link
                  href={p.link}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1 mt-4 w-fit"
                >
                  Read Case Study
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE / PROCESS */}
      <section className="py-12 md:py-16 relative z-10 overflow-x-clip bg-background">
        <InteractiveTimeline />
      </section>

      {/* TECH STACK GRID */}
      <section className="py-12 md:py-16 bg-surface/50 border-y border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Ecosystem</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Interactive Technology Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {techCategories.map((cat, idx) => (
              <div key={idx} className="bg-background border border-border rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-widest border-b border-border/40 pb-3">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2 pt-2">
                  {cat.techs.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded bg-surface border border-border text-[10px] text-muted font-bold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Industries</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Vertical Domain Expertise</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div 
                key={idx} 
                className="bg-surface/50 border border-border p-5 rounded-xl flex items-center gap-4 hover:border-accent/40 hover:bg-surface transition-all shadow-sm group"
              >
                <div className="p-2.5 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">{ind.name}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* STATISTICS */}
      <section className="py-20 bg-primary text-background relative z-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg-pattern opacity-10 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="mx-auto p-2.5 bg-background/10 text-background rounded-lg w-fit">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-4xl font-extrabold text-background">{s.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-background/60">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TESTIMONIALS SLIDER */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">What Our Clients Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { quote: "Binary Infotech rebuilt our legacy software stack into Next.js. Page loading speeds dropped to 0.8 seconds and conversions jumped. Excellent engineering team.", author: "CEO, Radhe imit.", role: "Retail Sector" },
            { quote: "Their FileNova platform has revolutionized how our distributed design teams share large CAD binary files. High compliance, absolute security governance.", author: "Engineering Director", role: "Aerospace Client" },
            { quote: "FastAPI and AI pipelines developed by Binary Infotech automated 85% of our monthly dispatcher decisions, optimizing routing. A trusted long-term IT partner.", author: "Logistics Lead", role: "Supply Chain Group" }
          ].map((t, idx) => (
            <div key={idx} className="bg-surface border border-border p-8 rounded-2xl flex flex-col justify-between relative">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-border/40 pointer-events-none" />
              <p className="text-xs text-muted italic leading-relaxed mb-6 relative z-10">&ldquo;{t.quote}&rdquo;</p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-border/40 mt-auto">
                <div className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center font-bold text-xs">
                  {t.author[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground">{t.author}</h4>
                  <p className="text-[9px] text-muted uppercase font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG PREVIEWS */}
      <section className="py-12 md:py-16 bg-surface/30 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Blog Post</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2">Latest Insights</h2>
            </div>
            <Link
              href="/blog"
              className="text-accent hover:text-secondary text-xs font-bold flex items-center gap-1 mt-4 md:mt-0 transition-colors"
            >
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} variant="hoverable" className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[10px] text-muted font-bold mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-accent/10 text-accent text-[9px]">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3 hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-6">
                    {post.summary}
                  </p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1 mt-auto w-fit"
                >
                  Read Post
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center relative z-10 border-t border-border/40">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-6">
          Let&apos;s Engineer Something Exceptional Together.
        </h2>
        <p className="text-muted text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Get in touch with our solutions architects to discuss cloud orchestration, custom SaaS development, or API gateways.
        </p>
        <Link href="/contact">
          <Button variant="primary" size="lg">
            Let&apos;s Build Together
          </Button>
        </Link>
      </section>
    </div>
  );
}

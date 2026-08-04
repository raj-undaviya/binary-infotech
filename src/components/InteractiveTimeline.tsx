"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Compass, 
  FileCheck, 
  Layers, 
  Code, 
  ShieldCheck, 
  Package, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Database,
  Cpu,
  Monitor,
  Lock,
  Cloud,
  Activity,
  Network
} from "lucide-react";

interface TimelineStep {
  stage: string;
  desc: string;
  icon: any;
  deliverables: string[];
}

const stepsData: TimelineStep[] = [
  {
    stage: "Discovery",
    desc: "Discuss goals, audit legacy scopes, and establish project parameters.",
    icon: Compass,
    deliverables: ["Legacy codebase structural audit", "Hosting & server cost assessment", "Detailed scope outline specifications"],
  },
  {
    stage: "Planning",
    desc: "Build detailed interactive wireframes, normal database schemas, and task backlogs.",
    icon: FileCheck,
    deliverables: ["Entity Relationship Normalization", "Rest API schema mapping", "Sprint backlog task creation"],
  },
  {
    stage: "Design",
    desc: "Iterate custom design prototypes, HSL color system variables, and responsive typographies.",
    icon: Layers,
    deliverables: ["Figma interactive high-fi wireframe", "Responsive design tokens", "Dark/Light palette mapping"],
  },
  {
    stage: "Development",
    desc: "Write type-safe frontend components and robust API connection handlers.",
    icon: Code,
    deliverables: ["React Server Component layouts", "Responsive Tailwind styling", "Type-safe database transactions"],
  },
  {
    stage: "Testing",
    desc: "Execute automated unit testing and end-to-end user navigation checks.",
    icon: ShieldCheck,
    deliverables: ["Jest function unit assertions", "Playwright end-to-end flows", "Accessibility & contrast audits"],
  },
  {
    stage: "Deployment",
    desc: "Package containers and release static builds to edge cloud CDNs.",
    icon: Package,
    deliverables: ["Docker container optimization", "Vercel edge network caching", "Continuous Delivery integration"],
  },
  {
    stage: "Support",
    desc: "Track errors in production, scale resources, and release feature iterations.",
    icon: Wrench,
    deliverables: ["Sentry production logging", "Performance bottlenecks tuning", "Regular library dependencies updates"],
  }
];

export default function InteractiveTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // If we are smooth scrolling programmatically, ignore manual updates
      if (isScrollingRef.current) {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 150);
        return;
      }

      if (!containerRef.current) return;
      
      // Determine if viewport is on tablet/desktop threshold (768px+)
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      if (!isDesktop) return;

      const rect = containerRef.current.getBoundingClientRect();
      const elementHeight = rect.height;
      
      // Cross-browser client height calculation
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      
      const totalRange = elementHeight - windowHeight;
      const current = -rect.top;
      
      let progress = 0;
      if (totalRange > 0 && current >= 0) {
        progress = current / totalRange;
        progress = Math.min(Math.max(0, progress), 1);
      }
      
      setScrollProgress(progress);
      
      const stepCount = stepsData.length;
      const stepIndex = Math.min(
        Math.floor(progress * stepCount),
        stepCount - 1
      );
      setActiveStep(stepIndex);
    };

    // Attach scroll listener to document in capturing phase to capture scroll in any custom setups
    document.addEventListener("scroll", handleScroll, { capture: true, passive: true });
    handleScroll();
    
    return () => {
      document.removeEventListener("scroll", handleScroll, { capture: true });
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const elementHeight = rect.height;
    
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const totalRange = elementHeight - windowHeight;

    const stepRange = 1 / stepsData.length;
    const stepProgress = idx * stepRange + stepRange / 2;

    // Cross-browser scroll position retrieval
    const currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    const elementDocTop = rect.top + currentScrollY;
    const targetScrollY = elementDocTop + stepProgress * totalRange;

    isScrollingRef.current = true;
    setScrollProgress(stepProgress);

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 300);
  };

  // Continuous animation calculations for Apple AirPods Pro assembly
  const baseRotation = scrollProgress * 360;
  const gridTranslateY = Math.max(0, 120 - scrollProgress * 300);
  const gridOpacity = Math.min(1, scrollProgress * 3.5);

  const dbProgress = Math.min(Math.max(0, (scrollProgress - 0.05) / 0.25), 1);
  const dbY = 160 - dbProgress * 160;
  const dbScale = 0.5 + dbProgress * 0.5;
  const dbOpacity = dbProgress;

  const uiProgress = Math.min(Math.max(0, (scrollProgress - 0.2) / 0.25), 1);
  const uiX = 180 - uiProgress * 180;
  const uiY = -120 + uiProgress * 120;
  const uiRotate = 45 - uiProgress * 45;
  const uiOpacity = uiProgress;

  const cpuProgress = Math.min(Math.max(0, (scrollProgress - 0.35) / 0.25), 1);
  const cpuX = -180 + cpuProgress * 180;
  const cpuScale = 0.4 + cpuProgress * 0.6;
  const cpuOpacity = cpuProgress;

  const shieldProgress = Math.min(Math.max(0, (scrollProgress - 0.5) / 0.25), 1);
  const shieldScale = shieldProgress * 1.1;
  const shieldOpacity = shieldProgress;

  const cloudProgress = Math.min(Math.max(0, (scrollProgress - 0.65) / 0.25), 1);
  const cloudY = 100 - cloudProgress * 180;
  const cloudOpacity = cloudProgress;

  const supportProgress = Math.min(Math.max(0, (scrollProgress - 0.8) / 0.2), 1);
  const supportOpacity = supportProgress;

  const step = stepsData[activeStep];
  const StepIcon = step.icon;

  return (
    <div ref={containerRef} className="relative h-auto md:h-[200vh] -mx-4 sm:-mx-6 lg:-mx-8">
      
      {/* Sticky full-screen scrub container */}
      <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-center items-center bg-background px-4 sm:px-6 lg:px-8 overflow-hidden z-20 md:pt-16">
        
        <div className="max-w-7xl w-full mx-auto flex flex-col gap-6 py-6">

          {/* Section title (Rendered inside sticky viewport to prevent detachment) */}
          <div className="text-center max-w-2xl mx-auto hidden md:block mb-2">
            <span className="text-accent text-[10px] font-extrabold uppercase tracking-widest">Our Methodology</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
              7-Stage Lifecycle Development
            </h2>
            <p className="text-muted text-[11px] font-semibold mt-1.5 max-w-xl mx-auto leading-relaxed">
              We guide every project through our comprehensive engineering stages to ensure high-performance execution.
            </p>
          </div>

          {/* Step Navigation Selector (Horizontal track) */}
          <div className="relative hidden md:block py-4">
            <div className="absolute top-1/2 left-[5%] right-[5%] h-px bg-border -translate-y-1/2 z-0" />
            
            <div 
              className="absolute top-1/2 left-[5%] h-0.5 bg-accent -translate-y-1/2 z-0 transition-all duration-350" 
              style={{ width: `${scrollProgress * 90}%` }}
            />

            <div className="flex justify-between relative z-10">
              {stepsData.map((s, idx) => {
                const DotIcon = s.icon;
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleStepClick(idx)}
                    className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                  >
                    <div 
                      className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-350 ${
                        isActive 
                          ? "bg-accent border-accent text-white scale-110 shadow-sm" 
                          : isCompleted 
                            ? "bg-background border-accent text-accent" 
                            : "bg-background border-border text-muted hover:border-accent hover:text-foreground"
                      }`}
                    >
                      <DotIcon className="h-4 w-4" />
                    </div>
                    <span 
                      className={`text-[9px] font-extrabold uppercase tracking-widest transition-colors ${
                        isActive ? "text-accent" : "text-muted group-hover:text-foreground"
                      }`}
                    >
                      {s.stage}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile/Tablet Step Buttons Selector */}
          <div className="flex flex-wrap gap-2 md:hidden justify-center mb-4">
            {stepsData.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer ${
                  idx === activeStep
                    ? "bg-accent text-white"
                    : "bg-surface border border-border text-muted hover:text-foreground"
                }`}
              >
                0{idx + 1}. {s.stage}
              </button>
            ))}
          </div>

          {/* Detailed Content Panel (Dual column) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full">
            
            {/* Info panel */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6 md:pr-8">
              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded bg-accent/15 text-accent text-[9px] font-extrabold uppercase tracking-widest w-fit block font-mono">
                  Stage 0{activeStep + 1} / 07
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight uppercase">
                  {step.stage}
                </h3>
                <p className="text-muted text-xs sm:text-sm leading-relaxed font-semibold">
                  {step.desc}
                </p>
              </div>

              {/* Key deliverables checklists */}
              <div className="space-y-3">
                <span className="text-[10px] font-extrabold text-foreground uppercase tracking-widest block border-b border-border/40 pb-1.5">
                  Key Deliverables
                </span>
                <ul className="space-y-2">
                  {step.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-muted font-medium">
                      <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Navigation controls */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                <button
                  onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="px-3 py-1.5 rounded-lg border border-border text-[10px] font-bold text-muted hover:text-foreground hover:bg-background transition-colors disabled:opacity-30 cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={() => handleStepClick(Math.min(stepsData.length - 1, activeStep + 1))}
                  disabled={activeStep === stepsData.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-accent text-white text-[10px] font-bold hover:bg-secondary transition-colors disabled:opacity-30 flex items-center gap-1 cursor-pointer"
                >
                  Next Stage
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Interactive 3D Assembly Panel (Apple AirPods Pro inspired) */}
            <div className="md:col-span-6 flex flex-col h-[320px] md:h-[450px] w-full bg-slate-950 border border-dark-border/40 rounded-3xl overflow-hidden shadow-lg relative items-center justify-center">
              
              {/* Background Grid Pattern (Isometric depth look) */}
              <div 
                className="absolute inset-0 grid-bg-pattern opacity-10 pointer-events-none transition-transform duration-200" 
                style={{
                  transform: `perspective(500px) rotateX(60deg) translateY(${gridTranslateY}px)`,
                  opacity: gridOpacity * 0.15
                }}
              />

              {/* Stage Indicator Graphic (Orbiter) */}
              <div 
                className="absolute border border-dashed border-accent/20 rounded-full w-56 h-56 flex items-center justify-center pointer-events-none"
                style={{ transform: `rotate(${baseRotation}deg)` }}
              >
                <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 rounded-full bg-accent animate-ping" />
                <span className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-accent" />
              </div>

              {/* PART 1: The Database Cylinder (Planning) */}
              <div 
                className="absolute flex flex-col items-center gap-1.5 z-10 transition-all duration-350"
                style={{
                  transform: `translateY(${dbY}px) scale(${dbScale})`,
                  opacity: dbOpacity
                }}
              >
                <div className="p-4 rounded-2xl bg-accent text-white shadow-xl shadow-accent/20 flex items-center justify-center">
                  <Database className="h-7 w-7" />
                </div>
                <span className="text-[8px] font-mono text-[#ffffff] font-bold uppercase tracking-widest bg-accent px-2 py-0.5 rounded">
                  Database Core
                </span>
              </div>

              {/* PART 2: UI Frontplate Screen (Design) */}
              <div 
                className="absolute flex flex-col items-center gap-1.5 z-20 transition-all duration-350"
                style={{
                  transform: `translateX(${uiX}px) translateY(${uiY}px) rotate(${uiRotate}deg)`,
                  opacity: uiOpacity
                }}
              >
                <div className="p-4 rounded-2xl bg-[#6366f1] border border-white/10 text-white shadow-xl flex items-center justify-center backdrop-blur-md bg-opacity-80">
                  <Monitor className="h-7 w-7" />
                </div>
                <span className="text-[8px] font-mono text-[#ffffff] font-bold uppercase tracking-widest bg-[#6366f1] px-2 py-0.5 rounded">
                  UI Screen
                </span>
              </div>

              {/* PART 3: Logic Micro-core (Development) */}
              <div 
                className="absolute flex flex-col items-center gap-1.5 z-30 transition-all duration-350"
                style={{
                  transform: `translateX(${cpuX}px) scale(${cpuScale})`,
                  opacity: cpuOpacity
                }}
              >
                <div className="p-4 rounded-2xl bg-[#ec4899] text-white shadow-xl shadow-[#ec4899]/20 flex items-center justify-center">
                  <Cpu className="h-7 w-7" />
                </div>
                <span className="text-[8px] font-mono text-[#ffffff] font-bold uppercase tracking-widest bg-[#ec4899] px-2 py-0.5 rounded">
                  API Logic
                </span>
              </div>

              {/* PART 4: Secure Testing Dome (Testing) */}
              <div 
                className="absolute border border-[#10b981] rounded-full flex items-center justify-center pointer-events-none transition-all duration-500 z-0"
                style={{
                  width: `${130 * shieldScale}px`,
                  height: `${130 * shieldScale}px`,
                  opacity: shieldOpacity * 0.25,
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
                  borderWidth: "2px"
                }}
              >
                <Lock className="h-6 w-6 text-[#10b981] animate-pulse" />
              </div>

              {/* PART 5: Cloud Deployment Stack (Deployment) */}
              <div 
                className="absolute flex flex-col items-center gap-1 z-40 transition-all duration-350"
                style={{
                  transform: `translateY(${cloudY}px)`,
                  opacity: cloudOpacity
                }}
              >
                <div className="p-4 rounded-full bg-[#3b82f6] text-white shadow-xl shadow-[#3b82f6]/20 flex items-center justify-center animate-bounce">
                  <Cloud className="h-7 w-7" />
                </div>
                <span className="text-[8px] font-mono text-[#ffffff] font-bold uppercase tracking-widest bg-[#3b82f6] px-2 py-0.5 mb-5 rounded">
                  Edge Node
                </span>
              </div>

              {/* PART 6: Concentric Support Waves (Support) */}
              {activeStep === 6 && (
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500"
                  style={{ opacity: supportOpacity }}
                >
                  <div className="w-20 h-20 rounded-full border border-accent/40 animate-ping absolute" />
                  <div className="w-36 h-36 rounded-full border border-accent/20 animate-ping absolute" style={{ animationDelay: "0.5s" }} />
                  <Activity className="h-7 w-7 text-accent animate-pulse" />
                </div>
              )}

              {/* Active Stage Label Overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-dark-border/40 font-mono text-[9px] font-bold text-slate-300">
                <Network className="h-3.5 w-3.5 text-accent animate-spin-slow" />
                <span>MODULE_ASSEMBLY: {step.stage.toUpperCase()}</span>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

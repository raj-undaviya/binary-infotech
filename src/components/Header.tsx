"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Search, 
  Globe, 
  Sun, 
  Moon, 
  ChevronDown, 
  Code, 
  Database, 
  Cloud, 
  Cpu, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import Button from "./design-system/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<"services" | "solutions" | null>(null);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize Dark Mode based on document class
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark") || 
                     localStorage.getItem("theme") === "dark";
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  };

  // Close mega menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMegaMenu = (menu: "services" | "solutions") => {
    setResourcesOpen(false);
    setActiveMegaMenu(activeMegaMenu === menu ? null : menu);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Products", href: "/products" },
    { name: "Technologies", href: "/technologies" },
    { name: "Industries", href: "/industries" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ];

  const servicesMega = [
    { title: "Web Development", desc: "Enterprise websites & API development.", icon: Code, href: "/service#web-development" },
    { title: "UI/UX Design Services", desc: "User journeys & corporate branding.", icon: Layers, href: "/service#web-design-services" },
    { title: "Mobile App Development", desc: "iOS, Android, & Flutter applications.", icon: Cpu, href: "/service#mobile-app-development" },
    { title: "Game Engineering", desc: "Cross-platform multiplayer engine design.", icon: Database, href: "/service#game-development" },
  ];

  const solutionsMega = [
    { title: "Enterprise Architecture", desc: "Scalable infrastructures for global firms.", icon: ShieldCheck, href: "/solutions#enterprise" },
    { title: "Cloud Optimization", desc: "Docker, Kubernetes, AWS migration.", icon: Cloud, href: "/solutions#cloud" },
    { title: "AI Integration", desc: "Deep learning & LLM automation.", icon: Cpu, href: "/solutions#ai" },
    { title: "Digital Transformation", desc: "Moving legacy projects to modern tech.", icon: Code, href: "/solutions#transformation" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || activeMegaMenu || mobileMenuOpen
            ? "py-4 header-blur border-b border-border/80"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.png"
                alt="Binary Infotech Logo"
                className="h-8 w-auto hover:scale-[1.02] transition-transform duration-300 dark:brightness-110"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {/* Services Mega Menu Trigger */}
              <div className="relative">
                <button
                  onClick={() => toggleMegaMenu("services")}
                  className={`text-xs font-semibold flex items-center gap-1 hover:text-accent transition-colors cursor-pointer ${
                    activeMegaMenu === "services" ? "text-accent" : "text-muted"
                  }`}
                >
                  Services
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMegaMenu === "services" ? "rotate-185" : ""}`} />
                </button>
              </div>

              {/* Solutions Mega Menu Trigger */}
              <div className="relative">
                <button
                  onClick={() => toggleMegaMenu("solutions")}
                  className={`text-xs font-semibold flex items-center gap-1 hover:text-accent transition-colors cursor-pointer ${
                    activeMegaMenu === "solutions" ? "text-accent" : "text-muted"
                  }`}
                >
                  Solutions
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeMegaMenu === "solutions" ? "rotate-185" : ""}`} />
                </button>
              </div>

              <Link
                href="/products"
                className={`text-xs font-semibold hover:text-accent transition-colors ${
                  pathname.startsWith("/products") ? "text-accent" : "text-muted"
                }`}
              >
                Products
              </Link>

              <Link
                href="/portfolio"
                className={`text-xs font-semibold hover:text-accent transition-colors ${
                  pathname.startsWith("/portfolio") ? "text-accent" : "text-muted"
                }`}
              >
                Portfolio
              </Link>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  setResourcesOpen(true);
                  setActiveMegaMenu(null);
                }}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <button
                  onClick={() => {
                    setResourcesOpen(!resourcesOpen);
                    setActiveMegaMenu(null);
                  }}
                  className={`text-xs font-semibold flex items-center gap-1 hover:text-accent transition-colors cursor-pointer ${
                    resourcesOpen ? "text-accent" : "text-muted"
                  }`}
                >
                  Resources
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? "rotate-185" : ""}`} />
                </button>
                
                {resourcesOpen && (
                  <div className="absolute left-0 mt-2 w-48 rounded-xl bg-background border border-border shadow-lg p-2 z-50">
                    <Link
                      href="/technologies"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-muted hover:text-accent hover:bg-surface transition-colors"
                      onClick={() => setResourcesOpen(false)}
                    >
                      Technologies
                    </Link>
                    <Link
                      href="/industries"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-muted hover:text-accent hover:bg-surface transition-colors"
                      onClick={() => setResourcesOpen(false)}
                    >
                      Industries
                    </Link>
                    <Link
                      href="/blog"
                      className="block px-3 py-2 rounded-lg text-xs font-semibold text-muted hover:text-accent hover:bg-surface transition-colors"
                      onClick={() => setResourcesOpen(false)}
                    >
                      Blog
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/careers"
                className={`text-xs font-semibold hover:text-accent transition-colors ${
                  pathname.startsWith("/careers") ? "text-accent" : "text-muted"
                }`}
              >
                Careers
              </Link>

              <Link
                href="/about"
                className={`text-xs font-semibold hover:text-accent transition-colors ${
                  pathname === "/about" ? "text-accent" : "text-muted"
                }`}
              >
                About
              </Link>
            </nav>

            {/* Action Bar Links (Search, Dark Mode, Language, CTA) */}
            <div className="hidden lg:flex items-center gap-4">
              
              {/* Search Toggle */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
              >
                <Search className="h-4.5 w-4.5" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-muted hover:text-foreground hover:bg-surface cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                  {currentLang}
                </button>
                {languageOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-surface border border-border rounded-xl shadow-lg p-1.5 z-50">
                    {["EN", "DE", "FR", "IN"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setCurrentLang(lang);
                          setLanguageOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-muted hover:text-foreground hover:bg-border/30"
                      >
                        {lang === "IN" ? "Hindi (IN)" : lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer"
              >
                {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>

              {/* CTA */}
              <Link href="/contact">
                <Button variant="primary" size="sm">
                  Let&apos;s Build Together
                </Button>
              </Link>

            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex xl:hidden items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-muted hover:text-foreground hover:bg-surface transition-colors"
              >
                {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-muted hover:text-foreground hover:bg-surface transition-colors"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mega Menu Dropdowns (Desktop) */}
        {activeMegaMenu && (
          <div
            ref={megaMenuRef}
            className="absolute top-full left-0 right-0 bg-background border-b border-border/80 shadow-xl z-40 py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-down"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
              
              {/* Highlight card */}
              <div className="col-span-4 bg-surface rounded-2xl p-6 border border-border flex flex-col justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-accent/15 text-accent text-[10px] font-bold uppercase tracking-wider">
                    Featured Capability
                  </span>
                  <h3 className="text-base font-bold text-foreground mt-3 mb-2">
                    {activeMegaMenu === "services" ? "Full Lifecycle Software" : "AI & Cloud Scaling"}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed">
                    {activeMegaMenu === "services"
                      ? "From wireframing and concept boards to compilation and ongoing devops maintenance, we handle it all."
                      : "Empower your services with deep learning, serverless edge networks, and Postgres database scaling."}
                  </p>
                </div>
                
                <Link
                  href={activeMegaMenu === "services" ? "/service" : "/solutions"}
                  onClick={() => setActiveMegaMenu(null)}
                  className="text-xs font-bold text-accent hover:text-accent/90 flex items-center gap-1 mt-6"
                >
                  Explore Overview
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Items Grid */}
              <div className="col-span-8 grid grid-cols-2 gap-6">
                {(activeMegaMenu === "services" ? servicesMega : solutionsMega).map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setActiveMegaMenu(null)}
                      className="p-4 rounded-xl hover:bg-surface border border-transparent hover:border-border transition-all flex items-start gap-4"
                    >
                      <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-foreground mb-1">{item.title}</h4>
                        <p className="text-[11px] text-muted leading-relaxed">{item.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* Search overlay dropdown */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg p-4 z-45">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Search resources, technologies, case studies..."
                className="w-full bg-transparent border-none text-foreground focus:outline-none text-sm py-2"
                autoFocus
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="text-xs font-bold text-muted hover:text-foreground"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-18 bg-background z-40 border-t border-border flex flex-col p-6 space-y-6 overflow-y-auto">
          
          {/* Main Links */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted">Pages</h4>
            <div className="grid grid-cols-2 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-foreground hover:text-accent"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-border/40 pt-6 space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted">Capabilities</h4>
            <div className="grid grid-cols-1 gap-3">
              <Link
                href="/service"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-400 hover:text-white"
              >
                All Services
              </Link>
              <Link
                href="/solutions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-400 hover:text-white"
              >
                All Solutions
              </Link>
            </div>
          </div>

          {/* CTA Mobile */}
          <div className="pt-6 border-t border-border/40">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full">
                Let&apos;s Build Together
              </Button>
            </Link>
          </div>

        </div>
      )}
    </>
  );
}

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, Globe, Code, ArrowUpRight } from "lucide-react";
import { getSettings } from "@/lib/db";

export default async function Footer() {
  const settings = await getSettings();
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Web Development", href: "/service#web-development" },
    { name: "UI/UX Web Design", href: "/service#web-design-services" },
    { name: "Mobile App Development", href: "/service#mobile-app-development" },
    { name: "Game Engineering", href: "/service#game-development" },
    { name: "Digital Marketing", href: "/service#digital-marketing" },
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Case Studies", href: "/portfolio" },
    { name: "Careers", href: "/careers" },
    { name: "Blog Posts", href: "/blog" },
    { name: "Contact us", href: "/contact" },
  ];

  const resources = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/term-and-condition" },
  ];

  return (
    <footer className="bg-surface/20 border-t border-border/80 pt-20 pb-10 relative overflow-hidden">
      {/* Background ambient light highlights */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute -top-48 -left-48 w-96 h-96 bg-highlight/5 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter / CTA Banner Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 mb-16 border-b border-border/40 items-center">
          <div className="lg:col-span-7">
            <h3 className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">
              Ready to construct digital excellence?
            </h3>
            <p className="text-xs sm:text-sm text-muted mt-1 font-medium">
              Consult with our senior frontend architects and ML engineers to scale your operations.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="w-full">
              <button className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-accent text-white text-xs font-bold hover:bg-secondary transition-all cursor-pointer shadow-sm">
                Get Free Consultation
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Links Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Logo description Column (Col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <img
                src="/logo.png"
                alt="Binary Infotech Logo"
                className="h-8 w-auto hover:scale-[1.02] transition-transform duration-300 dark:brightness-110"
              />
            </Link>
            
            <p className="text-muted text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              We design and construct high-performance web platforms, secure API layers, and AI dispatch routing models for government departments, large corporations, and startups.
            </p>
            
            {/* Social handles */}
            <div className="flex items-center gap-3 pt-2">
              {settings.socialLinkedin && (
                <a 
                  href={settings.socialLinkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-full bg-background border border-border text-muted hover:text-foreground hover:border-accent hover:bg-surface/50 transition-all shadow-sm"
                  aria-label="LinkedIn"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              )}
              {settings.socialGithub && (
                <a 
                  href={settings.socialGithub} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2.5 rounded-full bg-background border border-border text-muted hover:text-foreground hover:border-accent hover:bg-surface/50 transition-all shadow-sm"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Services Column (Col span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-foreground font-extrabold text-[10px] uppercase tracking-widest">
              Our Capabilities
            </h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-foreground text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 group hover:translate-x-0.5"
                  >
                    <ArrowRight className="h-3 w-3 text-accent opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-foreground font-extrabold text-[10px] uppercase tracking-widest">
              Directory
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-foreground text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 group hover:translate-x-0.5"
                  >
                    <ArrowRight className="h-3 w-3 text-accent opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HQ Location & Details (Col span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-foreground font-extrabold text-[10px] uppercase tracking-widest">
              Corporate HQ
            </h3>
            <ul className="space-y-3 text-xs text-muted font-semibold">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-accent flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed whitespace-pre-line">{settings.contactAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-accent flex-shrink-0" />
                <a href={`tel:${settings.contactPhone.replace(/\s+/g, '')}`} className="hover:text-foreground transition-colors">
                  {settings.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-accent flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-foreground transition-colors">
                  {settings.contactEmail}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal links bar */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-muted font-medium">
            &copy; {currentYear} {settings.siteTitle}. {settings.siteTagline}. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] text-muted font-semibold">
            {resources.map((res, idx) => (
              <Link key={idx} href={res.href} className="hover:text-foreground transition-colors">
                {res.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

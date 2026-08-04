import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { getSettings } from "@/lib/db";
import Card from "@/components/design-system/Card";

export const metadata = {
  title: "Contact Us | Binary Infotech",
  description: "Get in touch with Binary Infotech for customized software development services, app building, and SEO audits.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  
  const contactDetails = [
    {
      title: "Office Address",
      value: settings.contactAddress,
      icon: MapPin,
    },
    {
      title: "Phone Number",
      value: settings.contactPhone,
      href: `tel:${settings.contactPhone.replace(/\s+/g, '')}`,
      icon: Phone,
    },
    {
      title: "Email Address",
      value: settings.contactEmail,
      href: `mailto:${settings.contactEmail}`,
      icon: Mail,
    },
    {
      title: "Business Hours",
      value: "Mon - Sat: 9:00 AM - 6:00 PM IST",
      icon: Clock,
    },
  ];

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-highlight/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Connect With Us</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground mt-2 mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-muted text-xs sm:text-base font-semibold leading-relaxed">
            We’re here to help and hear from you! Get in touch for customized development solutions, code refactoring, or product consulting.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Contact Info</h2>
              <p className="text-muted text-xs leading-relaxed font-semibold">
                Have an app concept or want to migrate a legacy WordPress site to high-performance modern Next.js templates? Write to us, and we will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              {contactDetails.map((detail, idx) => {
                const IconComp = detail.icon;
                return (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-surface/50 border border-border/80 shadow-sm">
                    <div className="p-3 rounded-lg bg-accent/10 text-accent h-fit">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-extrabold text-muted uppercase tracking-widest mb-1.5">
                        {detail.title}
                      </h4>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-xs sm:text-sm font-bold text-foreground hover:text-accent transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm font-bold text-foreground">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-5 rounded-2xl bg-accent/5 border border-accent/10 flex items-start gap-4 shadow-sm">
              <ShieldCheck className="h-6 w-6 text-accent flex-shrink-0" />
              <div>
                <h4 className="text-xs font-extrabold text-foreground mb-1 uppercase tracking-wider">NDA Supported</h4>
                <p className="text-muted text-[11px] leading-relaxed font-semibold">
                  We respect project confidentiality. If requested, we are fully prepared to execute a standard Non-Disclosure Agreement (NDA) before discussing specifications.
                </p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}

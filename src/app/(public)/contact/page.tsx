import ContactForm from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { getSettings } from "@/lib/db";

export const metadata = {
  title: "Contact Us",
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
    <div className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-brand-indigo/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-brand-violet/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-indigo text-xs font-bold uppercase tracking-widest">Connect With Us</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-2 mb-6">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Get in Touch – We’re Here to Help and Hear from You! Top-rated IT solutions we proudly deliver, driven by innovation, passion, and the pursuit of excellence.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Info</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Have an app concept or want to migrate a legacy WordPress site to high-performance modern Next.js templates? Write to us, and we will get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              {contactDetails.map((detail, idx) => {
                const IconComp = detail.icon;
                return (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-slate-900/40 border border-dark-border/40">
                    <div className="p-3 rounded-lg bg-brand-indigo/10 text-brand-indigo h-fit">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {detail.title}
                      </h4>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-sm sm:text-base font-semibold text-white hover:text-brand-indigo transition-colors"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-sm sm:text-base font-semibold text-white">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-5 rounded-2xl bg-brand-indigo/5 border border-brand-indigo/10 flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-brand-teal flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white mb-1">NDA Supported</h4>
                <p className="text-slate-400 text-xs leading-relaxed">
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

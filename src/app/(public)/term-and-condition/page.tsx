export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions of service for Binary Infotech.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="relative py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border/40">
        <h1 className="text-3xl font-extrabold text-white mb-6 border-b border-dark-border/40 pb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mb-4">Last Updated: August 2026</p>
        
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <p>
            By accessing or using the website of Binary Infotech (binaries.org.in), you agree to comply with and be bound by the following terms of service.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-2">1. Intellectual Property</h2>
          <p>
            All custom components, layouts, branding text, services catalogs, logos, graphics, and code architectures rendered on this website are the intellectual property of Binary Infotech, and cannot be duplicated or utilized without explicit permission.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-2">2. Accuracy of Content</h2>
          <p>
            While we strive to display accurate pricing, schedules, and technical descriptions, our online content does not represent a legally binding offer of service. Official contracts and deliverables are governed solely by signed Master Service Agreements (MSAs) or Statements of Work (SOWs).
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-2">3. Limitation of Liability</h2>
          <p>
            Binary Infotech will not be held responsible for server downtime, software bugs on external integrations, or loss of business data stemming from accessing this informational platform.
          </p>
        </div>
      </div>
    </div>
  );
}

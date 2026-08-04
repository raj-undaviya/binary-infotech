export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and terms of data usage for Binary Infotech.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-dark-border/40">
        <h1 className="text-3xl font-extrabold text-white mb-6 border-b border-dark-border/40 pb-4">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mb-4">Last Updated: August 2026</p>
        
        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <p>
            At Binary Infotech, we value and respect your privacy. This Privacy Policy details how we collect, store, and utilize details provided through our website (binaries.org.in).
          </p>
          
          <h2 className="text-xl font-bold text-white mt-8 mb-2">1. Information Collection</h2>
          <p>
            We collect personal details (such as name, email address, phone number, and message contents) voluntarily provided by you when submitting inquiries via our Contact Form or subscribing to our newsletters.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-2">2. How We Use Information</h2>
          <p>
            The details we collect are used strictly for responding to client inquiries, providing technical quotations, sending newsletter updates, and improving general website navigation performance. We do not sell or lease your personal details to third-party brokers.
          </p>

          <h2 className="text-xl font-bold text-white mt-8 mb-2">3. Data Protection & Security</h2>
          <p>
            We utilize standard security mechanisms to safeguard database files from unauthorized access or alteration. All connection requests are handled securely.
          </p>
        </div>
      </div>
    </div>
  );
}

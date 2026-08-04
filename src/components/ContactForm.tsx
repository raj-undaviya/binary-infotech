"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="glow-btn w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-brand-indigo to-brand-violet hover:scale-[1.01] transition-transform duration-300 shadow-md shadow-brand-indigo/15 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Sending Message...
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Send Message
        </>
      )}
    </button>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);

  async function handleAction(formData: FormData) {
    setStatus(null);
    const result = await submitContactForm(null, formData);
    
    if (result.success) {
      setStatus({ success: true, message: "Thank you! Your message has been sent successfully." });
      // Reset form fields
      const form = document.getElementById("contact-form-el") as HTMLFormElement;
      form?.reset();
    } else {
      setStatus({ success: false, message: result.error || "Something went wrong." });
    }
  }

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-dark-border/40 relative">
      <div className="absolute inset-0 bg-brand-indigo/5 rounded-2xl filter blur-xl pointer-events-none" />
      <h3 className="text-xl font-bold text-white mb-6">Send Us a Message</h3>

      <form id="contact-form-el" action={handleAction} className="space-y-5 relative z-10">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Your Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="John Doe"
            className="w-full bg-slate-900/60 border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Your Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="john@example.com"
            className="w-full bg-slate-900/60 border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Subject*
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            placeholder="Inquiry about web application migration"
            className="w-full bg-slate-900/60 border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Your Message (optional)*
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your project requirements..."
            className="w-full bg-slate-900/60 border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo transition-all resize-none"
          />
        </div>

        {status && (
          <div
            className={`p-4 rounded-xl flex items-start gap-3 border text-sm ${
              status.success
                ? "bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {status.success ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}

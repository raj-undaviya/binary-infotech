"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions";
import { 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  User, 
  Mail, 
  Info, 
  MessageSquare 
} from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs font-bold text-white bg-accent hover:bg-secondary active:scale-[0.99] hover:scale-[1.01] hover:shadow-lg hover:shadow-accent/15 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      {pending ? (
        <>
          <Loader2 className="h-4.5 w-4.5 animate-spin" />
          Sending Message...
        </>
      ) : (
        <>
          <Send className="h-4.5 w-4.5" />
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
      const form = document.getElementById("contact-form-el") as HTMLFormElement;
      form?.reset();
    } else {
      setStatus({ success: false, message: result.error || "Something went wrong." });
    }
  }

  return (
    <div className="bg-surface/50 border border-border/80 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative shadow-lg shadow-black/5 overflow-hidden">
      
      {/* Decorative inner ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full filter blur-[60px] pointer-events-none" />
      
      {/* Form Header */}
      <div className="mb-8 relative z-10">
        <span className="uppercase tracking-widest text-[9px] font-extrabold text-accent bg-accent/10 px-2.5 py-1 rounded-md w-fit">
          Direct Channel
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mt-3 tracking-tight">
          Send Us a Message
        </h3>
        <p className="text-xs text-muted font-medium mt-1">
          Tell us about your engineering requirements and our architects will reach out.
        </p>
      </div>

      <form id="contact-form-el" action={handleAction} className="space-y-6 relative z-10">
        
        {/* Name and Email 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
              Your Name*
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted h-4 w-4 pointer-events-none" />
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className="w-full pl-11 pr-4 py-3 bg-background border border-border/80 rounded-xl text-foreground text-xs placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
              Your Email*
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted h-4 w-4 pointer-events-none" />
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="john@example.com"
                className="w-full pl-11 pr-4 py-3 bg-background border border-border/80 rounded-xl text-foreground text-xs placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
            Subject*
          </label>
          <div className="relative">
            <Info className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted h-4 w-4 pointer-events-none" />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder="Inquiry about project estimate"
              className="w-full pl-11 pr-4 py-3 bg-background border border-border/80 rounded-xl text-foreground text-xs placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-300"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
            Your Message*
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3.5 top-4 text-muted h-4 w-4 pointer-events-none" />
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell us about your project requirements..."
              className="w-full pl-11 pr-4 py-3 bg-background border border-border/80 rounded-xl text-foreground text-xs placeholder:text-muted/60 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent/10 transition-all duration-300 resize-none h-36"
            />
          </div>
        </div>

        {/* Status Messages */}
        {status && (
          <div
            className={`p-4 rounded-xl flex items-start gap-3 border text-xs font-semibold relative overflow-hidden transition-all ${
              status.success
                ? "bg-accent/10 border-accent/20 text-accent"
                : "bg-red-500/10 border-red-500/20 text-red-500"
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

"use client";

import { useState } from "react";
import { saveSiteSettingsAction } from "@/app/actions";
import { SiteSettings } from "@/lib/db";
import { Settings, Save, Loader2, CheckCircle2 } from "lucide-react";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";

export default function AdminSettingsForm({ initialSettings }: { initialSettings: SiteSettings }) {
  const [formData, setFormData] = useState<SiteSettings>(initialSettings);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    setError(null);

    const result = await saveSiteSettingsAction(formData);
    setPending(false);

    if (result.success) {
      setMessage("Site configuration updated successfully!");
      // Fade out success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } else {
      setError("Failed to save settings.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      
      {/* Header and save bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Site Settings</h1>
          <p className="text-xs text-muted mt-1">
            Customize branding, meta taglines, corporate contact details, and social channels dynamically.
          </p>
        </div>
        
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={pending}
          className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold font-mono"
        >
          {pending ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-500 font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {message}
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-semibold">
          {error}
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Brand Metadata */}
        <Card variant="default" className="p-6 space-y-4">
          <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest border-b border-border/40 pb-3">
            Branding Configuration
          </h3>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
              Site Title
            </label>
            <input
              type="text"
              required
              value={formData.siteTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, siteTitle: e.target.value }))}
              placeholder="e.g. Binary Infotech"
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
              Site Tagline
            </label>
            <input
              type="text"
              required
              value={formData.siteTagline}
              onChange={(e) => setFormData(prev => ({ ...prev, siteTagline: e.target.value }))}
              placeholder="e.g. Engineering Digital Excellence"
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </Card>

        {/* Contact info */}
        <Card variant="default" className="p-6 space-y-4">
          <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest border-b border-border/40 pb-3">
            Contact Submissions Details
          </h3>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
              Contact Email
            </label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
              placeholder="e.g. info@binaries.org.in"
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
              Contact Phone
            </label>
            <input
              type="text"
              required
              value={formData.contactPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
              placeholder="e.g. +91 90999 76868"
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </Card>

        {/* Physical Location Address */}
        <Card variant="default" className="p-6 md:col-span-2 space-y-4">
          <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest border-b border-border/40 pb-3">
            Physical Headquarters Address
          </h3>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
              Office Address Text
            </label>
            <textarea
              required
              rows={3}
              value={formData.contactAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, contactAddress: e.target.value }))}
              placeholder="Enter full office physical address details"
              className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors resize-none"
            />
          </div>
        </Card>

        {/* Social Channels links */}
        <Card variant="default" className="p-6 md:col-span-2 space-y-4">
          <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest border-b border-border/40 pb-3">
            Social Profiles & Portals
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                LinkedIn Company Link
              </label>
              <input
                type="url"
                value={formData.socialLinkedin}
                onChange={(e) => setFormData(prev => ({ ...prev, socialLinkedin: e.target.value }))}
                placeholder="e.g. https://linkedin.com/company/..."
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                GitHub Repository Link
              </label>
              <input
                type="url"
                value={formData.socialGithub}
                onChange={(e) => setFormData(prev => ({ ...prev, socialGithub: e.target.value }))}
                placeholder="e.g. https://github.com/..."
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </Card>

      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { saveServiceAction } from "@/app/actions";
import { ServiceItem } from "@/lib/db";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      size="sm"
      disabled={pending}
      className="flex items-center gap-1.5 text-xs font-bold"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save Service
        </>
      )}
    </Button>
  );
}

export default function ServiceForm({ service }: { service?: ServiceItem }) {
  const router = useRouter();
  const [formData, setFormData] = useState<ServiceItem>({
    id: service?.id || "",
    title: service?.title || "",
    description: service?.description || "",
    features: service?.features || [""],
    icon: service?.icon || "Code",
  });
  
  const [error, setError] = useState<string | null>(null);

  const icons = [
    "Code",
    "Palette",
    "Smartphone",
    "Gamepad",
    "Play",
    "TrendingUp",
  ];

  function handleFeatureChange(index: number, value: string) {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData(prev => ({ ...prev, features: updated }));
  }

  function addFeature() {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }));
  }

  function removeFeature(index: number) {
    if (formData.features.length === 1) return;
    const updated = formData.features.filter((_, idx) => idx !== index);
    setFormData(prev => ({ ...prev, features: updated }));
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Clean up features
    const cleanFeatures = formData.features.map(f => f.trim()).filter(f => f !== "");
    if (cleanFeatures.length === 0) {
      setError("Please add at least one capability feature.");
      return;
    }

    // Auto-generate ID if new
    const finalId = formData.id.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (!finalId) {
      setError("A valid service title is required to generate a service ID.");
      return;
    }

    const result = await saveServiceAction({
      ...formData,
      id: finalId,
      features: cleanFeatures,
    });

    if (result.success) {
      router.push("/admin/services");
      router.refresh();
    } else {
      setError("Failed to save service.");
    }
  }

  return (
    <div className="space-y-6">
      
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground text-xs font-bold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Catalog
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/admin/services">
              <Button variant="outline" size="sm" type="button" className="text-xs font-bold">
                Cancel
              </Button>
            </Link>
            <SubmitButton />
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-555 mb-6 font-semibold text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Info */}
          <div className="lg:col-span-6">
            <Card variant="default" className="p-6 border border-border bg-surface/50 backdrop-blur-sm space-y-5">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest border-b border-border/40 pb-3">
                Service Catalog Info
              </h3>
              
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                  Service Title*
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Web Development"
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                    Service Icon Type*
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
                  >
                    {icons.map((ic) => (
                      <option key={ic} value={ic}>
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                    Service Slug ID (Optional)
                  </label>
                  <input
                    type="text"
                    disabled={!!service}
                    value={formData.id}
                    onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="Auto-generated if left blank"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                  Service Description Summary*
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide a brief summary outlining this service offering..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
            </Card>
          </div>

          {/* Features / Capability Bullets */}
          <div className="lg:col-span-6 space-y-6">
            <Card variant="default" className="p-6 border border-border bg-surface/50 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest">
                  Bullet Capabilities Features*
                </h3>
                <button
                  type="button"
                  onClick={addFeature}
                  className="inline-flex items-center gap-1 text-[10px] font-extrabold text-accent hover:text-secondary uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  Add Bullet
                </button>
              </div>

              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Bullet feature #${index + 1}`}
                      className="flex-grow bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
                    />
                    <button
                      type="button"
                      disabled={formData.features.length === 1}
                      onClick={() => removeFeature(index)}
                      className="p-2.5 text-muted hover:text-red-500 disabled:opacity-30 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      </form>
    </div>
  );
}

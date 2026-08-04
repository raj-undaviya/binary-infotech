"use client";

import { useState } from "react";
import { deleteServiceAction } from "@/app/actions";
import { ServiceItem } from "@/lib/db";
import { Plus, Trash2, Edit2, Wrench, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";

export default function AdminServicesList({ initialServices }: { initialServices: ServiceItem[] }) {
  const router = useRouter();
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this service? This will remove it from the public homepage and services directory!")) {
      return;
    }

    setIsDeleting(id);
    const result = await deleteServiceAction(id);
    setIsDeleting(null);

    if (result.success) {
      setServices(prev => prev.filter(s => s.id !== id));
      router.refresh();
    } else {
      alert("Failed to delete service.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Manage Services</h1>
          <p className="text-xs text-muted mt-1">
            Create, update, and manage services offered on the main homepage and pages.
          </p>
        </div>

        <Link href="/admin/services/new" className="self-start sm:self-auto">
          <Button variant="primary" size="sm" className="flex items-center gap-1.5 text-xs font-bold font-mono">
            <Plus className="h-4 w-4" />
            Add New Service
          </Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <Card variant="default" className="p-12 text-center flex flex-col items-center justify-center gap-3">
          <ShieldAlert className="h-8 w-8 text-muted" />
          <h3 className="text-sm font-bold text-foreground">No services found</h3>
          <p className="text-xs text-muted max-w-sm">
            Create your first service catalog page to show it dynamically on the homepage capabilities section.
          </p>
          <Link href="/admin/services/new" className="mt-2">
            <Button variant="outline" size="sm">
              Create Service Item
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <Card key={svc.id} variant="default" className="p-6 border border-border flex flex-col justify-between h-[250px] relative bg-surface/50">
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                    <Wrench className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[9px] font-mono text-muted bg-background border border-border px-2 py-0.5 rounded uppercase tracking-wider">
                    {svc.icon}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2 line-clamp-1">{svc.title}</h3>
                <p className="text-xs text-muted line-clamp-3 leading-relaxed mb-4">
                  {svc.description}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-border/40 mt-auto">
                <span className="text-[10px] text-muted font-bold font-mono">
                  {svc.features.length} features
                </span>
                
                <div className="flex items-center gap-1">
                  <Link href={`/admin/services/edit/${svc.id}`}>
                    <button
                      title="Edit Service"
                      className="p-2 text-muted hover:text-foreground hover:bg-background rounded-lg border border-transparent hover:border-border transition-colors cursor-pointer"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(svc.id)}
                    disabled={isDeleting === svc.id}
                    title="Delete Service"
                    className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-border transition-colors disabled:opacity-30 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import { checkAdminAuth } from "@/app/actions";
import { getServices } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import ServiceForm from "@/components/ServiceForm";

export const metadata = {
  title: "Edit Service | Binary Infotech Admin",
};

interface AdminEditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditServicePage({ params }: AdminEditServicePageProps) {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const resolvedParams = await params;
  const services = await getServices();
  const service = services.find((s) => s.id === resolvedParams.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Edit Service Details</h1>
        <p className="text-xs text-muted mt-1">
          Modify description, service category icon, and capability lists dynamically.
        </p>
      </div>

      <ServiceForm service={service} />
    </div>
  );
}

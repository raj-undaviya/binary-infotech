import { checkAdminAuth } from "@/app/actions";
import { redirect } from "next/navigation";
import ServiceForm from "@/components/ServiceForm";

export const metadata = {
  title: "Add New Service | Binary Infotech Admin",
};

export default async function AdminNewServicePage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Add New Service</h1>
        <p className="text-xs text-muted mt-1">
          Define capabilities, add bullet features, and publish instantly to the homepage grid.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}

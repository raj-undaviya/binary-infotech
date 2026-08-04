import { checkAdminAuth } from "@/app/actions";
import { getServices } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminServicesList from "@/components/AdminServicesList";

export const metadata = {
  title: "Manage Services | Binary Infotech Admin",
};

export default async function AdminServicesPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const services = await getServices();

  return <AdminServicesList initialServices={services} />;
}

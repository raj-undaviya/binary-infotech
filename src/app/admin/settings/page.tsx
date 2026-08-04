import { checkAdminAuth } from "@/app/actions";
import { getSettings } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminSettingsForm from "@/components/AdminSettingsForm";

export const metadata = {
  title: "Site Settings | Binary Infotech Admin",
};

export default async function AdminSettingsPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const settings = await getSettings();

  return <AdminSettingsForm initialSettings={settings} />;
}

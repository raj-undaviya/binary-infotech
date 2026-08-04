import { checkAdminAuth } from "@/app/actions";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/AdminLoginForm";

export const metadata = {
  title: "Admin Login | Binary Infotech",
  description: "Sign in to Binary Infotech admin panel to manage blogs and inbox messages.",
};

export default async function AdminLoginPage() {
  const isAuth = await checkAdminAuth();

  if (isAuth) {
    redirect("/admin/dashboard");
  }

  return <AdminLoginForm />;
}

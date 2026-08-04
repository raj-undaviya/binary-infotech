import { checkAdminAuth } from "@/app/actions";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const isAuth = await checkAdminAuth();
  
  if (isAuth) {
    redirect("/admin/dashboard");
  } else {
    redirect("/admin/login");
  }
}

import { checkAdminAuth } from "@/app/actions";
import { getContacts } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminContactsInbox from "@/components/AdminContactsInbox";

export default async function AdminContactsPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const contacts = await getContacts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Messages Inbox</h1>
        <p className="text-xs text-muted mt-1">
          Review, reply, archive, and manage contact submissions submitted through the website.
        </p>
      </div>

      {/* Inbox Component */}
      <AdminContactsInbox initialContacts={contacts} />
    </div>
  );
}

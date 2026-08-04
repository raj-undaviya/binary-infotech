import { checkAdminAuth, logoutAdmin } from "@/app/actions";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  Mail, 
  Globe, 
  LogOut, 
  Code,
  Sparkles,
  Settings,
  Wrench
} from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Binary Infotech",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    // Return standard centered box layout for the login screen
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="relative z-10 w-full max-w-md">
          {children}
        </div>
      </div>
    );
  }

  // Sidebar navigation layout for authenticated admins
  return (
    <div className="h-screen w-screen bg-background text-foreground flex flex-col md:flex-row relative overflow-hidden">
      {/* Background Graphic Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-highlight/5 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 h-auto md:h-full bg-surface/85 backdrop-blur-md border-b md:border-b-0 md:border-r border-border p-6 flex flex-col relative z-10 overflow-y-auto shrink-0">
        
        {/* Sidebar Brand Header */}
        <div className="flex items-center gap-2.5 mb-8">
          <img
            src="/icon.png"
            alt="Binary Infotech Logo"
            className="h-6 w-auto"
          />
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-foreground tracking-tight leading-none">
              Binary <span className="text-accent font-extrabold">Infotech</span>
            </span>
            <span className="text-[8px] uppercase tracking-widest text-muted font-extrabold mt-1">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1.5 flex-grow">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-background/80 transition-all text-xs font-bold border border-transparent hover:border-border"
          >
            <LayoutDashboard className="h-4 w-4 text-accent" />
            Dashboard
          </Link>
          <Link
            href="/admin/blogs"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-background/80 transition-all text-xs font-bold border border-transparent hover:border-border"
          >
            <BookOpen className="h-4 w-4 text-accent" />
            Manage Blogs
          </Link>
          <Link
            href="/admin/contacts"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-background/80 transition-all text-xs font-bold border border-transparent hover:border-border"
          >
            <Mail className="h-4 w-4 text-accent" />
            Inbox Messages
          </Link>
          <Link
            href="/admin/services"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-background/80 transition-all text-xs font-bold border border-transparent hover:border-border"
          >
            <Wrench className="h-4 w-4 text-accent" />
            Manage Services
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-background/80 transition-all text-xs font-bold border border-transparent hover:border-border"
          >
            <Settings className="h-4 w-4 text-accent" />
            Site Settings
          </Link>
          
          <div className="border-t border-border my-6" />

          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-background/80 transition-all text-[11px] font-bold border border-transparent hover:border-border"
          >
            <Globe className="h-4 w-4" />
            Visit Live Site
          </Link>
        </nav>

        {/* Logout container */}
        <form
          action={async () => {
            "use server";
            await logoutAdmin();
            redirect("/admin/login");
          }}
          className="mt-auto pt-6 border-t border-border"
        >
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-all text-xs font-bold cursor-pointer"
          >
            <LogOut className="h-4.5 w-4.5" />
            Log Out
          </button>
        </form>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 h-full overflow-y-auto p-6 sm:p-10 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}

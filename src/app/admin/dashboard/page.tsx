import { checkAdminAuth } from "@/app/actions";
import { getPosts, getContacts } from "@/lib/db";
import { redirect } from "next/navigation";
import { BookOpen, Eye, Mail, MessageSquare, Plus, ArrowRight, Activity, ShieldCheck } from "lucide-react";
import Link from "next/link";
import DashboardContacts from "@/components/DashboardContacts";
import Button from "@/components/design-system/Button";
import Card from "@/components/design-system/Card";

export default async function AdminDashboardPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const posts = await getPosts();
  const contacts = await getContacts();

  const totalPosts = posts.length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
  const totalMessages = contacts.length;
  const unreadMessages = contacts.filter((c) => !c.read).length;

  const statCards = [
    {
      title: "Total Blog Posts",
      value: totalPosts,
      icon: BookOpen,
      color: "text-accent bg-accent/10",
      description: "Articles published on live site",
    },
    {
      title: "Cumulative Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: "text-brand-teal bg-brand-teal/10",
      description: "Total readership statistics",
    },
    {
      title: "Contact Messages",
      value: totalMessages,
      icon: Mail,
      color: "text-violet-500 bg-violet-500/10",
      description: "Total submissions received",
    },
    {
      title: "Unread Messages",
      value: unreadMessages,
      icon: MessageSquare,
      color: unreadMessages > 0 ? "text-red-500 bg-red-500/10" : "text-muted bg-surface/50 border border-border",
      description: "Awaiting administrator response",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
        <div>
          <span className="text-accent text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 mb-1">
            <Activity className="h-4 w-4" />
            Operations Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">System Dashboard</h1>
          <p className="text-xs text-muted mt-1">
            Real-time operations database replacing legacy WordPress modules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/blogs/new">
            <Button variant="primary" size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Create New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const IconComp = stat.icon;
          return (
            <Card key={idx} variant="default" className="p-6 border border-border relative bg-surface/40 hover:scale-[1.01] transition-transform">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <IconComp className="h-4 w-4" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-foreground mb-1.5">{stat.value}</div>
              <p className="text-[10px] text-muted font-medium">{stat.description}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Inbox + Quick Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Inbox Manager */}
        <div className="lg:col-span-2">
          <DashboardContacts initialContacts={contacts} />
        </div>

        {/* Quick Operations Sidebar */}
        <div className="space-y-6">
          <Card variant="default" className="p-6 border border-border bg-surface/30">
            <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest mb-4">Quick Operations</h3>
            <div className="space-y-3">
              <Link
                href="/admin/blogs"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-background border border-border text-xs font-bold text-muted hover:text-foreground hover:border-accent transition-colors"
              >
                <span>Edit Blog Posts</span>
                <ArrowRight className="h-4 w-4 text-accent" />
              </Link>
              <Link
                href="/admin/contacts"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-background border border-border text-xs font-bold text-muted hover:text-foreground hover:border-accent transition-colors"
              >
                <span>View Full Message Archive</span>
                <ArrowRight className="h-4 w-4 text-accent" />
              </Link>
            </div>
          </Card>

          <Card variant="default" className="p-6 border border-border bg-surface/20 text-xs text-muted leading-relaxed font-medium">
            <span className="font-extrabold text-brand-teal uppercase tracking-wider flex items-center gap-1.5 mb-2">
              <ShieldCheck className="h-4 w-4" />
              Architectural Note
            </span>
            All modifications done inside this admin panel write directly to the local JSON schema file. Database query files (<code className="text-foreground bg-background border border-border px-1 py-0.5 rounded font-mono">src/lib/db.ts</code>) execute asynchronously on server execution scopes.
          </Card>
        </div>
      </div>
    </div>
  );
}

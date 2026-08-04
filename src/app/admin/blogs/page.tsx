import { checkAdminAuth } from "@/app/actions";
import { getPosts } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminBlogsList from "@/components/AdminBlogsList";

export default async function AdminBlogsPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const posts = await getPosts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Manage Blogs</h1>
        <p className="text-xs text-muted mt-1">
          Review, edit, publish, and delete blog articles across search categories.
        </p>
      </div>

      {/* Blogs list */}
      <AdminBlogsList initialPosts={posts} />
    </div>
  );
}

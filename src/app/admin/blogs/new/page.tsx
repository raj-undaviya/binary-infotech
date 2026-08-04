import { checkAdminAuth } from "@/app/actions";
import { redirect } from "next/navigation";
import BlogPostForm from "@/components/BlogPostForm";

export default async function AdminNewBlogPage() {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Create New Post</h1>
        <p className="text-xs text-muted mt-1">
          Draft a new article, compile details, and instantly add it to your website categories.
        </p>
      </div>

      {/* Editor Form */}
      <BlogPostForm />
    </div>
  );
}

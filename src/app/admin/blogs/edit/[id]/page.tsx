import { checkAdminAuth } from "@/app/actions";
import { getPosts } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import BlogPostForm from "@/components/BlogPostForm";

interface AdminEditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditBlogPage({ params }: AdminEditBlogPageProps) {
  const isAuth = await checkAdminAuth();

  if (!isAuth) {
    redirect("/admin/login");
  }

  const resolvedParams = await params;
  const posts = await getPosts();
  const post = posts.find((p) => p.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">Edit Blog Post</h1>
        <p className="text-xs text-muted mt-1">
          Modify details, fix content structure, and update the published article.
        </p>
      </div>

      {/* Editor Form */}
      <BlogPostForm post={post} />
    </div>
  );
}

"use client";

import { useState } from "react";
import { deleteBlogPost } from "@/app/actions";
import { BlogPost } from "@/lib/db";
import Link from "next/link";
import { Edit, Trash2, Calendar, Eye, Plus, ArrowUpRight, ShieldAlert } from "lucide-react";
import Card from "./design-system/Card";
import Button from "./design-system/Button";

export default function AdminBlogsList({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);

  async function handleDelete(id: string, title: string) {
    if (confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      const result = await deleteBlogPost(id);
      if (result.success) {
        setContacts(prev => prev.filter(p => p.id !== id));
      } else {
        alert("Failed to delete post.");
      }
    }
  }

  const setContacts = (fn: (prev: BlogPost[]) => BlogPost[]) => {
    setPosts(fn);
  };

  return (
    <Card variant="default" className="p-6 sm:p-8 border border-border bg-surface/50 backdrop-blur-sm card-border">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border-b border-border/40 pb-5">
        <div>
          <h3 className="text-sm font-extrabold text-foreground uppercase tracking-widest">Articles Directory</h3>
          <p className="text-[10px] text-muted font-bold mt-0.5">
            Total of {posts.length} published blogs and drafts.
          </p>
        </div>
        
        <Link href="/admin/blogs/new">
          <Button variant="primary" size="sm" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Create Blog Post
          </Button>
        </Link>
      </div>

      {posts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/40 text-[10px] font-extrabold text-muted uppercase tracking-wider pb-3">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Views</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20 text-xs">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-surface/60 transition-colors group">
                  <td className="py-4 px-4 font-bold text-foreground max-w-xs sm:max-w-sm">
                    <span className="line-clamp-1 flex items-center gap-1.5">
                      {post.title}
                      <Link href={`/blog/${post.slug}`} target="_blank" className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-bold">
                      {post.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted font-medium">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-muted font-medium">
                    <span className="flex items-center gap-1.5">
                      <Eye className="h-3.5 w-3.5 text-muted" />
                      {post.views || 0}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                      <Link
                        href={`/admin/blogs/edit/${post.id}`}
                        title="Edit post"
                        className="p-1.5 rounded text-muted hover:text-foreground hover:bg-background transition-colors border border-border"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        title="Delete post"
                        className="p-1.5 rounded text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors border border-border cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-muted text-xs font-medium flex flex-col items-center gap-2 justify-center">
          <ShieldAlert className="h-5 w-5 text-muted" />
          No articles found in your database. Click &ldquo;Create Blog Post&rdquo; to add your first post.
        </div>
      )}
    </Card>
  );
}

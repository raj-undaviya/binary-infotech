"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { saveBlogPost } from "@/app/actions";
import { BlogPost } from "@/lib/db";
import { ArrowLeft, Save, Eye, Edit, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./design-system/Button";
import Card from "./design-system/Card";

// Reuse the markdown parser for clientside rendering preview
function PreviewMarkdown({ content }: { content: string }) {
  if (!content) return <p className="text-muted italic text-xs">No content to preview yet...</p>;
  
  const lines = content.split("\n");
  let inList = false;
  const listItems: string[] = [];
  const elements: React.JSX.Element[] = [];

  const parseInline = (text: string) => {
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent hover:underline transition-colors font-semibold">$1</a>');
    return html;
  };

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="list-disc pl-6 my-3 space-y-1.5 text-foreground text-xs sm:text-sm">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
          ))}
        </ul>
      );
      listItems.length = 0;
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    
    if (trimmed.startsWith("## ")) {
      flushList(index);
      elements.push(
        <h2 key={index} className="text-base sm:text-lg font-extrabold text-foreground mt-6 mb-3 border-b border-border/40 pb-1" dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(3)) }} />
      );
    } else if (trimmed.startsWith("### ")) {
      flushList(index);
      elements.push(
        <h3 key={index} className="text-sm sm:text-base font-bold text-foreground mt-4 mb-2" dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(4)) }} />
      );
    } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      inList = true;
      listItems.push(trimmed.substring(2));
    } else if (trimmed === "") {
      flushList(index);
    } else {
      if (inList) {
        flushList(index);
      }
      elements.push(
        <p key={index} className="text-foreground text-xs sm:text-sm leading-relaxed mb-3 font-medium" dangerouslySetInnerHTML={{ __html: parseInline(trimmed) }} />
      );
    }
  });

  if (inList) {
    elements.push(
      <ul key="list-end" className="list-disc pl-6 my-3 space-y-1.5 text-foreground text-xs sm:text-sm">
        {listItems.map((item, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
        ))}
      </ul>
    );
  }

  return <div className="prose max-w-none">{elements}</div>;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      size="sm"
      disabled={pending}
      className="flex items-center gap-1.5 text-xs font-bold"
    >
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <Save className="h-4 w-4" />
          Save Article
        </>
      )}
    </Button>
  );
}

export default function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: post?.title || "",
    category: post?.category || "Web Development",
    summary: post?.summary || "",
    content: post?.content || "",
    date: post?.date || new Date().toISOString().split("T")[0],
    author: post?.author || "Admin",
  });
  
  const [previewTab, setPreviewTab] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "Web Development",
    "Web Design Services",
    "Mobile App Development",
    "Game Designing",
    "Game Development",
    "Digital Marketing",
  ];

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const result = await saveBlogPost({
      ...formData,
      id: post?.id,
    });

    if (result.success) {
      router.push("/admin/blogs");
      router.refresh();
    } else {
      setError(result.error || "Failed to save blog post.");
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Back link and submit */}
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground text-xs font-bold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Directory
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/admin/blogs">
              <Button variant="outline" size="sm" type="button" className="text-xs font-bold">
                Cancel
              </Button>
            </Link>
            <SubmitButton />
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-500 mb-6 font-semibold text-center">
            {error}
          </div>
        )}

        {/* Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Metadata details (Left Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <Card variant="default" className="p-6 border border-border bg-surface/50 backdrop-blur-sm space-y-5">
              <h3 className="text-xs font-extrabold text-foreground uppercase tracking-widest mb-4 border-b border-border/40 pb-3">
                Metadata Settings
              </h3>
              
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                  Title*
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter article title"
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                  Category*
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                    Publish Date*
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                    Author*
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-muted uppercase tracking-wider">
                  Summary / Excerpt*
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Provide a concise 2-sentence summary of this article..."
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
            </Card>

            <div className="p-4 rounded-xl bg-accent/5 border border-accent/15 text-[10px] text-muted leading-relaxed font-semibold">
              <span className="font-bold text-accent block mb-1">Markdown Reference:</span>
              Use <code className="text-foreground font-mono bg-background border border-border px-1 rounded">## Heading</code> for sections, <code className="text-foreground font-mono bg-background border border-border px-1 rounded">* item</code> for bullets, and <code className="text-foreground font-mono bg-background border border-border px-1 rounded">**bold**</code> to highlight words.
            </div>
          </div>

          {/* Main Editor / Preview Tab (Right Columns) */}
          <div className="lg:col-span-7">
            <Card variant="default" className="border border-border overflow-hidden flex flex-col h-[520px] p-0">
              
              {/* Tab Header Controls */}
              <div className="bg-surface/50 border-b border-border px-4 py-3 flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider">
                  Article Body
                </span>
                
                <div className="flex bg-background p-0.5 rounded-lg border border-border/80">
                  <button
                    type="button"
                    onClick={() => setPreviewTab(false)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      !previewTab
                        ? "bg-surface text-foreground shadow-sm"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <Edit className="h-3 w-3" />
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewTab(true)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                      previewTab
                        ? "bg-surface text-foreground shadow-sm"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    <Eye className="h-3 w-3" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Tab Content Body */}
              <div className="flex-grow p-5 bg-background overflow-y-auto">
                {!previewTab ? (
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write article details using Markdown syntax..."
                    className="w-full h-full bg-transparent text-foreground text-xs font-mono focus:outline-none resize-none"
                  />
                ) : (
                  <PreviewMarkdown content={formData.content} />
                )}
              </div>

            </Card>
          </div>

        </div>
      </form>
    </div>
  );
}

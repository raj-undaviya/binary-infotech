import { getPostBySlug, getPosts } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ArrowRight, Eye, Clock } from "lucide-react";
import Card from "@/components/design-system/Card";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: post.title,
    description: post.summary,
  };
}

// A simple Markdown to JSX parser for safe server-side rendering
function Markdown({ content }: { content: string }) {
  if (!content) return <p className="text-muted italic text-xs">No content...</p>;

  const lines = content.split("\n");
  let inList = false;
  const listItems: string[] = [];
  const elements: React.JSX.Element[] = [];

  const parseInline = (text: string) => {
    // Bold parsing **text** -> <strong>text</strong>
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>');
    // Link parsing [text](url) -> <a href="url" class="text-accent hover:underline">text</a>
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-accent hover:text-secondary transition-colors font-semibold">$1</a>');
    return html;
  };

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="list-disc pl-6 my-4 space-y-2 text-foreground text-xs sm:text-sm leading-relaxed">
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
        <h2 key={index} className="text-base sm:text-lg font-extrabold text-foreground mt-8 mb-4 border-b border-border/40 pb-2" dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(3)) }} />
      );
    } else if (trimmed.startsWith("### ")) {
      flushList(index);
      elements.push(
        <h3 key={index} className="text-sm sm:text-base font-bold text-foreground mt-6 mb-3" dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(4)) }} />
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
        <p key={index} className="text-foreground text-xs sm:text-sm leading-relaxed mb-4 font-medium" dangerouslySetInnerHTML={{ __html: parseInline(trimmed) }} />
      );
    }
  });

  // Flush any remaining list items at the end
  if (inList) {
    elements.push(
      <ul key="list-end" className="list-disc pl-6 my-4 space-y-2 text-foreground text-xs sm:text-sm leading-relaxed">
        {listItems.map((item, idx) => (
          <li key={idx} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
        ))}
      </ul>
    );
  }

  return <div className="space-y-4">{elements}</div>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);

  // Older post is next in array (sorted descending by date)
  const olderPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  // Newer post is previous in array
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-highlight/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted hover:text-foreground text-xs font-bold mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog Listing
        </Link>

        {/* Article Layout */}
        <Card variant="default" className="p-6 sm:p-10 border border-border/80 bg-surface/50 backdrop-blur-sm mb-12 shadow-sm">
          
          {/* Header Info */}
          <div className="border-b border-border/40 pb-6 mb-8">
            <span className="px-3 py-1 rounded bg-accent/15 text-accent text-xs font-extrabold uppercase tracking-widest">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground mt-4 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-[10px] sm:text-xs text-muted font-semibold">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-accent" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-accent" />
                Published by {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4 text-accent" />
                {post.views} Views
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent" />
                5 Min Read
              </span>
            </div>
          </div>

          {/* Render parsed text */}
          <div className="prose max-w-none">
            <Markdown content={post.content} />
          </div>

        </Card>

        {/* Post Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border/40">
          {olderPost ? (
            <Link
              href={`/blog/${olderPost.slug}`}
              className="bg-surface/50 border border-border hover:border-accent/40 rounded-2xl p-6 transition-all text-left flex flex-col justify-between group shadow-sm"
            >
              <span className="text-[10px] font-extrabold text-muted uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                Older Post
              </span>
              <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                {olderPost.title}
              </span>
            </Link>
          ) : (
            <div className="bg-surface/20 border border-border/60 opacity-40 rounded-2xl p-6 text-left shadow-sm">
              <span className="text-[10px] font-extrabold text-muted uppercase tracking-widest block mb-2">
                Older Post
              </span>
              <span className="text-xs sm:text-sm font-bold text-muted block">
                No older posts available.
              </span>
            </div>
          )}

          {newerPost ? (
            <Link
              href={`/blog/${newerPost.slug}`}
              className="bg-surface/50 border border-border hover:border-accent/40 rounded-2xl p-6 transition-all text-right flex flex-col justify-between group shadow-sm"
            >
              <span className="text-[10px] font-extrabold text-muted uppercase tracking-widest flex items-center gap-1.5 mb-2 ml-auto">
                Newer Post
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                {newerPost.title}
              </span>
            </Link>
          ) : (
            <div className="bg-surface/20 border border-border/60 opacity-40 rounded-2xl p-6 text-right shadow-sm">
              <span className="text-[10px] font-extrabold text-muted uppercase tracking-widest block mb-2">
                Newer Post
              </span>
              <span className="text-xs sm:text-sm font-bold text-muted block">
                No newer posts available.
              </span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

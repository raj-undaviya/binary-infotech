import Link from "next/link";
import { getPosts } from "@/lib/db";
import { 
  Calendar, 
  User, 
  Search, 
  BookOpen, 
  Layers, 
  ArrowRight, 
  Code, 
  Smartphone, 
  TrendingUp 
} from "lucide-react";
import Card from "@/components/design-system/Card";

export const metadata = {
  title: "Blog & Insights | Binary Infotech",
  description: "Stay updated with the latest software trends, SEO tips, mobile app strategies, and design tips from Binary Infotech.",
};

const categoryVisuals: Record<string, { gradient: string; icon: any }> = {
  "digital marketing": { gradient: "from-[#06b6d4] to-[#3b82f6]", icon: TrendingUp },
  "mobile app-development": { gradient: "from-[#ec4899] to-[#8b5cf6]", icon: Smartphone },
  "web design services": { gradient: "from-[#f59e0b] to-[#ec4899]", icon: Layers },
  "web development": { gradient: "from-[#10b981] to-[#06b6d4]", icon: Code },
  "default": { gradient: "from-accent to-secondary", icon: Code }
};

function BlogCardImage({ category }: { category: string }) {
  const normCategory = category.toLowerCase();
  let config = categoryVisuals[normCategory] || categoryVisuals["default"];
  if (normCategory.includes("marketing")) config = categoryVisuals["digital marketing"];
  if (normCategory.includes("mobile") || normCategory.includes("app")) config = categoryVisuals["mobile app-development"];
  if (normCategory.includes("design") || normCategory.includes("ui")) config = categoryVisuals["web design services"];
  if (normCategory.includes("development") || normCategory.includes("web")) config = categoryVisuals["web development"];

  const Icon = config.icon;

  return (
    <div className={`w-full h-full bg-gradient-to-br ${config.gradient} flex items-center justify-center relative overflow-hidden group/img`}>
      {/* Grid mesh overlay */}
      <div className="absolute inset-0 grid-bg-pattern opacity-15 pointer-events-none" />
      
      {/* Decorative ambient center orb */}
      <div className="absolute w-24 h-24 bg-white/10 rounded-full filter blur-xl pointer-events-none" />

      {/* Floating design elements */}
      <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-white/30 animate-pulse" />
      <div className="absolute bottom-6 right-8 w-2 h-2 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: "1s" }} />

      <Icon className="h-12 w-12 text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.3)] group-hover/img:scale-110 group-hover/img:rotate-3 transition-transform duration-300 relative z-10" />
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const category = resolvedParams.category || "";

  const allPosts = await getPosts();

  // Filter posts based on search query and category
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory =
      category === "" || post.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Get distinct categories
  const categories = Array.from(new Set(allPosts.map((p) => p.category)));

  // Mock courses for the sidebar (from original website elements)
  const courses = [
    { name: "WordPress", href: "#" },
    { name: "Woocommerce", href: "#" },
    { name: "Python", href: "#" },
    { name: "NodeJS", href: "#" },
    { name: "Reactjs", href: "#" },
  ];

  return (
    <div className="relative py-16 sm:py-24 overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-highlight/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent text-xs font-extrabold uppercase tracking-widest">Blog Post</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground mt-2 mb-4 tracking-tight">
            Latest Post from Blog
          </h1>
          <p className="text-muted text-xs sm:text-base font-semibold leading-relaxed">
            Stay ahead of the curve with our technical write-ups, SEO guides, and design strategies.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content (Blogs List) */}
          <div className="lg:col-span-8 space-y-10">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-surface/50 border border-border/80 rounded-2xl overflow-hidden flex flex-col md:flex-row group hover:border-accent/40 transition-all duration-300 h-full md:h-64 shadow-sm"
                >
                  {/* Visual card header image */}
                  <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-border min-h-[180px] relative overflow-hidden flex-shrink-0">
                    <BlogCardImage category={post.category} />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] sm:text-xs text-muted mb-3 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-accent" />
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-accent" />
                          {post.author}
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-accent/10 text-accent font-bold uppercase tracking-wider text-[9px]">
                          {post.category}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      <p className="text-muted text-xs leading-relaxed line-clamp-2 mb-4 font-medium">
                        {post.summary}
                      </p>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-accent group flex items-center gap-1 hover:text-secondary transition-colors mt-auto w-fit"
                    >
                      Read Full Article
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <Card variant="default" className="p-12 text-center flex flex-col items-center justify-center gap-4 border border-border">
                <p className="text-muted text-xs font-semibold">No posts found matching your search parameters.</p>
                <Link
                  href="/blog"
                  className="text-xs font-bold text-accent hover:underline"
                >
                  Clear Filters
                </Link>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Search Box */}
            <Card variant="default" className="p-6 border border-border bg-surface/50">
              <h3 className="text-foreground font-extrabold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Search className="h-4 w-4 text-accent" />
                Search Blog
              </h3>
              <form action="/blog" method="GET" className="relative">
                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Type keywords..."
                  className="w-full bg-background border border-border rounded-xl pl-4 pr-10 py-2.5 text-foreground text-xs focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground cursor-pointer"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </Card>

            {/* Categories */}
            <Card variant="default" className="p-6 border border-border bg-surface/50">
              <h3 className="text-foreground font-extrabold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" />
                Categories
              </h3>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/blog"
                  className={`text-xs px-3 py-2 rounded-lg font-bold tracking-tight transition-colors ${
                    category === ""
                      ? "bg-accent/15 text-accent"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  }`}
                >
                  All Categories ({allPosts.length})
                </Link>
                {categories.map((cat) => {
                  const count = allPosts.filter((p) => p.category === cat).length;
                  const isActive = category.toLowerCase() === cat.toLowerCase();
                  return (
                    <Link
                      key={cat}
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className={`text-xs px-3 py-2 rounded-lg font-bold tracking-tight transition-colors ${
                        isActive
                          ? "bg-accent/15 text-accent"
                          : "text-muted hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      {cat} ({count})
                    </Link>
                  );
                })}
              </div>
            </Card>

            {/* Courses list (Legacy Sidebar component) */}
            <Card variant="default" className="p-6 border border-border bg-surface/50">
              <h3 className="text-foreground font-extrabold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                Our Courses
              </h3>
              <ul className="space-y-3">
                {courses.map((c, idx) => (
                  <li key={idx}>
                    <a
                      href={c.href}
                      className="text-xs text-muted hover:text-foreground font-semibold transition-colors flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {c.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>

          </aside>

        </div>
      </div>
    </div>
  );
}

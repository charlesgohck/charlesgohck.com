import { wisp } from "@/lib/wisp";
import Link from "next/link";
import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://charlesgohck.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on software engineering, technology, web development, and more. Stay updated with the latest insights and tutorials.",
  keywords: [
    "Software Engineering Blog",
    "Technology Blog",
    "Web Development",
    "Programming Tutorials",
    "Tech Insights",
    "Charles Goh Blog",
  ],
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: "Blog | Charles Goh C.K",
    description:
      "Thoughts on software engineering, technology, web development, and more. Stay updated with the latest insights and tutorials.",
    siteName: "Charles Goh C.K",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Charles Goh C.K",
    description:
      "Thoughts on software engineering, technology, web development, and more.",
  },
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

// Revalidate every hour
export const revalidate = 3600;

interface BlogPost {
  id: string;
  title: string;
  image: string | null;
  description: string | null;
  slug: string;
  createdAt: Date;
  publishedAt: Date | null;
  author: {
    name: string | null;
    image: string | null;
  } | null;
  tags: Array<{ id: string; name: string }>;
}

interface Tag {
  id: string;
  name: string;
}

async function getBlogPosts(tags?: string[]): Promise<BlogPost[]> {
  try {
    const result = await wisp.getPosts({
      limit: "all",
      tags: tags && tags.length > 0 ? tags : undefined,
    });
    return result.posts as unknown as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

async function getTags(): Promise<Tag[]> {
  try {
    const result = await wisp.getTags(1, "all");
    return result.tags as unknown as Tag[];
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Navigation Component
function Navigation() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="bg-background/80 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-foreground transition-colors hover:text-muted-foreground"
          >
            CG
          </Link>

          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Tag Filter Component (Client Component imported separately)
function TagFilterSection({
  tags,
  selectedTags,
}: {
  tags: Tag[];
  selectedTags: string[];
}) {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Filter by Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedTags.length === 0
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          All Posts
        </Link>
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag.name);
          const newTags = isSelected
            ? selectedTags.filter((t) => t !== tag.name)
            : [...selectedTags, tag.name];
          const href =
            newTags.length > 0
              ? `/blog?tags=${newTags.join(",")}`
              : "/blog";

          return (
            <Link
              key={tag.id}
              href={href}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {tag.name}
              {isSelected && (
                <span className="ml-2 text-xs">×</span>
              )}
            </Link>
          );
        })}
      </div>
      {selectedTags.length > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Showing posts tagged with:{" "}
          <span className="font-medium text-foreground">
            {selectedTags.join(", ")}
          </span>
        </p>
      )}
    </div>
  );
}

// Blog Post Card Component
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      {post.image && (
        <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="p-6">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag) => (
              <Link
                key={tag.id}
                href={`/blog?tags=${tag.name}`}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>

        {/* Description */}
        {post.description && (
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {post.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {post.author?.image && (
              <img
                src={post.author.image}
                alt={post.author.name || "Author"}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span>{post.author?.name || "Anonymous"}</span>
          </div>
          <time dateTime={new Date(post.publishedAt ?? post.createdAt).toISOString()}>{formatDate(post.publishedAt ?? post.createdAt)}</time>
        </div>
      </div>
    </article>
  );
}

// Empty State Component
function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
        <svg
          className="w-8 h-8 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        {hasFilters ? "No posts found" : "No posts yet"}
      </h3>
      <p className="text-muted-foreground max-w-sm mx-auto">
        {hasFilters
          ? "Try adjusting your filters to find more posts."
          : "Check back later for new content!"}
      </p>
      {hasFilters && (
        <Link
          href="/blog"
          className="inline-flex items-center mt-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Clear filters
        </Link>
      )}
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tags?: string }>;
}) {
  const params = await searchParams;
  const selectedTags = params.tags ? params.tags.split(",").filter(Boolean) : [];

  const [posts, tags] = await Promise.all([
    getBlogPosts(selectedTags),
    getTags(),
  ]);

  // JSON-LD structured data for blog listing
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog | Charles Goh C.K",
    description:
      "Thoughts on software engineering, technology, web development, and more.",
    url: `${siteUrl}/blog`,
    author: {
      "@type": "Person",
      name: "Charles Goh C.K",
      url: siteUrl,
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description || undefined,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: new Date(post.publishedAt ?? post.createdAt).toISOString(),
      image: post.image || undefined,
      author: {
        "@type": "Person",
        name: post.author?.name || "Charles Goh C.K",
      },
    })),
  };

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navigation />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12 animate-fade-in-up">
<div className="overflow-hidden rounded-xl border border-[#3d3d3d] bg-card shadow-sm">
            {/* Windows Terminal title bar */}
            <div className="flex items-center justify-between bg-[#1e1e1e] border-b border-[#3d3d3d]">
              {/* Tabs */}
              <div className="flex items-center">
                <div className="flex items-center gap-2 bg-[#0c0c0c] px-4 py-2 border-r border-[#3d3d3d]">
                  <span className="h-3 w-3 rounded-full bg-[#E95420]" aria-hidden />
                  <span className="text-xs font-medium text-[#cccccc]">computer</span>
                </div>
                <span className="px-3 py-2 text-[#6d6d6d] text-sm select-none">+</span>
              </div>
              {/* Windows window controls */}
              <div className="flex items-center text-[#cccccc]">
                <span className="px-4 py-2 hover:bg-[#3d3d3d] text-xs cursor-default select-none" aria-label="Minimize">─</span>
                <span className="px-4 py-2 hover:bg-[#3d3d3d] text-xs cursor-default select-none" aria-label="Maximize">&#9633;</span>
                <span className="px-4 py-2 hover:bg-red-600 text-xs cursor-default select-none" aria-label="Close">&#10005;</span>
              </div>
            </div>

            <div className="space-y-4 bg-background p-5 sm:p-6 md:p-8">
              <p className="font-mono text-sm">
                <span className="text-[#4EC94E]">charles@computer</span>
                <span className="text-foreground">:</span>
                <span className="text-blue-400">~/blog</span>
                <span className="text-foreground">$ </span>
                <span className="text-foreground">ls -la</span>
              </p>

              <div className="rounded-md border border-border bg-muted/30 p-4 md:p-5">
                <h1 className="text-3xl font-bold text-foreground md:text-5xl">
                  Blog
                </h1>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground md:text-lg">
                  Thoughts on software engineering, technology, and the
                  occasional adventure into new domains.
                </p>
              </div>

              <p className="font-mono text-sm">
                <span className="text-[#4EC94E]">charles@computer</span>
                <span className="text-foreground">:</span>
                <span className="text-blue-400">~/blog</span>
                <span className="text-foreground">$ </span>
                <span className="text-foreground">find posts -type f | wc -l</span>
              </p>
            </div>
          </div>
        </header>

        {/* Tag Filters */}
        {tags.length > 0 && (
          <div className="animate-fade-in-up animation-delay-200">
            <TagFilterSection tags={tags} selectedTags={selectedTags} />
          </div>
        )}

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up animation-delay-400">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="animate-fade-in-up animation-delay-400">
            <EmptyState hasFilters={selectedTags.length > 0} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Charles Goh C.K. All rights reserved.
            </p>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { wisp } from "@/lib/wisp";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Charles Goh C.K",
  description: "Thoughts on software engineering, technology, and more.",
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
          <time dateTime={new Date(post.createdAt).toISOString()}>{formatDate(post.createdAt)}</time>
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <header className="mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Thoughts on software engineering, technology, and the occasional
            adventure into new domains.
          </p>
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

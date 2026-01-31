import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Post Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, the blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Browse all posts
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background text-foreground font-medium hover:bg-accent transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

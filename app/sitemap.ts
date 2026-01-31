import { MetadataRoute } from "next";
import { wisp } from "@/lib/wisp";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://charlesgohck.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic blog posts
  let blogPosts: MetadataRoute.Sitemap = [];
  try {
    const result = await wisp.getPosts({ limit: "all" });
    blogPosts = result.posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  return [...staticPages, ...blogPosts];
}

import { buildWispClient } from "@wisp-cms/client";

export const wisp = buildWispClient({
  baseUrl: "https://www.wisp.blog",
  blogId: process.env.NEXT_PUBLIC_WISP_BLOG_ID || "",
});

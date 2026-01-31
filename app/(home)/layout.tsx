import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://charlesgohck.com";

export const metadata: Metadata = {
  title: "Charles Goh C.K | Software Engineer",
  description:
    "Software engineer specializing in full-stack development. Explore my portfolio, experience, publications, and blog on technology and software engineering.",
  keywords: [
    "Charles Goh",
    "Software Engineer",
    "Full Stack Developer",
    "Web Development",
    "Portfolio",
    "Software Development",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Charles Goh C.K | Software Engineer",
    description:
      "Software engineer specializing in full-stack development. Explore my portfolio, experience, publications, and blog.",
    siteName: "Charles Goh C.K",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charles Goh C.K | Software Engineer",
    description:
      "Software engineer specializing in full-stack development. Explore my portfolio, experience, publications, and blog.",
    creator: "@charlesgohck",
  },
  alternates: {
    canonical: siteUrl,
  },
};

// JSON-LD structured data component
function JsonLd() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Charles Goh C.K",
    url: siteUrl,
    jobTitle: "Software Engineer",
    description:
      "Software engineer specializing in full-stack development.",
    sameAs: [
      // Add social media URLs here
      "https://linkedin.com/in/charlesgohck",
      "https://github.com/charlesgohck"
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Charles Goh C.K",
    url: siteUrl,
    description:
      "Portfolio and blog of Charles Goh C.K, a software engineer specializing in full-stack development.",
    author: {
      "@type": "Person",
      name: "Charles Goh C.K",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd />
      {children}
    </>
  );
}

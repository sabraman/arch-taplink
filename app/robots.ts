import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/og"], // Allow root and OG image route
        disallow: ["/privacy-policy/", "/terms/"], // Example: disallow private pages
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`, // Assuming you'll have a sitemap
  };
}

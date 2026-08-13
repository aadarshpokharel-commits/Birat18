import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { workers } from "@/lib/mock-data";

const BASE_URL = "https://skill-hire.lovable.app";

interface Entry {
  path: string;
  changefreq?: "weekly" | "monthly" | "daily";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: Entry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/categories", changefreq: "weekly", priority: "0.9" },
          { path: "/search", changefreq: "weekly", priority: "0.8" },
          { path: "/services/plumbing", changefreq: "weekly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/privacy", changefreq: "monthly", priority: "0.2" },
          { path: "/terms", changefreq: "monthly", priority: "0.2" },
          ...workers.map((w) => ({
            path: `/worker/${w.id}`,
            changefreq: "weekly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries
          .map(
            (e) =>
              `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n` +
              (e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>\n` : "") +
              (e.priority ? `    <priority>${e.priority}</priority>\n` : "") +
              `  </url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

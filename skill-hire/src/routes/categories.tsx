import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getCategories, type Category } from "@/api/category";

const url = "https://skill-hire.lovable.app/categories";
const title = "All service categories — SkillHire";
const desc =
  "Browse every skilled service category on SkillHire — electricians, plumbers, cleaners, tutors, mechanics and more. Find verified local pros in your area.";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
    ],
    links: [
      { rel: "canonical", href: url },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css",
      },
    ],
  }),
  component: CategoriesPage,
});

interface IconConfig {
  icon: string;
  gradient: string;
  shadow: string;
}

const iconMap: Record<string, IconConfig> = {
  electrician: {
    icon: "ti-bolt",
    gradient: "linear-gradient(145deg,#fde68a,#f59e0b,#d97706)",
    shadow: "rgba(245,158,11,0.40)",
  },
  plumber: {
    icon: "ti-droplet",
    gradient: "linear-gradient(145deg,#7dd3fc,#0ea5e9,#0369a1)",
    shadow: "rgba(14,165,233,0.40)",
  },
  carpenter: {
    icon: "ti-tool",
    gradient: "linear-gradient(145deg,#fcd34d,#d97706,#92400e)",
    shadow: "rgba(217,119,6,0.40)",
  },
  painter: {
    icon: "ti-paint",
    gradient: "linear-gradient(145deg,#f9a8d4,#ec4899,#be185d)",
    shadow: "rgba(236,72,153,0.40)",
  },
  mechanic: {
    icon: "ti-settings-2",
    gradient: "linear-gradient(145deg,#94a3b8,#475569,#1e293b)",
    shadow: "rgba(71,85,105,0.40)",
  },
  "ac-technician": {
    icon: "ti-wind",
    gradient: "linear-gradient(145deg,#67e8f9,#06b6d4,#0e7490)",
    shadow: "rgba(6,182,212,0.40)",
  },
  cleaner: {
    icon: "ti-sparkles",
    gradient: "linear-gradient(145deg,#6ee7b7,#10b981,#065f46)",
    shadow: "rgba(16,185,129,0.40)",
  },
  "home-maid": {
    icon: "ti-home",
    gradient: "linear-gradient(145deg,#c4b5fd,#8b5cf6,#5b21b6)",
    shadow: "rgba(139,92,246,0.40)",
  },
  cook: {
    icon: "ti-chef-hat",
    gradient: "linear-gradient(145deg,#fca5a5,#ef4444,#b91c1c)",
    shadow: "rgba(239,68,68,0.40)",
  },
  tutor: {
    icon: "ti-book-2",
    gradient: "linear-gradient(145deg,#93c5fd,#3b82f6,#1d4ed8)",
    shadow: "rgba(59,130,246,0.40)",
  },
  photographer: {
    icon: "ti-camera",
    gradient: "linear-gradient(145deg,#9ca3af,#374151,#111827)",
    shadow: "rgba(55,65,81,0.40)",
  },
  videographer: {
    icon: "ti-video",
    gradient: "linear-gradient(145deg,#a78bfa,#7c3aed,#4c1d95)",
    shadow: "rgba(124,58,237,0.40)",
  },
  gardener: {
    icon: "ti-plant-2",
    gradient: "linear-gradient(145deg,#86efac,#22c55e,#14532d)",
    shadow: "rgba(34,197,94,0.40)",
  },
  driver: {
    icon: "ti-car",
    gradient: "linear-gradient(145deg,#5eead4,#14b8a6,#0f766e)",
    shadow: "rgba(20,184,166,0.40)",
  },
  beautician: {
    icon: "ti-scissors",
    gradient: "linear-gradient(145deg,#f9a8d4,#db2777,#9d174d)",
    shadow: "rgba(219,39,119,0.40)",
  },
  tailor: {
    icon: "ti-needle-thread",
    gradient: "linear-gradient(145deg,#fda4af,#f43f5e,#9f1239)",
    shadow: "rgba(244,63,94,0.40)",
  },
  welder: {
    icon: "ti-flame",
    gradient: "linear-gradient(145deg,#fdba74,#f97316,#c2410c)",
    shadow: "rgba(249,115,22,0.40)",
  },
  mason: {
    icon: "ti-building",
    gradient: "linear-gradient(145deg,#fbbf24,#d97706,#451a03)",
    shadow: "rgba(217,119,6,0.40)",
  },
  "computer-repair": {
    icon: "ti-device-laptop",
    gradient: "linear-gradient(145deg,#818cf8,#4f46e5,#1e1b4b)",
    shadow: "rgba(79,70,229,0.40)",
  },
  "mobile-repair": {
    icon: "ti-device-mobile",
    gradient: "linear-gradient(145deg,#34d399,#059669,#064e3b)",
    shadow: "rgba(5,150,105,0.40)",
  },
};

const fallback: IconConfig = {
  icon: "ti-briefcase",
  gradient: "linear-gradient(145deg,#93c5fd,#3b82f6,#1d4ed8)",
  shadow: "rgba(59,130,246,0.40)",
};

function CategoryCard({ c }: { c: Category }) {
  const cfg = iconMap[c.slug] ?? fallback;
  return (
    <Link
      to="/search"
      search={{ category: c.slug }}
      className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div
        className="grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-200 group-hover:scale-110"
        style={{
          background: cfg.gradient,
          boxShadow: `0 6px 16px ${cfg.shadow}, inset 0 1px 0 rgba(255,255,255,0.30)`,
        }}
      >
        <i className={`ti ${cfg.icon} text-white`} style={{ fontSize: 30 }} aria-hidden="true" />
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">{c.name}</div>
        <div className="mt-0.5 text-xs">
          {c.workers > 0 ? (
            <span className="font-medium text-primary">
              {c.workers} pro{c.workers !== 1 ? "s" : ""}
            </span>
          ) : (
            <span className="text-muted-foreground">Coming soon</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
            All Services
          </p>
          <h1 className="font-display text-4xl font-bold">Browse categories</h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Choose a service and browse verified pros in your area.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((c) => (
            <CategoryCard key={c.slug} c={c} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

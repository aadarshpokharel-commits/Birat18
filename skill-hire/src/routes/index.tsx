import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  MessageSquare,
  Search,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WorkerCard } from "@/components/worker-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { stats, testimonials } from "@/lib/mock-data";
import { getWorkers, type Worker } from "@/api/worker";
import { getCategories, type Category } from "@/api/category";
import hero from "@/assets/hero.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillHire — Hire verified local skilled workers" },
      {
        name: "description",
        content:
          "Book background-verified electricians, plumbers, cleaners, tutors and more in minutes. Transparent pricing, in-app chat, service guarantee.",
      },
      { property: "og:title", content: "SkillHire — Hire verified local skilled workers" },
      {
        property: "og:description",
        content:
          "Book background-verified electricians, plumbers, cleaners, tutors and more in minutes. Transparent pricing, in-app chat, service guarantee.",
      },
      { property: "og:url", content: "https://skill-hire.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://skill-hire.lovable.app/" },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.19.0/dist/tabler-icons.min.css",
      },
    ],
  }),
  component: Landing,
});

// ─── Icon config per category ────────────────────────────────────────────────

const iconMap: Record<string, { icon: string; gradient: string; shadow: string }> = {
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

const fallback = {
  icon: "ti-briefcase",
  gradient: "linear-gradient(145deg,#93c5fd,#3b82f6,#1d4ed8)",
  shadow: "rgba(59,130,246,0.40)",
};

function CategoryIcon({ slug }: { slug: string; color?: string }) {
  const cfg = iconMap[slug] ?? fallback;
  return (
    <div
      className="grid h-16 w-16 place-items-center rounded-2xl transition-transform duration-200 group-hover:scale-110"
      style={{
        background: cfg.gradient,
        boxShadow: `0 6px 16px ${cfg.shadow}, inset 0 1px 0 rgba(255,255,255,0.30)`,
      }}
    >
      <i className={`ti ${cfg.icon} text-white`} style={{ fontSize: 30 }} aria-hidden="true" />
    </div>
  );
}

// ─── Landing page ─────────────────────────────────────────────────────────────

function Landing() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<Worker[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getWorkers()
      .then((workers) => {
        const top = workers
          .filter((w) => w.price > 0)
          .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
          .slice(0, 8);
        setFeatured(top);
      })
      .catch(() => {});

    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:pb-24 lg:pt-20">
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-soft">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Trusted by 180K+ households
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Hire verified <span className="text-gradient">local pros</span> in minutes.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-muted-foreground">
                From plumbing emergencies to weekend deep-cleans, SkillHire brings
                background-checked workers to your doorstep — with transparent pricing and instant
                chat.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate({ to: "/search", search: { q } });
                }}
                className="mt-8 flex flex-col gap-2 rounded-2xl border bg-card p-2 shadow-elevated sm:flex-row"
              >
                <div className="flex flex-1 items-center gap-2 px-3">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Try 'electrician near me' or 'AC service'"
                    className="border-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                <Button type="submit" size="lg" className="shrink-0">
                  Search
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" /> ID-verified workers
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" /> Service guarantee
                </span>
                <span className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" /> 4.8 avg. rating
                </span>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/20 blur-3xl" />
              <video
                src={hero}
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-xl rounded-3xl object-cover"
              />
            </div>
          </div>

          {/* Stats bar */}
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="grid gap-4 rounded-2xl border bg-card p-6 shadow-soft sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="Browse services"
            title="Popular categories"
            desc="Every profession you need — one tap away."
            link={{ to: "/categories", label: "See all" }}
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.slice(0, 12).map((c) => (
              <Link
                key={c.slug}
                to="/search"
                search={{ category: c.slug }}
                className="group flex flex-col items-center gap-3 rounded-2xl border bg-card p-5 text-center transition-all hover:-translate-y-1 hover:shadow-elevated"
              >
                <CategoryIcon slug={c.slug} />
                <div>
                  <div className="text-sm font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.workers} pros</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured workers — real data from backend */}
        {featured.length > 0 && (
          <section className="bg-surface py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SectionHead
                eyebrow="Top rated"
                title="Featured professionals"
                desc="Our highest-rated workers, ready to book."
                link={{ to: "/search", label: "Browse all" }}
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((w) => (
                  <WorkerCard key={w.id} worker={w} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* How it works */}
        <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHead
            eyebrow="How it works"
            title="Book help in three steps"
            desc="Simple, safe, and quick."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Search & compare",
                desc: "Filter by category, price, ratings, and availability.",
              },
              {
                icon: CalendarCheck,
                title: "Book instantly",
                desc: "Pick a date, time, and share your address.",
              },
              {
                icon: MessageSquare,
                title: "Chat & complete",
                desc: "Coordinate in-app, then rate your worker.",
              },
            ].map((step, i) => (
              <Card key={step.title} className="relative p-6 shadow-soft">
                <div className="absolute -top-3 left-6 grid h-7 w-7 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <step.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-surface py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead eyebrow="Loved by customers" title="What people say" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.name} className="p-6 shadow-soft">
                  <div className="flex gap-0.5 text-warning">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">"{t.text}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary text-sm font-semibold text-primary-foreground">
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="gradient-primary relative overflow-hidden rounded-3xl px-8 py-14 text-center text-primary-foreground shadow-glow">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                Are you a skilled professional?
              </h2>
              <p className="mt-3 text-primary-foreground/90">
                Join thousands of verified workers earning on SkillHire. Set your own hours and
                pricing.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" variant="secondary">
                  <Link to="/register">Become a worker</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-white/10 text-white hover:bg-white/20"
                >
                  <Link to="/about">Learn how SkillHire works</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  desc,
  link,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            {eyebrow}
          </div>
        )}
        <h2 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
        {desc && <p className="mt-2 max-w-xl text-muted-foreground">{desc}</p>}
      </div>
      {link && (
        <Link to={link.to} className="text-sm font-semibold text-primary hover:underline">
          {link.label} →
        </Link>
      )}
    </div>
  );
}

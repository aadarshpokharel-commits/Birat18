import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Clock, Shield, Wrench } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WorkerCard } from "@/components/worker-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { getWorkers, type Worker } from "@/api/worker";

const url = "https://skill-hire.lovable.app/services/plumbing";

const title = "Hire a verified plumber near you — SkillHire";

const desc =
  "Book a background-verified plumber near you in minutes. Emergency leaks, blocked drains, tap and geyser fitting — transparent pricing, service guarantee.";

export const Route = createFileRoute("/services/plumbing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: PlumbingPage,
});

function PlumbingPage() {
  const [plumbers, setPlumbers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWorkers();
  }, []);

  async function loadWorkers() {
    try {
      const workers = await getWorkers();

      setPlumbers(workers.filter((w) => w.category.toLowerCase() === "plumber").slice(0, 8));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main>
        <section className="gradient-hero">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium shadow-soft">
                <Wrench className="h-3.5 w-3.5 text-primary" />
                Plumbing services
              </span>

              <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl">
                Hire a <span className="text-gradient">verified plumber</span> near you.
              </h1>

              <p className="mt-4 max-w-lg text-lg text-muted-foreground">
                Leaky taps, blocked drains, geyser installation or a full bathroom refit —
                SkillHire's background-checked plumbers arrive on time with upfront pricing.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/search" search={{ category: "plumber" }}>
                    Find a plumber
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline">
                  <Link to="/categories">Browse other services</Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary" />
                  ID-verified plumbers
                </span>

                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Service guarantee
                </span>

                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Same-day availability
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Emergency leaks",
                  desc: "Burst pipes and overflowing tanks fixed fast, any time of day.",
                },
                {
                  title: "Blocked drains",
                  desc: "Kitchen sinks, bathroom drains and sewer lines cleared.",
                },
                {
                  title: "Tap & faucet fitting",
                  desc: "New taps, mixers and showers installed cleanly.",
                },
                {
                  title: "Geyser & water heater",
                  desc: "Installation, repair and annual servicing.",
                },
              ].map((service) => (
                <Card key={service.title} className="p-5 shadow-soft">
                  <div className="font-semibold">{service.title}</div>

                  <p className="mt-1 text-sm text-muted-foreground">{service.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold">Top-rated plumbers on SkillHire</h2>

          <p className="mt-2 max-w-xl text-muted-foreground">
            Each pro is background-verified with real customer reviews.
          </p>

          {loading ? (
            <div className="mt-8 text-center">Loading plumbers...</div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {plumbers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          )}

          <div className="mt-8">
            <Button asChild size="lg" variant="outline">
              <Link to="/search" search={{ category: "plumber" }}>
                See all plumbers
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

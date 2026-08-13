import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const url = "https://skill-hire.lovable.app/about";
const title = "About SkillHire — Verified local skilled workers";
const desc =
  "Learn how SkillHire connects households and businesses with background-verified electricians, plumbers, cleaners, tutors and more across 45+ cities.";

export const Route = createFileRoute("/about")({
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
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main>
        <section className="gradient-hero">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold sm:text-5xl">About SkillHire</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We believe finding trusted local help should be as easy as ordering a coffee.
              SkillHire connects households and businesses with background-verified professionals
              across 45+ cities.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="font-display text-2xl font-bold">Our mission</h2>
            <p className="mt-3 text-muted-foreground">
              To empower skilled workers with dignified livelihoods while giving customers a
              delightful, reliable service experience.
            </p>
            <h2 className="mt-10 font-display text-2xl font-bold">What makes us different</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              <li>• Every worker is ID-verified and background-checked before joining.</li>
              <li>• Transparent, upfront pricing — no surprise fees.</li>
              <li>• Real-time chat, instant booking, and service guarantees.</li>
              <li>• A dedicated support team available 24/7.</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

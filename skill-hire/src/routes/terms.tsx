import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const url = "https://skill-hire.lovable.app/terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SkillHire" },
      {
        name: "description",
        content:
          "The terms that govern your use of SkillHire's marketplace of verified local skilled workers.",
      },
      { property: "og:title", content: "Terms of Service — SkillHire" },
      {
        property: "og:description",
        content: "The terms that govern your use of SkillHire's marketplace.",
      },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold">Terms of Service</h1>
        <p className="mt-4 text-muted-foreground">
          By using SkillHire, you agree to our terms. Detailed terms will be published soon.
        </p>
      </main>
      <Footer />
    </div>
  ),
});

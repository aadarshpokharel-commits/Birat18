import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const url = "https://skill-hire.lovable.app/privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SkillHire" },
      {
        name: "description",
        content: "How SkillHire collects, uses and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy — SkillHire" },
      {
        property: "og:description",
        content: "How SkillHire collects, uses and protects your personal information.",
      },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: () => (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          SkillHire respects your privacy. We collect only the data necessary to provide our
          services and never sell it to third parties. Full policy coming soon.
        </p>
      </main>
      <Footer />
    </div>
  ),
});

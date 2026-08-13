import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const url = "https://skill-hire.lovable.app/contact";
const title = "Contact SkillHire — Support & feedback";
const desc =
  "Get in touch with the SkillHire team. Questions, feedback or partnership enquiries — we reply within one business day.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h1 className="font-display text-4xl font-bold">Get in touch</h1>
          <p className="mt-3 text-muted-foreground">
            Have questions or feedback? Our team responds within one business day.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" /> hello@skillhire.app
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" /> +977 9840881516
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" /> Dhangadhi/ Kathmandu , Nepal
            </div>
          </div>
        </div>
        <Card className="p-6 shadow-elevated">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thanks — we'll be in touch!");
              (e.target as HTMLFormElement).reset();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="n">Name</Label>
              <Input id="n" required />
            </div>
            <div>
              <Label htmlFor="e">Email</Label>
              <Input id="e" type="email" required />
            </div>
            <div>
              <Label htmlFor="m">Message</Label>
              <Textarea id="m" rows={5} required />
            </div>
            <Button type="submit" className="w-full">
              Send message
            </Button>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Camera,
  Check,
  ChevronRight,
  Globe,
  Loader2,
  MapPin,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { getCategories, type Category } from "@/api/category";
import { saveWorkerProfile } from "@/api/worker";
import { getUser } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/worker-onboarding")({
  head: () => ({
    meta: [
      { title: "Complete Your Worker Profile — SkillHire" },
      {
        name: "description",
        content: "Set up your SkillHire worker profile so customers can find and hire you.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WorkerOnboardingPage,
});

// ─── Icon map (Lucide icon name → emoji, same mapping used in the rest of the app) ──

const ICON_MAP: Record<string, string> = {
  Zap: "⚡",
  Wrench: "🔧",
  Hammer: "🔨",
  Paintbrush: "🎨",
  Car: "🚗",
  Snowflake: "❄️",
  Sparkles: "✨",
  Home: "🏠",
  ChefHat: "👨‍🍳",
  GraduationCap: "🎓",
  Camera: "📷",
  Video: "🎥",
  Trees: "🌳",
  CarFront: "🚙",
  Scissors: "✂️",
  Shirt: "👕",
  Flame: "🔥",
  Building2: "🏗️",
  Laptop: "💻",
  Smartphone: "📱",
  MoreHorizontal: "…",
};

function iconFor(name: string) {
  return ICON_MAP[name] ?? "🛠️";
}

// ─── Section progress steps (visual only) ────────────────────────────────────

const SECTIONS = [
  { id: "category", label: "Category", icon: Briefcase },
  { id: "profession", label: "Profession", icon: Briefcase },
  { id: "extras", label: "Extras", icon: Globe },
  { id: "photo", label: "Photo", icon: Camera },
] as const;

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  categorySlug: string;
  profession: string;
  experience: string;
  price: string;
  location: string;
  languageInput: string;
  languages: string[];
  skillInput: string;
  skills: string[];
  about: string;
  photoUrl: string;
}

const EMPTY: FormState = {
  categorySlug: "",
  profession: "",
  experience: "",
  price: "",
  location: "",
  languageInput: "",
  languages: [],
  skillInput: "",
  skills: [],
  about: "",
  photoUrl: "",
};

// ─── Page component ───────────────────────────────────────────────────────────

function WorkerOnboardingPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Track which sections have been touched to show ✓ in the progress strip
  const [touched, setTouched] = useState<Set<string>>(new Set());

  function markTouched(section: string) {
    setTouched((prev) => new Set([...prev, section]));
  }

  // ── Fetch categories on mount ─────────────────────────────────────────────
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoadingCats(false));
  }, []);

  // ── Generic field setter ──────────────────────────────────────────────────
  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // ── Tag helpers (languages / skills) ─────────────────────────────────────
  function addTag(kind: "languages" | "skills") {
    const inputKey = kind === "languages" ? "languageInput" : "skillInput";
    const raw = form[inputKey].trim();
    if (!raw) return;
    const incoming = raw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    set(kind, Array.from(new Set([...form[kind], ...incoming])));
    set(inputKey as keyof FormState, "");
    markTouched("extras");
  }

  function removeTag(kind: "languages" | "skills", tag: string) {
    set(
      kind,
      form[kind].filter((t) => t !== tag),
    );
  }

  // ── Photo upload ──────────────────────────────────────────────────────────
  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      set("photoUrl", reader.result as string);
      markTouched("photo");
    };
    reader.readAsDataURL(file);
  }

  // ── Derived: selected category object ────────────────────────────────────
  const selectedCat = categories.find((c) => c.slug === form.categorySlug);

  // ── Finish handler ─────────────────────────────────────────────
  async function handleFinish() {
    console.log("========== FINISH BUTTON CLICKED ==========");
    console.log("Raw localStorage:", localStorage.getItem("skillhire.auth"));
    console.log("getUser():", getUser());

    try {
      const user = getUser();

      if (!user) {
        console.error("User is NULL");
        toast.error("Please login again.");
        navigate({ to: "/login" });
        return;
      }

      const payload = {
        categorySlug: form.categorySlug,
        profession: form.profession,
        experience: Number(form.experience),
        price: Number(form.price),
        location: form.location,
        languages: form.languages,
        skills: form.skills,
        about: form.about,
        available: true,
        photoUrl: form.photoUrl || undefined,
      };

      console.log("Sending payload:", payload);

      const result = await saveWorkerProfile(Number(user.id), payload);

      console.log("Worker profile saved:", result);

      toast.success("Worker profile created successfully!");

      navigate({
        to: "/dashboard/worker",
      });
    } catch (error) {
      console.error("SAVE ERROR:", error);
      toast.error("Failed to save worker profile.");
    }
  }
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="gradient-hero flex-1 px-4 py-12">
        <div className="mx-auto w-full max-w-2xl">
          {/* ── Page header ─────────────────────────────────────────────── */}
          <div className="mb-8 flex items-start gap-4">
            <span className="mt-0.5 grid h-12 w-12 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-elevated">
              <Sparkles className="h-6 w-6" />
            </span>
            <div>
              <h1 className="font-display text-3xl font-bold leading-tight">
                Complete Your Worker Profile
              </h1>
              <p className="mt-1 text-muted-foreground">Tell customers about your services</p>
            </div>
          </div>

          {/* ── Progress strip ───────────────────────────────────────────── */}
          <div className="mb-8 flex items-center gap-2">
            {SECTIONS.map((s, i) => {
              const done = touched.has(s.id);
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      done
                        ? "gradient-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {done ? <Check className="h-3 w-3" /> : <s.icon className="h-3 w-3" />}
                    <span className="hidden sm:inline">{s.label}</span>
                  </div>
                  {i < SECTIONS.length - 1 && (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            {/* ── SECTION 1: Category ─────────────────────────────────── */}
            <SectionCard
              number={1}
              title="Your Category"
              description="Pick the trade that best describes your main service."
            >
              {loadingCats ? (
                <div className="flex items-center gap-2 py-6 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Loading categories…</span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {categories.map((cat) => {
                    const selected = form.categorySlug === cat.slug;
                    return (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => {
                          set("categorySlug", cat.slug);
                          markTouched("category");
                        }}
                        className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-3 text-center transition-all duration-150 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                          selected
                            ? "border-primary bg-accent shadow-elevated"
                            : "border-border bg-background hover:border-primary/40"
                        }`}
                      >
                        {selected && (
                          <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Check className="h-2.5 w-2.5" />
                          </span>
                        )}
                        <span
                          className="rounded-lg p-1.5 text-xl"
                          style={{ backgroundColor: cat.color + "22" }}
                        >
                          {iconFor(cat.icon)}
                        </span>
                        <span className="text-xs font-semibold leading-tight">{cat.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Also available as a Select for quick lookup */}
              {!loadingCats && (
                <div className="mt-4">
                  <Label htmlFor="category-select" className="text-xs text-muted-foreground">
                    Or pick from dropdown
                  </Label>
                  <Select
                    value={form.categorySlug}
                    onValueChange={(v) => {
                      set("categorySlug", v);
                      markTouched("category");
                    }}
                  >
                    <SelectTrigger id="category-select" className="mt-1">
                      <SelectValue placeholder="Select a category…" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.slug}>
                          {iconFor(cat.icon)} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </SectionCard>

            {/* ── SECTION 2: Profession + numbers + location ───────────── */}
            <SectionCard
              number={2}
              title="Professional Details"
              description="Help customers understand your expertise and pricing."
            >
              <div className="space-y-4">
                <FieldRow label="Profession / Job title" required htmlFor="profession">
                  <Input
                    id="profession"
                    placeholder={
                      selectedCat
                        ? `e.g. ${selectedCat.name} Specialist`
                        : "e.g. Senior Electrician"
                    }
                    value={form.profession}
                    onChange={(e) => {
                      set("profession", e.target.value);
                      if (e.target.value) markTouched("profession");
                    }}
                  />
                </FieldRow>

                <div className="grid grid-cols-2 gap-4">
                  <FieldRow label="Experience (years)" required htmlFor="experience">
                    <Input
                      id="experience"
                      type="number"
                      min="0"
                      max="60"
                      placeholder="e.g. 5"
                      value={form.experience}
                      onChange={(e) => {
                        set("experience", e.target.value);
                        if (e.target.value) markTouched("profession");
                      }}
                    />
                  </FieldRow>

                  <FieldRow label="Price per hour (₹)" required htmlFor="price">
                    <Input
                      id="price"
                      type="number"
                      min="1"
                      placeholder="e.g. 350"
                      value={form.price}
                      onChange={(e) => {
                        set("price", e.target.value);
                        if (e.target.value) markTouched("profession");
                      }}
                    />
                  </FieldRow>
                </div>

                <FieldRow label="Location / City" required htmlFor="location">
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      className="pl-9"
                      placeholder="e.g. Chennai, Tamil Nadu"
                      value={form.location}
                      onChange={(e) => {
                        set("location", e.target.value);
                        if (e.target.value) markTouched("profession");
                      }}
                    />
                  </div>
                </FieldRow>
              </div>
            </SectionCard>

            {/* ── SECTION 3: Languages, Skills, About ─────────────────── */}
            <SectionCard
              number={3}
              title="Skills & More"
              description="Optional details that help you stand out to customers."
              optional
            >
              <div className="space-y-5">
                {/* Languages */}
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages spoken</Label>
                  <div className="flex gap-2">
                    <Input
                      id="languages"
                      placeholder="e.g. Tamil, Hindi, English"
                      value={form.languageInput}
                      onChange={(e) => set("languageInput", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag("languages");
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={() => addTag("languages")}
                      disabled={!form.languageInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  {form.languages.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {form.languages.map((lang) => (
                        <Badge key={lang} variant="secondary" className="gap-1 pr-1.5">
                          {lang}
                          <button
                            type="button"
                            onClick={() => removeTag("languages", lang)}
                            className="ml-0.5 rounded-full hover:text-destructive focus-visible:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills / Tools</Label>
                  <div className="flex gap-2">
                    <Input
                      id="skills"
                      placeholder="e.g. Pipe fitting, Tile repair"
                      value={form.skillInput}
                      onChange={(e) => set("skillInput", e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addTag("skills");
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                      onClick={() => addTag("skills")}
                      disabled={!form.skillInput.trim()}
                    >
                      Add
                    </Button>
                  </div>
                  {form.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {form.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="gap-1 pr-1.5">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeTag("skills", skill)}
                            className="ml-0.5 rounded-full hover:text-destructive focus-visible:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* About */}
                <div className="space-y-2">
                  <Label htmlFor="about">About me</Label>
                  <Textarea
                    id="about"
                    placeholder="Tell customers what makes you the right person for the job — your experience, certifications, work ethic…"
                    rows={5}
                    maxLength={800}
                    value={form.about}
                    onChange={(e) => {
                      set("about", e.target.value);
                      if (e.target.value) markTouched("extras");
                    }}
                  />
                  <p className="text-right text-[11px] text-muted-foreground">
                    {form.about.length} / 800
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* ── SECTION 4: Profile Photo ─────────────────────────────── */}
            <SectionCard
              number={4}
              title="Profile Photo"
              description="A clear photo builds trust. Max 2 MB — JPEG or PNG."
              optional
            >
              <div className="flex items-center gap-5">
                {/* Avatar preview */}
                {form.photoUrl ? (
                  <div className="relative shrink-0">
                    <img
                      src={form.photoUrl}
                      alt="Profile preview"
                      className="h-20 w-20 rounded-full border-2 border-primary object-cover shadow-soft"
                    />
                    <button
                      type="button"
                      onClick={() => set("photoUrl", "")}
                      className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-destructive text-destructive-foreground shadow"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-2 border-dashed border-border bg-muted text-muted-foreground">
                    <User className="h-7 w-7" />
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {form.photoUrl
                      ? "Looking good! You can replace it if needed."
                      : "Upload a professional headshot or a photo at work."}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Camera className="h-4 w-4" />
                    {form.photoUrl ? "Change photo" : "Upload photo"}
                  </Button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    onChange={handlePhoto}
                  />
                </div>
              </div>
            </SectionCard>

            {/* ── Finish button ────────────────────────────────────────── */}
            <div className="flex items-center justify-between rounded-2xl border bg-card p-5 shadow-soft">
              <div>
                <p className="font-semibold">Ready to go live?</p>
                <p className="text-sm text-muted-foreground">
                  You can edit all details from your dashboard later.
                </p>
              </div>
              <Button size="lg" className="gap-2 shadow-elevated" onClick={handleFinish}>
                <Check className="h-4 w-4" />
                Finish Registration
              </Button>
            </div>
          </div>
          {/* end space-y-6 */}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ─── Reusable sub-components ──────────────────────────────────────────────────

function SectionCard({
  number,
  title,
  description,
  optional,
  children,
}: {
  number: number;
  title: string;
  description: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden shadow-soft">
      {/* Card header */}
      <div className="flex items-center gap-3 border-b bg-surface px-5 py-4">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
          {number}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold leading-snug">{title}</h2>
            {optional && (
              <span className="rounded-md border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                optional
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-5">{children}</div>
    </Card>
  );
}

function FieldRow({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>
        {label}
        {required && (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
    </div>
  );
}

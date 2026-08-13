import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  CalendarCheck,
  Camera,
  CheckCircle2,
  DollarSign,
  Globe,
  ImagePlus,
  LayoutDashboard,
  MapPin,
  MessageSquare,
  Pencil,
  Star,
  ToggleLeft,
  Trash2,
  Upload,
  Wrench,
  Briefcase,
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

import { getWorkerBookings, updateBookingStatus, type Booking } from "@/api/booking";
import { getWorkerByUserId, saveWorkerProfile, type Worker } from "@/api/worker";
import { getCategories, type Category } from "@/api/category";
import {
  getGallery,
  addGalleryPhoto,
  updateProfilePhoto,
  deleteGalleryPhoto,
  fileToBase64,
  type GalleryPhoto,
} from "@/api/gallery";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/worker")({
  component: WorkerDashboard,
});

const items = [
  { to: "/dashboard/worker", label: "Overview", icon: LayoutDashboard },
  { to: "/messages", label: "Messages", icon: MessageSquare },
  { to: "/dashboard/worker", label: "Availability", icon: ToggleLeft },
];

function isStubProfile(worker: Worker) {
  return worker.price === 0 && worker.profession === "General Worker";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Profile setup form ───────────────────────────────────────────────────────

function ProfileSetupForm({ userId, onComplete }: { userId: number; onComplete: () => void }) {
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({
    profession: "",
    categorySlug: "electrician",
    experience: 1,
    price: 300,
    location: "",
    languages: "Hindi, English",
    skills: "",
    about: "",
    available: true,
  });

  const user = getUser();
  const initials = user?.name ? getInitials(user.name) : "?";
  const firstName = user?.name?.split(" ")[0] ?? "there";

  useEffect(() => {
    getCategories()
      .then((cats) => {
        setCategories(cats);
        if (cats.length > 0) setForm((prev) => ({ ...prev, categorySlug: cats[0].slug }));
      })
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.profession.trim() || !form.location.trim() || form.price < 1) {
      toast.error("Please fill in Profession, Location, and Price.");
      return;
    }
    setSaving(true);
    try {
      await saveWorkerProfile(userId, {
        categorySlug: form.categorySlug,
        profession: form.profession.trim(),
        experience: Number(form.experience),
        price: Number(form.price),
        location: form.location.trim(),
        languages: form.languages
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        about: form.about.trim(),
        available: form.available,
      });
      toast.success("Profile saved! You are now visible in search.");
      onComplete();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-3">
      <Card className="flex items-center gap-4 p-5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-semibold text-accent-foreground">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-base">Welcome, {firstName}</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Set up your profile to start receiving bookings from customers nearby.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 shrink-0">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Account active
        </div>
      </Card>

      <Card className="overflow-hidden">
        <form onSubmit={handleSubmit}>
          <SectionHeader
            icon={<Briefcase className="h-4 w-4 text-primary" />}
            title="Basic information"
            subtitle="Your profession and service category"
            iconBg="bg-primary/10"
          />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <FieldGroup label="Profession *">
              <Input
                value={form.profession}
                onChange={(e) => setForm({ ...form, profession: e.target.value })}
                placeholder="e.g. Electrician, Plumber"
              />
            </FieldGroup>
            <FieldGroup label="Category *">
              <select
                value={form.categorySlug}
                onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))
                ) : (
                  <option value="electrician">Electrician</option>
                )}
              </select>
            </FieldGroup>
            <FieldGroup label="Years of experience *">
              <Input
                type="number"
                min={0}
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: Number(e.target.value) })}
              />
            </FieldGroup>
            <FieldGroup label="Price per hour (₹) *">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground pointer-events-none">
                  ₹
                </span>
                <Input
                  type="number"
                  min={1}
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="pl-7"
                />
              </div>
            </FieldGroup>
          </div>

          <SectionHeader
            icon={<MapPin className="h-4 w-4 text-emerald-600" />}
            title="Location and languages"
            subtitle="Where you work and what you speak"
            iconBg="bg-emerald-50"
            bordered
          />
          <div className="grid gap-4 p-5 sm:grid-cols-2">
            <FieldGroup label="City / Location *">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Mumbai"
                  className="pl-9"
                />
              </div>
            </FieldGroup>
            <FieldGroup label="Languages">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  value={form.languages}
                  onChange={(e) => setForm({ ...form, languages: e.target.value })}
                  placeholder="Hindi, English"
                  className="pl-9"
                />
              </div>
            </FieldGroup>
          </div>

          <SectionHeader
            icon={<Wrench className="h-4 w-4 text-amber-600" />}
            title="Skills and about you"
            subtitle="Help customers understand what you do"
            iconBg="bg-amber-50"
            bordered
          />
          <div className="space-y-4 p-5">
            <FieldGroup label="Skills" hint="Separate each skill with a comma">
              <Input
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                placeholder="Wiring, Repair, Panel Installation"
              />
            </FieldGroup>
            <FieldGroup label="About yourself">
              <Textarea
                rows={4}
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
                placeholder="Tell customers about your experience..."
                className="resize-none"
              />
            </FieldGroup>
          </div>

          <div className="border-t bg-muted/40 p-5">
            <div className="mb-4 grid grid-cols-3 gap-3">
              <Tip
                icon={<Star className="h-3.5 w-3.5" />}
                text="Complete profiles get 3× more bookings"
              />
              <Tip
                icon={<Star className="h-3.5 w-3.5" />}
                text="Fair pricing attracts your first customer faster"
              />
              <Tip
                icon={<Pencil className="h-3.5 w-3.5" />}
                text="You can update your profile anytime"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base" size="lg" disabled={saving}>
              {saving ? "Saving..." : "Save profile & go live"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  subtitle,
  iconBg,
  bordered,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconBg: string;
  bordered?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 px-5 py-4 ${bordered ? "border-t" : ""}`}>
      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function FieldGroup({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Tip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 text-primary">{icon}</span>
      <p className="text-xs leading-snug text-muted-foreground">{text}</p>
    </div>
  );
}

// ─── Profile Photo Upload ─────────────────────────────────────────────────────

function ProfilePhotoSection({
  worker,
  onUpdated,
}: {
  worker: Worker;
  onUpdated: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      await updateProfilePhoto(worker.id, base64);
      onUpdated(base64);
      toast.success("Profile photo updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <Camera className="h-4 w-4 text-primary" />
        Profile Photo
      </h2>
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          {worker.photoUrl ? (
            <img
              src={worker.photoUrl}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover border-2 border-border"
            />
          ) : (
            <div className="h-20 w-20 rounded-full border-2 border-dashed border-border flex items-center justify-center text-2xl font-bold text-muted-foreground bg-muted">
              {getInitials(worker.name)}
            </div>
          )}
          <button
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div>
          <p className="text-sm font-medium">{worker.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{worker.profession}</p>
          <Button
            size="sm"
            variant="outline"
            className="mt-3"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-3.5 w-3.5 mr-1.5" />
            {uploading ? "Uploading..." : "Change photo"}
          </Button>
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </Card>
  );
}

// ─── Gallery Section ──────────────────────────────────────────────────────────

function GallerySection({ worker }: { worker: Worker }) {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getGallery(worker.id)
      .then(setPhotos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [worker.id]);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const photo = await addGalleryPhoto(worker.id, base64, caption);
      setPhotos((prev) => [photo, ...prev]);
      setCaption("");
      toast.success("Photo added to gallery!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(photoId: number) {
    try {
      await deleteGalleryPhoto(photoId);
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
      toast.success("Photo deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete photo.");
    }
  }

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
        <ImagePlus className="h-4 w-4 text-primary" />
        Work Gallery
        <span className="ml-auto text-xs font-normal text-muted-foreground">
          {photos.length} photo{photos.length !== 1 ? "s" : ""}
        </span>
      </h2>

      {/* Upload section */}
      <div className="mb-5 rounded-xl border border-dashed border-border bg-muted/30 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Caption (optional)"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="shrink-0"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Uploading..." : "Upload photo"}
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Upload photos of completed work to showcase your skills. Max 5MB per image.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
      </div>

      {/* Gallery grid */}
      {loading && (
        <p className="text-sm text-muted-foreground text-center py-4">Loading gallery...</p>
      )}

      {!loading && photos.length === 0 && (
        <div className="text-center py-8">
          <ImagePlus className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            No photos yet. Upload your first work photo!
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="group relative overflow-hidden rounded-xl border bg-muted aspect-square"
          >
            <img
              src={photo.imageUrl}
              alt={photo.caption || "Work photo"}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
              <div className="w-full p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                {photo.caption && (
                  <p className="text-xs text-white font-medium truncate mb-1">{photo.caption}</p>
                )}
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="flex items-center gap-1 text-xs text-red-300 hover:text-red-200 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

function WorkerDashboard() {
  const [available, setAvailable] = useState(true);
  const [requests, setRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    try {
      const user = getUser();
      if (!user) return;
      const w = await getWorkerByUserId(Number(user.id));
      setWorker(w);
      if (isStubProfile(w)) {
        setNeedsSetup(true);
      } else {
        setNeedsSetup(false);
        setAvailable(w.available);
        const bookings = await getWorkerBookings(w.id);
        setRequests(bookings);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function toggleAvailability(newValue: boolean) {
    setAvailable(newValue);
    try {
      const user = getUser();
      if (!user || !worker) return;
      await saveWorkerProfile(Number(user.id), {
        categorySlug: worker.category,
        profession: worker.profession,
        experience: worker.experience,
        price: worker.price,
        location: worker.location,
        languages: worker.languages,
        skills: worker.skills,
        about: worker.about ?? "",
        available: newValue,
      });
      setWorker((prev) => (prev ? { ...prev, available: newValue } : prev));
      toast.success(newValue ? "You are now available for bookings" : "Bookings paused");
    } catch (err) {
      console.error(err);
      setAvailable(!newValue);
      toast.error("Failed to update availability");
    }
  }

  async function decide(bookingId: number, status: "ACCEPTED" | "CANCELLED") {
    try {
      await updateBookingStatus(bookingId, status);
      setRequests((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
      toast.success(status === "ACCEPTED" ? "Booking accepted" : "Booking declined");
    } catch {
      toast.error("Failed to update booking");
    }
  }

  const today = requests.filter((b) => b.status === "ACCEPTED" || b.status === "IN_PROGRESS");
  const pending = requests.filter((b) => b.status === "PENDING");
  const completed = requests.filter((b) => b.status === "COMPLETED");
  const earnings = completed.reduce((sum, b) => sum + b.price, 0);

  if (!loading && needsSetup) {
    const user = getUser();
    return (
      <DashboardShell title="Worker Dashboard" role="worker" items={items}>
        {user && <ProfileSetupForm userId={Number(user.id)} onComplete={loadDashboard} />}
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Worker Dashboard" role="worker" items={items}>
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Today" value={String(today.length)} icon={CalendarCheck} />
        <StatCard label="Pending" value={String(pending.length)} icon={CalendarCheck} />
        <StatCard label="Completed" value={String(completed.length)} icon={Star} />
        <StatCard label="Earnings" value={`₹${earnings}`} icon={DollarSign} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {/* Profile photo */}
          {worker && (
            <ProfilePhotoSection
              worker={worker}
              onUpdated={(url) => setWorker((prev) => (prev ? { ...prev, photoUrl: url } : prev))}
            />
          )}

          {/* Availability */}
          <Card className="flex items-center justify-between p-5">
            <div>
              <Label htmlFor="avail" className="text-base font-semibold">
                Available for bookings
              </Label>
              <p className="text-xs text-muted-foreground">
                Toggle off to stop receiving requests.
              </p>
            </div>
            <Switch id="avail" checked={available} onCheckedChange={toggleAvailability} />
          </Card>

          {/* Booking Requests */}
          <div>
            <h2 className="text-lg font-bold">Booking Requests</h2>
            <div className="mt-4 space-y-3">
              {loading && <Card className="p-4">Loading...</Card>}
              {!loading && pending.length === 0 && (
                <Card className="p-4">No pending requests.</Card>
              )}
              {pending.map((b) => (
                <Card key={b.id} className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{b.category}</div>
                      <div className="text-xs text-muted-foreground">
                        {b.date} • {b.time}
                      </div>
                    </div>
                    <Badge>₹{b.price}</Badge>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{b.description}</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" onClick={() => decide(b.id, "ACCEPTED")}>
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => decide(b.id, "CANCELLED")}>
                      Decline
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Gallery */}
          {worker && <GallerySection worker={worker} />}

          {/* Today's Schedule */}
          <div>
            <h2 className="text-lg font-bold">Today's Schedule</h2>
            <div className="mt-4 space-y-3">
              {today.map((b) => (
                <Card key={b.id} className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{b.category}</div>
                      <div className="text-xs text-muted-foreground">
                        {b.time} • {b.address}
                      </div>
                    </div>
                    <Badge>{b.status}</Badge>
                  </div>
                </Card>
              ))}
              {!loading && today.length === 0 && (
                <Card className="p-4">Nothing scheduled today.</Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="flex items-center gap-4 p-5">
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      </div>
    </Card>
  );
}

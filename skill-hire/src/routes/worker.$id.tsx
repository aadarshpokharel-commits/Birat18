import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { createBooking } from "@/api/booking";
import { useEffect, useState } from "react";
import { BadgeCheck, Calendar, Globe, MapPin, MessageSquare, Star } from "lucide-react";
import { toast } from "sonner";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { getUser } from "@/lib/auth";
import { Worker, getWorker } from "@/api/worker";
import { getReviews, addReview, type Review } from "@/api/review";
import { getGallery, type GalleryPhoto } from "@/api/gallery";

export const Route = createFileRoute("/worker/$id")({
  component: WorkerProfilePage,
});

function WorkerProfilePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submittingReview, setSubmittingReview] = useState(false);

  const [form, setForm] = useState({ date: "", time: "", address: "", description: "" });

  useEffect(() => {
    async function load() {
      try {
        const workerData = await getWorker(Number(id));
        setWorker(workerData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load worker.");
      } finally {
        setLoading(false);
      }
      try {
        const reviewData = await getReviews(Number(id));
        setReviews(reviewData);
      } catch (err) {
        console.error("Reviews failed to load:", err);
      }
      try {
        const galleryData = await getGallery(Number(id));
        setGallery(galleryData);
      } catch (err) {
        console.error("Gallery failed to load:", err);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center text-muted-foreground">Loading...</div>
    );
  }

  if (!worker) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="grid flex-1 place-items-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold">Worker not found</h1>
            <Button asChild className="mt-4">
              <Link to="/search">Browse workers</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const submitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getUser();
    if (!user) {
      toast.error("Please login first.");
      navigate({ to: "/login" });
      return;
    }
    if (!form.date || !form.time || !form.address) {
      toast.error("Please fill all required fields.");
      return;
    }
    try {
      await createBooking({
        workerId: worker.id,
        customerId: Number(user.id),
        date: form.date,
        time: form.time,
        address: form.address,
        description: form.description,
      });
      toast.success("Booking created successfully!");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create booking.");
    }
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = getUser();
    if (!user) {
      toast.error("Please login to leave a review.");
      navigate({ to: "/login" });
      return;
    }
    if (!reviewForm.comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }
    setSubmittingReview(true);
    try {
      const newReview = await addReview(
        worker.id,
        Number(user.id),
        reviewForm.rating,
        reviewForm.comment.trim(),
      );
      setReviews((prev) => [newReview, ...prev]);
      setReviewOpen(false);
      setReviewForm({ rating: 5, comment: "" });
      toast.success("Review submitted! Thank you.");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        "Failed to submit review.";
      toast.error(msg);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        {/* ── Hero card ── */}
        <div className="relative overflow-hidden rounded-2xl gradient-primary p-7 text-primary-foreground">
          {/* decorative circles */}
          <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-10 right-12 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative flex items-start gap-5">
            {/* avatar */}
            {worker.photoUrl ? (
              <img
                src={worker.photoUrl}
                alt={worker.name}
                className="h-20 w-20 shrink-0 rounded-2xl border-2 border-white/30 object-cover shadow-lg"
              />
            ) : (
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-2 border-white/30 bg-white/15 text-2xl font-semibold text-white shadow-lg">
                {worker.initials}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-bold">{worker.name}</h1>
                {worker.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm border border-white/20">
                    <BadgeCheck className="h-3 w-3" /> Verified
                  </span>
                )}
                {worker.available && (
                  <span className="rounded-full bg-green-400/20 px-2.5 py-0.5 text-xs font-medium text-green-100 border border-green-300/20">
                    Available now
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-primary-foreground/75">
                {worker.profession}
                {worker.location && (
                  <span>
                    {" "}
                    · <MapPin className="inline h-3 w-3 mb-0.5" /> {worker.location}
                  </span>
                )}
              </p>

              {/* stats row */}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {[
                  { label: "Rating", value: `${worker.rating} ★` },
                  { label: "Reviews", value: String(reviews.length) },
                  {
                    label: "Experience",
                    value: `${worker.experience} yr${worker.experience !== 1 ? "s" : ""}`,
                  },
                  { label: "Per hour", value: `₹${worker.price}` },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="text-lg font-bold">{value}</div>
                    <div className="text-[11px] text-primary-foreground/60 uppercase tracking-wide">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Languages + skills ── */}
        <Card className="mt-3 p-5">
          {worker.languages.length > 0 && (
            <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4 shrink-0" />
              {worker.languages.join(", ")}
            </div>
          )}
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border bg-accent/40 px-3 py-1 text-xs font-medium text-accent-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>

        {/* ── About ── */}
        {worker.about && (
          <Card className="mt-3 p-5">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              About
            </p>
            <p className="text-sm leading-relaxed text-foreground">{worker.about}</p>
          </Card>
        )}

        {/* ── Gallery ── */}
        {gallery.length > 0 && (
          <Card className="mt-3 p-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Work gallery <span className="normal-case font-normal">({gallery.length})</span>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {gallery.map((photo) => (
                <div
                  key={photo.id}
                  className="aspect-square overflow-hidden rounded-xl border bg-muted"
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || "Work photo"}
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ── Reviews ── */}
        <Card className="mt-3 p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Reviews{" "}
              {reviews.length > 0 && (
                <span className="normal-case font-normal">({reviews.length})</span>
              )}
            </p>
            <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                  <Star className="h-3.5 w-3.5" /> Write a review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Review {worker.name}</DialogTitle>
                </DialogHeader>
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <Label>Rating</Label>
                    <div className="mt-2 flex gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-7 w-7 transition-colors ${star <= reviewForm.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="comment">Your review</Label>
                    <Textarea
                      id="comment"
                      rows={4}
                      placeholder="Share your experience..."
                      value={reviewForm.comment}
                      onChange={(e) =>
                        setReviewForm((prev) => ({ ...prev, comment: e.target.value }))
                      }
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="w-full" disabled={submittingReview}>
                      {submittingReview ? "Submitting..." : "Submit review"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {reviews.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet. Be the first to review!</p>
          )}

          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border bg-muted/30 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{review.reviewerName}</p>
                    <div className="flex text-yellow-400 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-current" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Book / Chat CTA ── */}
        <Card className="mt-3 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Starting at</p>
              <p className="font-display text-3xl font-bold mt-0.5">
                ₹{worker.price}
                <span className="text-sm font-normal text-muted-foreground">/hr</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/messages">
                  <MessageSquare className="h-4 w-4 mr-1.5" /> Chat
                </Link>
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Calendar className="h-4 w-4 mr-1.5" /> Book now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book {worker.name}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={submitBooking} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time">Time</Label>
                        <Input
                          id="time"
                          type="time"
                          value={form.time}
                          onChange={(e) => setForm({ ...form, time: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={form.address}
                        placeholder="Street, City"
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Describe the job</Label>
                      <Textarea
                        id="description"
                        rows={3}
                        value={form.description}
                        placeholder="Explain your problem..."
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="w-full">
                        Confirm booking
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t pt-4">
            <div className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 text-primary" /> Background verified
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 text-primary" /> {worker.completedJobs} jobs completed
            </div>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

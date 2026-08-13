import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Search, SlidersHorizontal } from "lucide-react";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WorkerCard } from "@/components/worker-card";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import { getWorkers, type Worker } from "@/api/worker";
import { getCategories, type Category } from "@/api/category";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
});

export const Route = createFileRoute("/search")({
  validateSearch: (s) => searchSchema.parse(s),
  component: SearchPage,
});

function SearchPage() {
  const { q: initialQ, category: initialCat } = Route.useSearch();

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [q, setQ] = useState(initialQ ?? "");
  const [category, setCategory] = useState(initialCat ?? "all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState("0");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("rating");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [workerData, categoryData] = await Promise.all([getWorkers(), getCategories()]);

      setWorkers(workerData);
      setCategories(categoryData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = workers.filter((w) => {
      if (category !== "all" && w.category !== category) return false;

      if (query && !`${w.name} ${w.profession} ${w.location}`.toLowerCase().includes(query))
        return false;

      if (w.price > maxPrice) return false;

      if (w.rating < Number(minRating)) return false;

      if (availableOnly && !w.available) return false;

      return true;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;

      case "experience":
        list = [...list].sort((a, b) => b.experience - a.experience);
        break;

      default:
        list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [workers, q, category, maxPrice, minRating, availableOnly, sort]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading workers...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main>
        <div className="border-b bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="font-display text-3xl font-bold">Find your pro</h1>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-xl border bg-card px-3 shadow-soft">
                <Search className="h-4 w-4 text-muted-foreground" />

                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by name, service or city"
                  className="border-0 shadow-none focus-visible:ring-0"
                />
              </div>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-56">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>

                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.slug}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <aside className="space-y-6 rounded-2xl border bg-card p-5 shadow-soft h-fit lg:sticky lg:top-24">
            <div className="flex items-center gap-2 font-semibold">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Max price · ₹{maxPrice}/hr
              </Label>

              <Slider
                min={100}
                max={2000}
                step={50}
                value={[maxPrice]}
                onValueChange={(v) => setMaxPrice(v[0])}
                className="mt-3"
              />
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Minimum rating
              </Label>

              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="0">Any</SelectItem>
                  <SelectItem value="4">4.0+</SelectItem>
                  <SelectItem value="4.5">4.5+</SelectItem>
                  <SelectItem value="4.8">4.8+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="avail">Available only</Label>

              <Switch id="avail" checked={availableOnly} onCheckedChange={setAvailableOnly} />
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Sort by
              </Label>

              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="rating">Highest rated</SelectItem>
                  <SelectItem value="price-asc">Price · low to high</SelectItem>
                  <SelectItem value="price-desc">Price · high to low</SelectItem>
                  <SelectItem value="experience">Most experienced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </aside>

          <div>
            <div className="mb-4 text-sm text-muted-foreground">
              {results.length} worker{results.length !== 1 ? "s" : ""} found
            </div>

            {results.length === 0 ? (
              <div className="rounded-2xl border bg-card p-10 text-center">
                <div className="font-semibold">No workers match your filters</div>

                <p className="mt-1 text-sm text-muted-foreground">Try widening your search.</p>

                <Link
                  to="/search"
                  className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
                >
                  Reset filters
                </Link>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

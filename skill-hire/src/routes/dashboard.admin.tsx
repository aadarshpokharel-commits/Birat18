import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BadgeCheck,
  BookOpen,
  DollarSign,
  LayoutDashboard,
  ShieldAlert,
  Trash2,
  Users,
  Wrench,
} from "lucide-react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { toast } from "sonner";
import {
  getAdminStats,
  getAdminUsers,
  getAdminWorkers,
  getAdminBookings,
  deleteUser,
  type AdminStats,
  type AdminUser,
} from "@/api/admin";
import { getCategories, type Category } from "@/api/category";
import type { Worker } from "@/api/worker";
import type { Booking } from "@/api/booking";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — SkillHire" },
      { name: "description", content: "SkillHire operator console." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});

const items = [
  { to: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/admin", label: "Users", icon: Users },
  { to: "/dashboard/admin", label: "Workers", icon: Wrench },
  { to: "/dashboard/admin", label: "Bookings", icon: BookOpen },
  { to: "/dashboard/admin", label: "Reports", icon: ShieldAlert },
];

type Tab = "overview" | "users" | "workers" | "bookings";

function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [s, u, w, b, c] = await Promise.all([
          getAdminStats(),
          getAdminUsers(),
          getAdminWorkers(),
          getAdminBookings(),
          getCategories(),
        ]);
        setStats(s);
        setUsers(u);
        setWorkers(w);
        setBookings(b);
        setCategories(c);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleDeleteUser(id: number, name: string) {
    if (!confirm(`Delete user "${name}"? This cannot be undone.`)) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success("User deleted.");
    } catch {
      toast.error("Failed to delete user.");
    }
  }

  const activeWorkers = workers.filter((w) => w.available);
  const totalRevenue = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((sum, b) => sum + b.price, 0);

  return (
    <DashboardShell title="Admin console" role="admin" items={items}>
      {/* Tab bar */}
      <div className="flex gap-2 border-b pb-3 mb-6 flex-wrap">
        {(["overview", "users", "workers", "bookings"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      )}

      {/* ── OVERVIEW ── */}
      {!loading && tab === "overview" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Kpi
              label="Total users"
              value={String(stats?.totalUsers ?? 0)}
              icon={Users}
              color="bg-blue-50 text-blue-600"
            />
            <Kpi
              label="Total workers"
              value={String(stats?.totalWorkers ?? 0)}
              icon={Wrench}
              color="bg-purple-50 text-purple-600"
            />
            <Kpi
              label="Total bookings"
              value={String(stats?.totalBookings ?? 0)}
              icon={BookOpen}
              color="bg-amber-50 text-amber-600"
            />
            <Kpi
              label="Revenue earned"
              value={`₹${totalRevenue.toLocaleString()}`}
              icon={DollarSign}
              color="bg-green-50 text-green-600"
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Recent workers */}
            <Card className="p-6 lg:col-span-2">
              <h2 className="font-display text-lg font-bold mb-4">Worker profiles</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Profession</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workers
                      .filter((w) => w.price > 0)
                      .slice(0, 8)
                      .map((w) => (
                        <TableRow key={w.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {w.photoUrl ? (
                                <img
                                  src={w.photoUrl}
                                  className="h-7 w-7 rounded-full object-cover"
                                  alt=""
                                />
                              ) : (
                                <div
                                  className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-white"
                                  style={{ backgroundColor: w.color }}
                                >
                                  {w.initials}
                                </div>
                              )}
                              {w.name}
                            </div>
                          </TableCell>
                          <TableCell>{w.profession}</TableCell>
                          <TableCell>{w.location}</TableCell>
                          <TableCell>₹{w.price}/hr</TableCell>
                          <TableCell>
                            {w.available ? (
                              <Badge className="gap-1 bg-green-100 text-green-700 border-green-200">
                                <BadgeCheck className="h-3 w-3" /> Active
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Offline</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* Categories breakdown */}
            <Card className="p-6">
              <h2 className="font-display text-lg font-bold mb-4">Categories</h2>
              <div className="space-y-3">
                {categories.slice(0, 8).map((c) => {
                  const max = Math.max(...categories.map((x) => x.workers), 1);
                  const pct = Math.round((c.workers / max) * 100);
                  return (
                    <div key={c.slug}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.workers} pros</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full gradient-primary transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Recent bookings */}
          <Card className="mt-6 p-6">
            <h2 className="font-display text-lg font-bold mb-4">Recent bookings</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Worker</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.slice(0, 10).map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="text-muted-foreground">#{b.id}</TableCell>
                      <TableCell>{b.customerName}</TableCell>
                      <TableCell>{b.workerName}</TableCell>
                      <TableCell className="capitalize">{b.category}</TableCell>
                      <TableCell>{b.date}</TableCell>
                      <TableCell>₹{b.price}</TableCell>
                      <TableCell>
                        <StatusBadge status={b.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </>
      )}

      {/* ── USERS ── */}
      {!loading && tab === "users" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold">All users ({users.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="text-muted-foreground">#{u.id}</TableCell>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <RoleBadge role={u.role} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteUser(u.id, u.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* ── WORKERS ── */}
      {!loading && tab === "workers" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold">All workers ({workers.length})</h2>
            <div className="text-sm text-muted-foreground">{activeWorkers.length} active</div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Worker</TableHead>
                  <TableHead>Profession</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workers.map((w) => (
                  <TableRow key={w.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {w.photoUrl ? (
                          <img
                            src={w.photoUrl}
                            className="h-8 w-8 rounded-full object-cover"
                            alt=""
                          />
                        ) : (
                          <div
                            className="grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white shrink-0"
                            style={{ backgroundColor: w.color }}
                          >
                            {w.initials}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-sm">{w.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {w.completedJobs} jobs
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{w.profession}</TableCell>
                    <TableCell className="capitalize">{w.category}</TableCell>
                    <TableCell>{w.location || "—"}</TableCell>
                    <TableCell>{w.price > 0 ? `₹${w.price}/hr` : "—"}</TableCell>
                    <TableCell>{w.rating ? `${w.rating} ★` : "—"}</TableCell>
                    <TableCell>
                      {w.price === 0 ? (
                        <Badge variant="secondary">Setup pending</Badge>
                      ) : w.available ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Offline</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* ── BOOKINGS ── */}
      {!loading && tab === "bookings" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold">All bookings ({bookings.length})</h2>
            <div className="text-sm text-muted-foreground">
              ₹
              {bookings
                .filter((b) => b.status === "COMPLETED")
                .reduce((s, b) => s + b.price, 0)
                .toLocaleString()}{" "}
              earned
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Worker</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="text-muted-foreground">#{b.id}</TableCell>
                    <TableCell className="font-medium">{b.customerName}</TableCell>
                    <TableCell>{b.workerName}</TableCell>
                    <TableCell className="capitalize">{b.category}</TableCell>
                    <TableCell>{b.date}</TableCell>
                    <TableCell className="max-w-[120px] truncate text-muted-foreground">
                      {b.address}
                    </TableCell>
                    <TableCell>₹{b.price}</TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </DashboardShell>
  );
}

function Kpi({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 font-display text-2xl font-bold">{value}</div>
      </div>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
    ACCEPTED: "bg-blue-100 text-blue-700 border-blue-200",
    IN_PROGRESS: "bg-purple-100 text-purple-700 border-purple-200",
    COMPLETED: "bg-green-100 text-green-700 border-green-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = {
    ADMIN: "bg-red-100 text-red-700 border-red-200",
    WORKER: "bg-blue-100 text-blue-700 border-blue-200",
    CUSTOMER: "bg-green-100 text-green-700 border-green-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${map[role] ?? "bg-muted text-muted-foreground"}`}
    >
      {role}
    </span>
  );
}

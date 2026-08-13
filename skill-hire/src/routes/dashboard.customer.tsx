import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarCheck, Heart, LayoutDashboard, MessageSquare, User } from "lucide-react";
import { useEffect, useState } from "react";

import { DashboardShell } from "@/components/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WorkerCard } from "@/components/worker-card";

import { getCustomerBookings, type Booking } from "@/api/booking";
import { getWorkers, type Worker } from "@/api/worker";
import { getUser } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/customer")({
  head: () => ({
    meta: [
      {
        title: "Customer Dashboard — SkillHire",
      },
    ],
  }),

  component: CustomerDashboard,
});

const items = [
  {
    to: "/dashboard/customer",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    to: "/search",
    label: "Find workers",
    icon: User,
  },
  {
    to: "/messages",
    label: "Messages",
    icon: MessageSquare,
  },
];

const badgeColor: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function CustomerDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const user = getUser();

      if (!user) return;

      const bookingData = await getCustomerBookings(Number(user.id));
      const workerData = await getWorkers();

      setBookings(bookingData);
      setWorkers(workerData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const upcoming = bookings.filter((b) => b.status !== "COMPLETED" && b.status !== "CANCELLED");

  const history = bookings.filter((b) => b.status === "COMPLETED" || b.status === "CANCELLED");

  const favouriteWorkers = workers.slice(0, 3);

  return (
    <DashboardShell title="Your Dashboard" role="customer" items={items}>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Upcoming" value={upcoming.length} icon={CalendarCheck} />

        <StatCard label="Completed" value={history.length} icon={CalendarCheck} />

        <StatCard label="Workers" value={workers.length} icon={Heart} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHead title="Upcoming Bookings" />

          <div className="mt-4 space-y-4">
            {loading && <Card className="p-5">Loading...</Card>}

            {!loading && upcoming.length === 0 && <EmptyBookings />}

            {upcoming.map((booking) => (
              <Card key={booking.id} className="flex flex-wrap items-center gap-4 p-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-white">
                  <CalendarCheck className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <div className="font-semibold">
                    {booking.category} — {booking.workerName}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {booking.date} · {booking.time}
                  </div>

                  <div className="text-xs text-muted-foreground">{booking.address}</div>
                </div>

                <Badge className={badgeColor[booking.status]}>{booking.status}</Badge>

                <div className="font-semibold">₹{booking.price}</div>
              </Card>
            ))}
          </div>

          <div className="mt-10">
            <SectionHead title="Booking History" />

            <div className="mt-4 space-y-4">
              {history.map((booking) => (
                <Card key={booking.id} className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-semibold">
                      {booking.category} — {booking.workerName}
                    </div>

                    <div className="text-xs text-muted-foreground">{booking.date}</div>
                  </div>

                  <Badge className={badgeColor[booking.status]}>{booking.status}</Badge>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionHead title="Available Workers" />

          <div className="mt-4 space-y-4">
            {favouriteWorkers.map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
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
  value: number;
  icon: React.ComponentType<{
    className?: string;
  }>;
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

function SectionHead({ title }: { title: string }) {
  return <h2 className="text-lg font-bold">{title}</h2>;
}

function EmptyBookings() {
  return (
    <Card className="p-8 text-center">
      <p className="text-muted-foreground">No bookings yet.</p>

      <Button asChild className="mt-4">
        <Link to="/search">Find a Worker</Link>
      </Button>
    </Card>
  );
}

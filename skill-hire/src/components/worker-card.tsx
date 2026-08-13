import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import type { Worker } from "@/api/worker";

type WorkerCardProps = {
  readonly worker: Worker;
};

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <Card className="group flex h-full flex-col overflow-hidden p-5 transition-all hover:-translate-y-1 hover:shadow-elevated">
      <div className="flex items-start gap-4">
        {/* Avatar — shows photo if available, otherwise initials */}
        {worker.photoUrl ? (
          <img
            src={worker.photoUrl}
            alt={worker.name}
            className="h-14 w-14 flex-none rounded-2xl object-cover shadow-soft"
          />
        ) : (
          <div
            className="grid h-14 w-14 flex-none place-items-center rounded-2xl text-lg font-semibold text-white shadow-soft"
            style={{
              backgroundColor:
                worker.color ??
                "#" +
                  Math.floor(Math.random() * 16777215)
                    .toString(16)
                    .padStart(6, "0"),
            }}
          >
            {worker.initials}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold">{worker.name}</h3>
            {worker.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
          </div>

          <p className="text-sm text-muted-foreground">{worker.profession}</p>

          <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
              <span className="font-medium text-foreground">{worker.rating}</span>
              <span>({worker.reviewsCount})</span>
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {worker.location}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {worker.skills.slice(0, 3).map((skill) => (
          <Badge key={skill} variant="secondary" className="rounded-full font-normal">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Starting from</div>
          <div className="font-display text-xl font-bold">
            ₹{worker.price}
            <span className="text-xs font-normal text-muted-foreground">/hr</span>
          </div>
        </div>

        <Button asChild size="sm">
          <Link to="/worker/$id" params={{ id: String(worker.id) }}>
            View
          </Link>
        </Button>
      </div>
    </Card>
  );
}

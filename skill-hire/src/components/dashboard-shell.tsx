import { type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/use-auth";
import { logout, type Role } from "@/lib/auth";

interface Item {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function DashboardShell({
  title,
  role,
  items,
  children,
}: {
  title: string;
  role: Role;
  items: Item[];
  children: ReactNode;
}) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  if (ready && (!user || user.role !== role)) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface px-4">
        <div className="max-w-md rounded-2xl border bg-card p-8 text-center shadow-soft">
          <h1 className="font-display text-2xl font-bold">Access restricted</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in as a {role} to view this dashboard.
          </p>
          <Button className="mt-4" onClick={() => navigate({ to: "/login" })}>
            Go to login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-64 flex-col border-r bg-card p-5 md:flex">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <img src="/logo.png" alt="SkillHire" className="h-9 w-9 rounded-xl object-contain" />
          SkillHire
        </Link>
        <nav className="mt-8 flex-1 space-y-1">
          {items.map((i) => (
            <a
              key={i.to}
              href={i.to}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <i.icon className="h-4 w-4" />
              {i.label}
            </a>
          ))}
        </nav>
        <Button
          variant="ghost"
          className="justify-start"
          onClick={() => {
            logout();
            navigate({ to: "/" });
          }}
        >
          <LogOut className="h-4 w-4" /> Sign out
        </Button>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-4 sm:px-8">
            <div>
              <h1 className="font-display text-xl font-bold">{title}</h1>
              <p className="text-xs text-muted-foreground">
                Welcome back{user ? `, ${user.name}` : ""}
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">View site</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

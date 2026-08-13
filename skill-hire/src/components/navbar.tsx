import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, MessageSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/use-auth";
import { dashboardPath, logout, getUser } from "@/lib/auth";
import { getUnreadCount } from "@/api/message";

const navLinks = [
  { to: "/search", label: "Find Workers" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);

  // Poll unread count every 5 seconds when logged in
  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) return;

    const userId = Number(currentUser.id);

    async function fetchUnread() {
      try {
        const count = await getUnreadCount(userId);
        setUnread(count);
      } catch {
        // silently ignore
      }
    }

    fetchUnread();
    const interval = setInterval(fetchUnread, 3000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{
        background: "linear-gradient(90deg, #0d1b2a 0%, #1b2d45 50%, #1a3353 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <img src="/logo.png" alt="SkillHire" className="h-9 w-9 rounded-xl object-contain" />
          SkillHire
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              activeProps={{ className: "text-white bg-white/15" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search workers"
            className="text-white/70 hover:bg-white/10 hover:text-white"
            onClick={() => navigate({ to: "/search" })}
          >
            <Search className="h-4 w-4" />
          </Button>

          {user && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Messages"
              className="relative h-8 w-8 rounded-lg bg-white/15 hover:bg-white/25 text-white"
              onClick={() => {
                setUnread(0);
                navigate({ to: "/messages" });
              }}
            >
              <MessageSquare className="h-4 w-4" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </Button>
          )}

          {user ? (
            <>
              <Button
                variant="ghost"
                className="text-white/90 hover:bg-white/10 hover:text-white"
                onClick={() => navigate({ to: dashboardPath(user.role) })}
              >
                {user.name}
              </Button>
              <Button
                onClick={() => {
                  logout();
                  navigate({ to: "/" });
                }}
                style={{
                  background: "linear-gradient(135deg, #f97316, #ea580c)",
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate({ to: "/login" })}>
                Login
              </Button>
              <Button
                onClick={() => navigate({ to: "/register" })}
                style={{
                  background: "linear-gradient(135deg, #00c9a7, #00a86b)",
                  border: "none",
                  color: "white",
                  fontWeight: 600,
                }}
              >
                Become a Worker
              </Button>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="mt-8 flex flex-col gap-2">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              {user && (
                <Link
                  to="/messages"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
                  onClick={() => setUnread(0)}
                >
                  <MessageSquare className="h-4 w-4" />
                  Messages
                  {unread > 0 && (
                    <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </Link>
              )}
              <div className="mt-4 flex flex-col gap-2 border-t pt-4">
                {user ? (
                  <>
                    <Button onClick={() => navigate({ to: dashboardPath(user.role) })}>
                      Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        navigate({ to: "/" });
                      }}
                    >
                      Sign out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => navigate({ to: "/login" })}>
                      Login
                    </Button>
                    <Button
                      onClick={() => navigate({ to: "/register" })}
                      style={{
                        background: "linear-gradient(135deg, #00c9a7, #00a86b)",
                        border: "none",
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      Become a Worker
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

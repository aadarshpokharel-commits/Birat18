import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { dashboardPath, setUser, type Role } from "@/lib/auth";
import { loginUser } from "@/api/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — SkillHire" },
      {
        name: "description",
        content: "Login to your SkillHire account as a customer, worker or admin.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [role, setRole] = useState<Role>("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter email and password");
      return;
    }

    try {
      const response = await loginUser(email, password);

      console.log("LOGIN RESPONSE:", response);

      setUser({
        id: String(response.id),
        name: response.name,
        email: response.email,
        role: response.role.toLowerCase() as Role,
      });

      console.log("Saved user in localStorage:", localStorage.getItem("skillhire.auth"));

      toast.success(`Welcome back, ${response.name}!`);

      navigate({
        to: dashboardPath(response.role.toLowerCase() as Role),
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="gradient-hero flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md p-8 shadow-elevated">
          <div className="mb-6 flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl gradient-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>

            <div>
              <h1 className="font-display text-2xl font-bold">Welcome back</h1>
              <p className="text-sm text-muted-foreground">Login to continue</p>
            </div>
          </div>

          <Tabs value={role} onValueChange={(v) => setRole(v as Role)}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="worker">Worker</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value={role} className="mt-6">
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Login
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link to="/register" className="font-semibold text-primary hover:underline">
              Register
            </Link>
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

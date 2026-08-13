import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { Role } from "@/lib/auth";
import { registerUser } from "@/api/auth";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — SkillHire" },
      {
        name: "description",
        content: "Create a SkillHire account as a customer or become a verified worker in seconds.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [role, setRole] = useState<Role>("customer");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("Fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await registerUser(form.name, form.email, form.password, role);

      toast.success("Account created! Please log in.");

      navigate({ to: "/login" });
    } catch (error: unknown) {
      console.error(error);

      // The backend GlobalExceptionHandler returns { error: "...", status: ... }
      // Check both .error and .message to be safe
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              error?: string;
              message?: string;
            };
          };
        };
        const msg =
          axiosError.response?.data?.error ||
          axiosError.response?.data?.message ||
          "Registration failed";
        toast.error(msg);
      } else {
        toast.error("Registration failed. Is the server running?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="gradient-hero flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md p-8 shadow-elevated">
          <div className="mb-6 flex items-center gap-2">
            <img src="/logo.png" alt="SkillHire" className="h-10 w-10 rounded-xl object-contain" />

            <div>
              <h1 className="font-display text-2xl font-bold">Create your account</h1>
              <p className="text-sm text-muted-foreground">Join SkillHire in seconds</p>
            </div>
          </div>

          <Tabs value={role} onValueChange={(v) => setRole(v as Role)}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="customer">I need help</TabsTrigger>
              <TabsTrigger value="worker">I'm a worker</TabsTrigger>
            </TabsList>

            <TabsContent value={role} className="mt-6">
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="At least 6 characters"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </main>

      <Footer />
    </div>
  );
}

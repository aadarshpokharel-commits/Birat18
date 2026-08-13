import { useEffect, useState } from "react";
import { getUser, type User } from "./auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setUser(getUser());
    setReady(true);
    const on = () => setUser(getUser());
    window.addEventListener("skillhire:auth", on);
    window.addEventListener("storage", on);
    return () => {
      window.removeEventListener("skillhire:auth", on);
      window.removeEventListener("storage", on);
    };
  }, []);
  return { user, ready };
}

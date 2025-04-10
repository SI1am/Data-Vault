"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/about", "/contact"];
const AUTH_ROUTES = ["/login", "/signup"];

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (loading) return;

    // 🚫 Not authenticated, and trying to access a protected route
    if (!user && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/login");
      return;
    }

    // ✅ Authenticated and trying to access login/signup
    if (user && AUTH_ROUTES.includes(pathname)) {
      router.replace("/my-files");
      return;
    }

    setIsAllowed(true);
  }, [user, loading, pathname, router]);

  if (loading || !isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return children;
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";
import { LogOut, User as UserIcon, Moon, Sun } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
      setMounted(true);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/95 dark:supports-backdrop-filter:bg-zinc-900/60">
        <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-7 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-sm sm:size-8">
                <span className="text-xs font-bold sm:text-sm">D</span>
              </div>
              <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
                Dashboard
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Spinner className="size-5 text-zinc-600 dark:text-zinc-400" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Loading...
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-zinc-800 dark:bg-zinc-900/95 dark:supports-backdrop-filter:bg-zinc-900/60">
      <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-7 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-sm sm:size-8">
              <span className="text-xs font-bold sm:text-sm">D</span>
            </div>
            <div className="text-lg font-bold text-zinc-900 dark:text-zinc-100 sm:text-xl">
              Dashboard
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {user && (
              <>
                <div className="hidden items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-800/50 md:flex">
                  <div className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-white shadow-sm">
                    <UserIcon className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {user.email}
                    </span>
                    {user.user_metadata?.full_name && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {user.user_metadata.full_name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex size-8 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-white shadow-sm md:hidden">
                  <UserIcon className="size-4" />
                </div>

                {mounted && (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() =>
                      setTheme(resolvedTheme === "dark" ? "light" : "dark")
                    }
                    className="size-8 border-zinc-300 dark:border-zinc-700"
                    aria-label="Toggle dark mode"
                  >
                    {resolvedTheme === "dark" ? (
                      <Sun className="size-4 text-amber-500" />
                    ) : (
                      <Moon className="size-4 text-slate-700" />
                    )}
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="gap-1.5 border-zinc-300 hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:hover:bg-red-950/20 dark:hover:text-red-400 sm:gap-2"
                >
                  <LogOut className="size-3.5 sm:size-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { supabase } from "@/lib/supabase-browser";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  useEffect(() => {
    // If there is an auth code in the URL, exchange it for a session.
    // (Supabase puts ?code=... & ?state=...)
    supabase.auth.exchangeCodeForSession().then(() => {
      router.replace(next);
    });
  }, [router, next]);

  return (
    <div className="grid min-h-[60vh] place-items-center">
      <p className="text-sm text-muted-foreground">Signing you in…</p>
    </div>
  );
}

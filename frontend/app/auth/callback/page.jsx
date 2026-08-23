"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");

  // Declare function before using it inside useEffect
 async function exchangeCodeForTokens(state, code) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    // Format body as form-urlencoded using URLSearchParams
    const details = new URLSearchParams({
      state: state,
      code: code,
    });

    const res = await fetch(
      `${backendUrl}/auth/o/google-oauth2/?${details.toString()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      router.push("/dashboard");
    } else {
      console.error("Djoser error response:", data);
      setError("Google authentication failed.");
    }
  } catch (err) {
    setError("An error occurred during authentication.");
  }
}

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    // Defer state updates so the effect only schedules the authentication work.
    queueMicrotask(() => {
      if (state && code) {
        exchangeCodeForTokens(state, code);
      } else {
        setError("Invalid OAuth callback parameters.");
      }
    });
  }, [searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
          {error}
        </div>
      ) : (
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-violet-600 border-t-transparent" />
          <p className="font-medium text-slate-600">Completing Google Sign-In...</p>
        </div>
      )}
    </div>
  );
}
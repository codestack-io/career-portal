"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const processingRef = useRef(false);

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    // Prevent React double-invocation in dev mode
    if (processingRef.current) return;

    if (!state || !code) {
      setError("Missing state or authorization code from Google.");
      return;
    }

    async function exchangeCodeForTokens() {
      processingRef.current = true; // Lock execution

      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

        // Djoser expects x-www-form-urlencoded format
        const bodyParams = new URLSearchParams();
        bodyParams.append("state", state);
        bodyParams.append("code", code);
        bodyParams.append("redirect_uri", "http://localhost:3000/oauth/callback");

        const res = await fetch(`${backendUrl}/auth/o/google-oauth2/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyParams.toString(),
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          router.push("/dashboard");
        } else {
          console.error(`Backend Error (${res.status}):`, data);
          const message =
            data.non_field_errors?.[0] ||
            data.detail ||
            data.state?.[0] ||
            data.code?.[0] ||
            "Google authentication failed.";
          setError(message);
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("An error occurred during authentication.");
      }
    }

    exchangeCodeForTokens();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600 shadow-sm">
          <p className="font-semibold mb-1">Authentication Error</p>
          <p className="text-sm">{error}</p>
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

export default function OAuthCallback() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
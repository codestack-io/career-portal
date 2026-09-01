"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState("");
  const hasExecuted = useRef(false);

  async function exchangeCodeForTokens(state, code) {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

      // Send x-www-form-urlencoded payload including redirect_uri
      const formData = new URLSearchParams();
      formData.append("state", decodeURIComponent(state));
      formData.append("code", decodeURIComponent(code));
      formData.append("redirect_uri", "http://localhost:3000/oauth/callback");

      const res = await fetch(`${backendUrl}/auth/o/google-oauth2/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formData.toString(),
      });

      const responseText = await res.text();
      let data = {};
      try {
        data = JSON.parse(responseText);
      } catch {
        console.error("Non-JSON Response received:", responseText);
      }

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

  useEffect(() => {
    if (hasExecuted.current) return;

    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (state && code) {
      hasExecuted.current = true;
      exchangeCodeForTokens(state, code);
    } else {
      setError("Invalid OAuth callback parameters.");
    }
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

export default function OAuthCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
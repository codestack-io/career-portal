"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ranRef = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (ranRef.current) return;
    ranRef.current = true;

    const exchangeCodeForTokens = async () => {
      const code = searchParams.get("code");
      const state = searchParams.get("state");

      if (!code) {
        setError("Authorization code is missing.");
        return;
      }

      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

      try {
        const response = await fetch(`${backendUrl}/auth/o/google-oauth2/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            code: code,
            state: state || "",
          }),
        });

        const text = await response.text();

        if (response.ok) {
          const data = JSON.parse(text);
          // Store tokens returned by Djoser / SimpleJWT
          if (data.access) localStorage.setItem("access_token", data.access);
          if (data.refresh) localStorage.setItem("refresh_token", data.refresh);

          // Redirect user to their dashboard or home page
          router.push("/dashboard");
        } else {
          console.error(`Backend Token Exchange Error (${response.status}):`, text);
          setError("Failed to complete Google login. Please try again.");
        }
      } catch (err) {
        console.error("OAuth Error:", err);
        setError("Network error during Google authentication.");
      }
    };

    exchangeCodeForTokens();
  }, [searchParams, router]);

  if (error) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm border border-slate-100">
          <p className="text-red-600 text-sm font-semibold mb-4">{error}</p>
          <a
            href="/register"
            className="inline-block px-4 py-2 bg-violet-600 text-white text-xs font-bold rounded-xl hover:bg-violet-700 transition-colors"
          >
            Back to Register
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex items-center gap-3 text-slate-600 font-medium text-sm">
        <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
        Authenticating with Google...
      </div>
    </main>
  );
}

export default function OAuthCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
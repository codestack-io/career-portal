import Link from "next/link";

export default function ForgotPassword() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-blue-50 flex items-center justify-center px-6 py-20">

      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-300/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl" />

      {/* Forgot Password Card */}
      <div className="relative w-full max-w-md">

        <div className="rounded-3xl border border-white/40 bg-white/70 backdrop-blur-2xl shadow-[0_20px_70px_rgba(31,38,135,0.15)] p-8 sm:p-10">

          {/* Logo */}
          <Link href="/" className="block text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-violet-700 to-blue-600 bg-clip-text text-transparent">
                CareerHub
              </span>
            </h1>
          </Link>

          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-8 w-8 text-violet-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-1.5 0h12a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5V12A1.5 1.5 0 0 1 6 10.5Z"
              />
            </svg>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Forgot Password?
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              No worries. Enter your email address and we&apos;ll send you a link
              to reset your password.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
            >
              Send Reset Link
            </button>

          </form>

          {/* Back to Login */}
          <div className="mt-7 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700"
            >
              <span>←</span>
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
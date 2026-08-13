"use client";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800">
          Welcome back, <span className="text-blue-600">{user?.username || "User"}</span>!
        </h1>
        <p className="text-slate-500 mt-1">
          Here is an overview of your CareerHub portal and profile progress.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">My Profile</h2>
          <p className="text-slate-500 text-sm mb-4">
            Update your phone number, target study destination, degree, and avatar.
          </p>
          <Link
            href="/dashboard/profile"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Edit Profile
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">Applications & Destinations</h2>
          <p className="text-slate-500 text-sm mb-4">
            Explore programs and check destination options for higher studies.
          </p>
          <Link
            href="/study-destinations"
            className="inline-block border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Browse Destinations
          </Link>
        </div>
      </div>
    </div>
  );
}
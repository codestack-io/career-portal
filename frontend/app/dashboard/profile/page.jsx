"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../../../lib/api";

// List of popular study destinations and major countries
const COUNTRIES = [
  "Australia",
  "Canada",
  "China",
  "Denmark",
  "Finland",
  "France",
  "Germany",
  "Ireland",
  "Italy",
  "Japan",
  "Malaysia",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Singapore",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
];

export default function ProfilePage() {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    phone: "",
    country_of_interest: "",
    target_degree: "",
    passport_status: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [currentAvatar, setCurrentAvatar] = useState(null);

  // Country Auto-suggest State
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef(null);

  // Close country dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch user profile data
  useEffect(() => {
    async function fetchProfile() {
      if (!accessToken) return;
      try {
        const data = await getUserProfile(accessToken);
        setFormData({
          phone: data.phone || "",
          country_of_interest: data.country_of_interest || "",
          target_degree: data.target_degree || "",
          passport_status: data.passport_status || "",
        });
        setCountrySearch(data.country_of_interest || "");
        setCurrentAvatar(data.avatar);
      } catch (err) {
        setMessage({ type: "error", text: err.message });
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [accessToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Filter countries according to search input
  const filteredCountries = COUNTRIES.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountrySelect = (country) => {
    setFormData((prev) => ({ ...prev, country_of_interest: country }));
    setCountrySearch(country);
    setShowCountryDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    const payload = new FormData();
    payload.append("phone", formData.phone);
    payload.append("country_of_interest", formData.country_of_interest);
    payload.append("target_degree", formData.target_degree);
    payload.append("passport_status", formData.passport_status);

    if (avatarFile) {
      payload.append("avatar", avatarFile);
    }

    try {
      const updated = await updateUserProfile(accessToken, payload);
      setCurrentAvatar(updated.avatar);
      setAvatarFile(null); // Reset pending avatar file
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setSaving(false);
    }
  };

  // Preview chosen avatar image or fallback to current avatar
  const avatarPreview = avatarFile
    ? URL.createObjectURL(avatarFile)
    : currentAvatar;

  if (loading) {
    return (
      <div className="flex py-12 justify-center items-center text-slate-500 font-medium">
        <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mr-3" />
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-2xl font-bold text-slate-900">Personal Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Update your contact details, study preferences, and profile avatar.
        </p>
      </div>

      {/* Notification Toast */}
      {message.text && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Avatar Upload Card */}
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile Avatar"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-600 to-blue-600 text-white font-bold text-2xl flex items-center justify-center ring-4 ring-white shadow-md">
                ?
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <label className="block text-sm font-semibold text-slate-800">
              Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0] || null)}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200 cursor-pointer"
            />
            <p className="text-xs text-slate-400">JPG, PNG or GIF up to 5MB.</p>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 placeholder:text-slate-400"
            placeholder="+1 (234) 567-890"
          />
        </div>

        {/* Country of Interest (Auto-suggest Dropdown) */}
        <div className="relative" ref={countryDropdownRef}>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Target Country
          </label>
          <input
            type="text"
            value={countrySearch}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setFormData({ ...formData, country_of_interest: e.target.value });
              setShowCountryDropdown(true);
            }}
            onFocus={() => setShowCountryDropdown(true)}
            placeholder="Type or select a country (e.g. Canada)"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 placeholder:text-slate-400"
          />

          {/* Suggested Countries List */}
          {showCountryDropdown && filteredCountries.length > 0 && (
            <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-2 shadow-lg text-sm">
              {filteredCountries.map((country) => (
                <li
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                  className="cursor-pointer px-4 py-2.5 hover:bg-violet-50 hover:text-violet-700 transition text-slate-700 flex items-center justify-between"
                >
                  <span>{country}</span>
                  {formData.country_of_interest === country && (
                    <span className="text-violet-600 font-bold">✓</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Target Degree Select */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Target Degree
          </label>
          <select
            name="target_degree"
            value={formData.target_degree}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
          >
            <option value="">Select Degree Program</option>
            <option value="Bachelor's">Bachelor&apos;s Degree</option>
            <option value="Master's">Master&apos;s Degree</option>
            <option value="PhD">PhD / Doctorate</option>
            <option value="Diploma">Diploma / Certificate</option>
          </select>
        </div>

        {/* Passport Status Select */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Passport Status
          </label>
          <select
            name="passport_status"
            value={formData.passport_status}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm outline-none transition-all focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
          >
            <option value="">Select Passport Status</option>
            <option value="Valid">Valid Passport</option>
            <option value="In Progress">Application in Progress</option>
            <option value="None">No Passport Yet</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-3.5 font-semibold text-white shadow-md shadow-violet-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving Changes...
            </>
          ) : (
            "Save Profile Changes"
          )}
        </button>

      </form>
    </div>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../../../lib/api";
import confetti from "canvas-confetti";

const COUNTRIES = [
  "Australia", "Canada", "China", "Denmark", "Finland", "France", 
  "Germany", "Ireland", "Italy", "Japan", "Malaysia", "Netherlands", 
  "New Zealand", "Norway", "Singapore", "South Korea", "Spain", 
  "Sweden", "Switzerland", "United Kingdom", "United States"
];

export default function ProfilePage() {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  // Trigger confetti burst function
  const triggerConfetti = () => {
    // Left burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.3 },
      colors: ["#111827", "#0D9488", "#E11D48", "#F59E0B"]
    });

    // Right burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.7 },
      colors: ["#111827", "#0D9488", "#E11D48", "#F59E0B"]
    });
  };

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
      setAvatarFile(null);
      
      // 🎉 Fire Celebration Effect & Show Modal
      triggerConfetti();
      setShowSuccessModal(true);
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Failed to update profile." });
    } finally {
      setSaving(false);
    }
  };

  const avatarPreview = avatarFile
    ? URL.createObjectURL(avatarFile)
    : currentAvatar;

  if (loading) {
    return (
      <div className="min-h-[50vh] flex flex-col justify-center items-center text-slate-500 font-medium">
        <div className="w-8 h-8 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mb-3" />
        <span>Loading profile data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 relative">
      {/* Hero Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How can we customize your profile?
        </h1>
        <p className="text-slate-500 text-base sm:text-lg mt-3 max-w-xl mx-auto">
          Keep your preferences and contact details up to date to help us assist you better.
        </p>
      </div>

      {/* Error Toast */}
      {message.type === "error" && (
        <div className="max-w-3xl mx-auto mb-8 flex items-center gap-3 p-4 rounded-2xl text-sm font-medium bg-red-50 text-red-800 border border-red-200">
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {message.text}
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Avatar Card */}
        <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-100 rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-sm">
          <div className="relative group w-44 h-44 rounded-3xl overflow-hidden shadow-md bg-slate-200 mb-6 border-4 border-white">
            {avatarPreview ? (
              <img src={avatarPreview} alt="Profile Avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-900 text-white font-bold text-4xl flex items-center justify-center">
                ?
              </div>
            )}
            <label className="absolute inset-0 bg-slate-900/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer font-medium text-xs backdrop-blur-sm">
              <svg className="w-7 h-7 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
              Upload Photo
              <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0] || null)} className="hidden" />
            </label>
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            {formData.country_of_interest ? `Targeting ${formData.country_of_interest}` : "Student Profile"}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {formData.target_degree || "Degree Pending"} • {formData.passport_status || "Passport Status N/A"}
          </p>
        </div>

        {/* Right Column: Inputs */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-2">Phone number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (234) 567-890"
              className="w-full bg-[#F2F5FA] border border-transparent rounded-2xl px-5 py-3.5 text-slate-900 text-sm outline-none transition-all focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 placeholder:text-slate-400"
            />
          </div>

          <div className="relative" ref={countryDropdownRef}>
            <label className="block text-sm font-medium text-slate-800 mb-2">Target country</label>
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
              className="w-full bg-[#F2F5FA] border border-transparent rounded-2xl px-5 py-3.5 text-slate-900 text-sm outline-none transition-all focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 placeholder:text-slate-400"
            />

            {showCountryDropdown && filteredCountries.length > 0 && (
              <ul className="absolute z-20 mt-2 max-h-52 w-full overflow-auto rounded-2xl border border-slate-100 bg-white p-2 shadow-xl text-sm">
                {filteredCountries.map((country) => (
                  <li
                    key={country}
                    onClick={() => handleCountrySelect(country)}
                    className="cursor-pointer px-4 py-2.5 rounded-xl hover:bg-[#F2F5FA] transition text-slate-700 flex items-center justify-between"
                  >
                    <span>{country}</span>
                    {formData.country_of_interest === country && (
                      <span className="text-slate-900 font-bold">✓</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-2">Target degree</label>
              <select
                name="target_degree"
                value={formData.target_degree}
                onChange={handleChange}
                className="w-full bg-[#F2F5FA] border border-transparent rounded-2xl px-5 py-3.5 text-slate-900 text-sm outline-none focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 cursor-pointer"
              >
                <option value="">Select Degree Program</option>
                <option value="Bachelor&apos;s">Bachelor&apos;s Degree</option>
                <option value="Master&apos;s">Master&apos;s Degree</option>
                <option value="PhD">PhD / Doctorate</option>
                <option value="Diploma">Diploma / Certificate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-800 mb-2">Passport status</label>
              <select
                name="passport_status"
                value={formData.passport_status}
                onChange={handleChange}
                className="w-full bg-[#F2F5FA] border border-transparent rounded-2xl px-5 py-3.5 text-slate-900 text-sm outline-none focus:bg-white focus:border-slate-300 focus:ring-4 focus:ring-slate-900/5 cursor-pointer"
              >
                <option value="">Select Passport Status</option>
                <option value="Valid">Valid Passport</option>
                <option value="In Progress">Application in Progress</option>
                <option value="None">No Passport Yet</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto min-w-[200px] bg-[#111827] hover:bg-black text-white font-semibold py-4 px-8 rounded-full shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
          </div>
        </div>
      </form>

      {/* 🎉 CELEBRATION MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full text-center shadow-2xl border border-slate-100 space-y-6 transform animate-scaleUp">
            
            {/* Custom Matching Vector Illustration */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              {/* Soft background blob */}
              <div className="absolute inset-0 bg-[#E0F2FE] rounded-full filter blur-xl opacity-70 animate-pulse" />
              
              <svg className="w-full h-full relative z-10" viewBox="0 0 200 200" fill="none">
                {/* Scroll/Document backdrop */}
                <path d="M130 50 C160 30, 170 80, 150 120 C140 140, 120 150, 110 130 C100 110, 110 70, 130 50 Z" fill="#0D9488" opacity="0.15" />
                <path d="M135 60 C150 50, 160 85, 145 110 C135 125, 125 130, 120 115" stroke="#0D9488" strokeWidth="6" strokeLinecap="round" />
                <line x1="130" y1="75" x2="150" y2="75" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />
                <line x1="125" y1="90" x2="145" y2="90" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" />

                {/* Character */}
                <circle cx="100" cy="80" r="22" fill="#FCA5A5" />
                <path d="M85 70 C85 55, 115 55, 115 70 C115 75, 105 82, 100 82 C92 82, 85 78, 85 70 Z" fill="#475569" />
                <path d="M60 145 C60 110, 80 100, 100 100 C120 100, 140 110, 140 145 Z" fill="#E11D48" />
                
                {/* Phone device */}
                <rect x="42" y="90" width="16" height="30" rx="3" fill="#1E1B4B" transform="rotate(-20 42 90)" />
                <path d="M65 115 L90 125 L115 110" stroke="#FCA5A5" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Profile Updated!
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Your profile information has been successfully saved. We are ready to help you on your study journey!
              </p>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-[#111827] hover:bg-black text-white font-semibold py-3.5 rounded-full transition-all duration-200"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
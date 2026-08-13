import { refreshAccessToken } from "./auth";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchAPI(endpoint) {
  if (!BASE_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return [];
  }

  const url = `${BASE_URL}/api${endpoint}`;

  try {
    console.log("Fetching:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${url}`);

      const errorText = await res.text();
      console.error(errorText);

      return [];
    }

    const data = await res.json();

    console.log(`API Success: ${endpoint}`, data);

    // DRF pagination
    return data.results ?? data;

  } catch (error) {
    console.error(`Fetch Error: ${url}`, error);
    return [];
  }
}



// Append to lib/api.js

export async function getUserProfile(accessToken) {
  if (!accessToken) {
    throw new Error("Authentication token is missing. Please log in again.");
  }

  // Ensure token is a string, not an object
  const tokenString = typeof accessToken === "object" ? accessToken.access : accessToken;

  const url = `${BASE_URL}/api/profile/`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenString}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail || errorData.message || `Profile fetch failed (${res.status})`
    );
  }

  return res.json();
}

export async function updateUserProfile(accessToken, formData) {
  if (!accessToken) {
    throw new Error("No access token provided. Please log in.");
  }

  let token = typeof accessToken === "object" ? accessToken.access : accessToken;
  const url = `${BASE_URL}/api/profile/`;

  let res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  // If 401 Unauthorized, attempt to refresh the token and retry once
  if (res.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        const refreshData = await refreshAccessToken(refreshToken);
        token = refreshData.access;
        localStorage.setItem("accessToken", token);

        // Retry request with fresh token
        res = await fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } catch (refreshErr) {
        throw new Error("Session expired. Please log in again.");
      }
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `Profile update failed with status ${res.status}`
    );
  }

  return res.json();
}

// API functions
export const getHero = () => fetchAPI("/hero/");
export const getAbout = () => fetchAPI("/about/");
export const getServices = () => fetchAPI("/services/");
export const getWhyChooseUs = () => fetchAPI("/why-choose-us/");
export const getUniversities = () => fetchAPI("/universities/");
export const getStatistics = () => fetchAPI("/statistics/");
export const getTestimonials = () => fetchAPI("/testimonials/");
export const getStudyDestinations = () =>
  fetchAPI("/study-destinations/");
export const getBlogs = () => fetchAPI("/blogs/");
export const getFAQs = () => fetchAPI("/faqs/");
export const getContact = () => fetchAPI("/contact/");
export const getFooter = () => fetchAPI("/footer/");
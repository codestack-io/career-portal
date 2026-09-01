import { refreshAccessToken } from "./auth";

const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "");

/**
 * Safely accesses localStorage only when executing in browser context
 */
const getStorageItem = (key) => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

const setStorageItem = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

const removeStorageItem = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

/**
 * Universal public fetcher supporting dynamic parameters & pagination
 */
export async function fetchAPI(endpoint, queryParams = {}) {
  if (!BASE_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return null;
  }

  // Ensure path starts with a single slash
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${BASE_URL}/api${cleanEndpoint}`);

  // Construct URL query parameters dynamically
  Object.entries(queryParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, value);
    }
  });

  try {
    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error [${res.status}] ${url.toString()}:`, errorText);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error(`Fetch Error: ${url.toString()}`, error);
    return null;
  }
}

/**
 * Authenticated Request Helper with Auto Token Refresh
 */
async function fetchWithAuth(url, options = {}) {
  let token = getStorageItem("accessToken");

  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // If payload is plain object (not FormData), serialize to JSON
  if (options.body && !(options.body instanceof FormData) && typeof options.body === "object") {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(options.body);
  }

  let res = await fetch(url, { ...options, headers });

  // Handle 401 Unauthorized by attempting to refresh token
  if (res.status === 401) {
    const refreshToken = getStorageItem("refreshToken");

    if (refreshToken) {
      try {
        const refreshData = await refreshAccessToken(refreshToken);
        token = refreshData.access;
        setStorageItem("accessToken", token);

        // Retry initial request with new access token
        headers.Authorization = `Bearer ${token}`;
        res = await fetch(url, { ...options, headers });
      } catch (refreshErr) {
        removeStorageItem("accessToken");
        removeStorageItem("refreshToken");
        throw new Error("Session expired. Please log in again.");
      }
    }
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || `Request failed (${res.status})`);
  }

  return res.json();
}

/* ==========================================================================
   AUTHENTICATED USER ENDPOINTS
   ========================================================================== */

export async function getUserProfile() {
  const url = `${BASE_URL}/api/profile/`;
  return fetchWithAuth(url, { method: "GET" });
}

export async function updateUserProfile(data) {
  const url = `${BASE_URL}/api/profile/`;
  return fetchWithAuth(url, {
    method: "PATCH",
    body: data,
  });
}

/* ==========================================================================
   PUBLIC DATA ENDPOINTS
   ========================================================================== */

// Unpaginated / Single-Instance Modules
export const getHero = () => fetchAPI("/hero/");
export const getAbout = () => fetchAPI("/about/");
export const getFooter = () => fetchAPI("/footer/");
export const getStatistics = () => fetchAPI("/statistics/");
export const getWhyChooseUs = () => fetchAPI("/why-choose-us/");

// Dynamic Modules with Search, Filtering & Custom Page Sizes
export const getServices = (pageSize = 6) => fetchAPI("/services/", { page_size: pageSize });

export const getBlogs = ({ search = "", category = "", page = 1, pageSize = 6 } = {}) =>
  fetchAPI("/blogs/", { search, category, page, page_size: pageSize });

export const getStudyDestinations = ({ country = "", costRange = "", page = 1, pageSize = 6 } = {}) =>
  fetchAPI("/study-destinations/", { country, cost_range: costRange, page, page_size: pageSize });

export const getFAQs = ({ page = 1, pageSize = 10 } = {}) =>
  fetchAPI("/faqs/", { page, page_size: pageSize });

export const getUniversities = (pageSize = 6) => fetchAPI("/universities/", { page_size: pageSize });
export const getTestimonials = (pageSize = 6) => fetchAPI("/testimonials/", { page_size: pageSize });
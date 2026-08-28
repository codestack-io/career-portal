import { refreshAccessToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Universal public fetcher supporting dynamic parameters & pagination
 */
export async function fetchAPI(endpoint, queryParams = {}) {
  if (!BASE_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return [];
  }

  // Construct URL with search/filter parameters
  const url = new URL(`${BASE_URL}/api${endpoint}`);
  Object.keys(queryParams).forEach((key) => {
    if (queryParams[key] !== undefined && queryParams[key] !== null && queryParams[key] !== "") {
      url.searchParams.append(key, queryParams[key]);
    }
  });

  try {
    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error [${res.status}] ${url.toString()}:`, errorText);
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`Fetch Error: ${url.toString()}`, error);
    return [];
  }
}

/**
 * Authenticated Request Helper with Auto Token Refresh
 */
async function fetchWithAuth(url, options = {}) {
  let token = localStorage.getItem("accessToken");

  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : "",
  };

  let res = await fetch(url, { ...options, headers });

  // Handle 401 Unauthorized by attempting to refresh token
  if (res.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        const refreshData = await refreshAccessToken(refreshToken);
        token = refreshData.access;
        localStorage.setItem("accessToken", token);

        // Retry initial request with new access token
        headers.Authorization = `Bearer ${token}`;
        res = await fetch(url, { ...options, headers });
      } catch (refreshErr) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
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

export async function updateUserProfile(formData) {
  const url = `${BASE_URL}/api/profile/`;
  return fetchWithAuth(url, {
    method: "PATCH",
    body: formData,
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

export const getFAQs = ({ page = 1, pageSize = 5 } = {}) =>
  fetchAPI("/faqs/", { page, page_size: pageSize });

export const getUniversities = (pageSize = 6) => fetchAPI("/universities/", { page_size: pageSize });
export const getTestimonials = (pageSize = 6) => fetchAPI("/testimonials/", { page_size: pageSize });
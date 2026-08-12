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
const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : "https://career-portal-backend-cw8a.onrender.com/api";

export async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`Failed to fetch ${endpoint}: ${res.status}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

export const getHero = () => fetchAPI("/hero/");
export const getAbout = () => fetchAPI("/about/");
export const getServices = () => fetchAPI("/services/");
export const getWhyChooseUs = () => fetchAPI("/why-choose-us/");
export const getUniversities = () => fetchAPI("/universities/");
export const getStatistics = () => fetchAPI("/statistics/");
export const getTestimonials = () => fetchAPI("/testimonials/");
export const getStudyDestinations = () => fetchAPI("/study-destinations/");
export const getBlogs = () => fetchAPI("/blogs/");
export const getFAQs = () => fetchAPI("/faqs/");
export const getContact = () => fetchAPI("/contact/");
export const getFooter = () => fetchAPI("/footer/");
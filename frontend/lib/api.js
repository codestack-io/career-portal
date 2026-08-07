const BASE_URL = "http://127.0.0.1:8000/api";

export async function fetchAPI(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
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
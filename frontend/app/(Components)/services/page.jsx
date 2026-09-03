import ServicesClient from "./ServicesClient";

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  try {
    const [servicesRes, categoriesRes] = await Promise.all([
      fetch(`${baseUrl}/api/services/`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/service-categories/`, { cache: "no-store" }),
    ]);

    const rawServices = servicesRes.ok ? await servicesRes.json() : [];
    const rawCategories = categoriesRes.ok ? await categoriesRes.json() : [];

    // Safely extract arrays if backend returns paginated objects ({ results: [...] })
    const services = Array.isArray(rawServices)
      ? rawServices
      : rawServices?.results || [];

    const categories = Array.isArray(rawCategories)
      ? rawCategories
      : rawCategories?.results || [];

    return { services, categories };
  } catch (error) {
    console.error("Error loading services data:", error);
    return { services: [], categories: [] };
  }
}

export const metadata = {
  title: "Our Services | CareerHub",
  description: "Explore services by category, from admissions to pre-departure housing.",
};

export default async function ServicesPage() {
  const { services, categories } = await getData();

  return <ServicesClient initialServices={services} initialCategories={categories} />;
}
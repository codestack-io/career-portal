export const dynamic = "force-dynamic";

import Navbar from "../UiComponents/Navbar/Navbar";
import Hero from "../UiComponents/Hero/Hero";
import About from "../UiComponents/About/About";
import Services from "../UiComponents/Services/Services";
import Footer from "../UiComponents/Footer/Footer";
import FAQ from "../UiComponents/FAQ/FAQ";
import Testimonials from "../UiComponents/Testimonials/Testimonials";
import Blogs from "../UiComponents/Blogs/Blogs";
import StudyDestinations from "../UiComponents/StudyDestinations/StudyDestinations";
import Statistics from "../UiComponents/Statistics/Statistics";
import Universities from "../UiComponents/Universities/Universities";

import {
  getHero,
  getAbout,
  getServices,
  getFooter,
  getFAQs,
  getTestimonials,
  getBlogs,
  getStudyDestinations,
  getStatistics,
  getUniversities,
} from "@/lib/api";

export default async function Home() {
  const [
    heroRes,
    aboutRes,
    servicesRes,
    footerRes,
    faqsRes,
    testimonialsRes,
    
    blogsRes,
    studyDestinationsRes,
    statisticsRes,
    universitiesRes,
  ] = await Promise.all([
    getHero(),
    getAbout(),
    getServices(),
    getFooter(),
    getFAQs(),
    getTestimonials(),
    getBlogs(),
    getStudyDestinations(),
    getStatistics(),
    getUniversities(),
  ]);

  // Extract Single Objects safely
  const hero = heroRes?.results ? heroRes.results[0] : heroRes?.[0] ?? null;
  const about = aboutRes?.results ? aboutRes.results[0] : aboutRes?.[0] ?? null;
  const footer = footerRes?.results ? footerRes.results[0] : footerRes?.[0] ?? null;

  // Extract Arrays safely (Supports DRF Pagination + Flat Arrays)
  const services = servicesRes?.results || servicesRes || [];
  const faqs = faqsRes?.results || faqsRes || [];
  const testimonials = testimonialsRes?.results || testimonialsRes || [];
  
  const blogs = blogsRes?.results || blogsRes || [];
  const studyDestinations = studyDestinationsRes?.results || studyDestinationsRes || [];
  const statistics = statisticsRes?.results || statisticsRes || [];
  const universities = universitiesRes?.results || universitiesRes || [];

  return (
    <main className="relative w-full overflow-hidden">
      <Hero hero={hero} />
      <About about={about} />
      <Services services={services} />
      <StudyDestinations destinations={studyDestinations} />
      <Universities universities={universities} />
      <Statistics statistics={statistics} />
      <Testimonials testimonials={testimonials} />
      <Blogs blogs={blogs} />
      <FAQ faqs={faqs} />
      <Footer footer={footer} />
    </main>
  );
}
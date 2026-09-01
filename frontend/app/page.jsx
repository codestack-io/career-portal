export const dynamic = "force-dynamic";

import Hero from "../UiComponents/Hero/Hero";
import About from "../UiComponents/About/About";
import Services from "../UiComponents/Services/Services";
import Footer from "../UiComponents/Footer/Footer";
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
  getTestimonials,
  getBlogs,
  getStudyDestinations,
  getStatistics,
  getUniversities,
} from "@/lib/api";

export default async function Home() {
  // Positional alignment MUST match between Promise.all and array destructuring
  const [
    heroRes,              
    aboutRes,             
    servicesRes,          
    footerRes,            
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
  const testimonials = testimonialsRes?.results || testimonialsRes || [];
  const blogs = blogsRes?.results || blogsRes || [];
  const studyDestinations = studyDestinationsRes?.results || studyDestinationsRes || [];
  const statistics = statisticsRes?.results || statisticsRes || [];
  const universities = universitiesRes?.results || universitiesRes || [];

  return (
    <main className="relative w-full overflow-hidden">
      <Hero hero={hero} />
      <About about={about} />
      <Statistics statistics={statistics} />
      <Services services={services} />
      <StudyDestinations destinations={studyDestinations} />
      <Universities universities={universities} />
      <Testimonials testimonials={testimonials} />
      <Blogs blogs={blogs} />
      <Footer footer={footer} />
    </main>
  );
}
export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/FAQ/FAQ";
import Testimonials from "@/components/Testimonials/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import Blogs from "@/components/Blogs/Blogs";
import StudyDestinations from "@/components/StudyDestinations/StudyDestinations";
import Statistics from "@/components/Statistics/Statistics";
import Universities from "../components/Universities/Universities";
import {
  getHero,
  getAbout,
  getServices,
  getFooter,
  getFAQs,
  getTestimonials,
  getWhyChooseUs,
  getBlogs,
  getStudyDestinations,
  getStatistics,
  getUniversities,
} from "@/lib/api";

export default async function Home() {
  // Fetch all endpoints in parallel to speed up load time
  const [
    heroRes,
    aboutRes,
    servicesRes,
    footerRes,
    faqsRes,
    testimonialsRes,
    whyChooseUsRes,
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
    getWhyChooseUs(),
    getBlogs(),
    getStudyDestinations(),
    getStatistics(),
    getUniversities(),
  ]);

  // Safe extractions (returns null or empty array instead of crashing if DB is empty)
  const hero = Array.isArray(heroRes) && heroRes.length > 0 ? heroRes[0] : null;
  const about = Array.isArray(aboutRes) && aboutRes.length > 0 ? aboutRes[0] : null;
  const footer = Array.isArray(footerRes) && footerRes.length > 0 ? footerRes[0] : null;

  const services = Array.isArray(servicesRes) ? servicesRes : [];
  const faqs = Array.isArray(faqsRes) ? faqsRes : [];
  const testimonials = Array.isArray(testimonialsRes) ? testimonialsRes : [];
  const whyChooseUs = Array.isArray(whyChooseUsRes) ? whyChooseUsRes : [];
  const blogs = Array.isArray(blogsRes) ? blogsRes : [];
  const studyDestinations = Array.isArray(studyDestinationsRes) ? studyDestinationsRes : [];
  const statistics = Array.isArray(statisticsRes) ? statisticsRes : [];
  const universities = Array.isArray(universitiesRes) ? universitiesRes : [];

  return (
    <main className="relative w-full overflow-hidden">
      <Navbar />
      <Hero hero={hero} />
      <About about={about} />
      <Services services={services} />
      <WhyChooseUs features={whyChooseUs} />
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
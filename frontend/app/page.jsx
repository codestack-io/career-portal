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

  // Extract paginated results

const hero = heroRes?.[0] ?? null;
const about = aboutRes?.[0] ?? null;
const footer = footerRes?.[0] ?? null;

const services = servicesRes ?? [];
const faqs = faqsRes ?? [];
const testimonials = testimonialsRes ?? [];
const whyChooseUs = whyChooseUsRes ?? [];
const blogs = blogsRes ?? [];
const studyDestinations = studyDestinationsRes ?? [];
const statistics = statisticsRes ?? [];
const universities = universitiesRes ?? [];

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
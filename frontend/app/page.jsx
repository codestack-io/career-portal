export const dynamic = "force-dynamic";

import Navbar from "../UiComponents/Navbar/Navbar";
import Hero from "../UiComponents/Hero/Hero";
import About from "../UiComponents/About/About";
import Services from "../UiComponents/Services/Services";
import Footer from "../UiComponents/Footer/Footer";
import FAQ from "../UiComponents/FAQ/FAQ";
import Testimonials from "../UiComponents/Testimonials/Testimonials";
import WhyChooseUs from "../UiComponents/WhyChooseUs/WhyChooseUs";
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
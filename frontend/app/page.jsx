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
  getUniversities
} from "@/lib/api";


export default async function Home() {
  const hero = (await getHero())[0];
  const about = (await getAbout())[0];
  const services = await getServices();
  const footer = (await getFooter())[0];
  const faqs = await getFAQs();
  const testimonials = await getTestimonials();
  const whyChooseUs = await getWhyChooseUs();
  const blogs = await getBlogs();
  const studyDestinations = await getStudyDestinations();
  const statistics = await getStatistics();
  const universities = await getUniversities();
  return (
    <>
      <main className="relative w-full overflow-hidden">
      <Navbar />
      <Hero hero={hero} />
      <About about={about} />
      <Services services={services} />
      <WhyChooseUs features={whyChooseUs} />
      <StudyDestinations destinations={studyDestinations} />
      <Universities universities={universities}/>
      <Statistics statistics={statistics} />
      <Testimonials testimonials={testimonials} />
      <Blogs blogs={blogs} />
      <FAQ faqs={faqs} />
      <Footer footer={footer} />
      </main>
      
      
      
    </>
  );
}
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Footer from "@/components/Footer/Footer";
import FAQ from "@/components/FAQ/FAQ";
import Testimonials from "@/components/Testimonials/Testimonials";

import {
  getHero,
  getAbout,
  getServices,
  getFooter,
  getFAQs,
  getTestimonials
} from "@/lib/api";

export default async function Home() {
  const hero = (await getHero())[0];
  const about = (await getAbout())[0];
  const services = await getServices();
  const footer = (await getFooter())[0];
  const faqs = await getFAQs();
  const testimonials = await getTestimonials();

  return (
    <>
      <Navbar />
      <Hero hero={hero} />
      <About about={about} />
      <Services services={services} />
      <Testimonials testimonials={testimonials} />
      <FAQ faqs={faqs} />
      <Footer footer={footer} />
      
      
      
    </>
  );
}
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Footer from "@/components/Footer/Footer";

import {
  getHero,
  getAbout,
  getServices,
  getFooter,
} from "@/lib/api";

export default async function Home() {
  const hero = (await getHero())[0];
  const about = (await getAbout())[0];
  const services = await getServices();
  const footer = (await getFooter())[0];

  return (
    <>
      <Navbar />
      <Hero hero={hero} />
      <About about={about} />
      <Services services={services} />
      <Footer footer={footer} />
      
    </>
  );
}
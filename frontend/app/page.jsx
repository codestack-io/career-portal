import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";

import {
  getHero,
  getAbout,
  getServices,
} from "@/lib/api";

export default async function Home() {
  const hero = (await getHero())[0];
  const about = (await getAbout())[0];
  const services = await getServices();

  return (
    <>
      <Navbar />
      <Hero hero={hero} />
      <About about={about} />
      <Services services={services} />
    </>
  );
}
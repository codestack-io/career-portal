import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";

import {
  getHero,
  getAbout,
} from "@/lib/api";

export default async function Home() {
  const hero = (await getHero())[0];
  const about = (await getAbout())[0];

  return (
    <>
      <Hero hero={hero} />
      <About about={about} />
    </>
  );
}
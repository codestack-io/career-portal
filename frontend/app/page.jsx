import { getHero } from "@/lib/api";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";

export default async function Home() {
  const hero = (await getHero())[0];

  return (
    <>
      <Navbar />
      <Hero hero={hero} />
    </>
  );
}
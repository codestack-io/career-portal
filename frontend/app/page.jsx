import Hero from "@/components/Hero/Hero";
import { getHero } from "@/lib/api";

export default async function Home() {
  const hero = await getHero();

  return (
    <>
      <Hero hero={hero[0]} />
    </>
  );
}
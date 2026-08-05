export default function Hero({ hero }) {
  if (!hero) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold">
            {hero.title}
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              {hero.primary_button_text}
            </button>

            <button className="border px-6 py-3 rounded-lg">
              {hero.secondary_button_text}
            </button>
          </div>
        </div>

        <img
          src={hero.hero_image}
          alt={hero.title}
          className="rounded-xl"
        />
      </div>
    </section>
  );
}
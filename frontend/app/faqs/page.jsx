import FaqClient from "./FaqClient";
import Footer from "../../UiComponents/Footer/Footer"; // Adjust path to your Footer
import { getFAQs } from "../../lib/api"; // Adjust path to your API fetcher

export const metadata = {
  title: "FAQs | CareerHub",
  description: "Find answers to questions about studying abroad, admissions, and visas.",
};

export default async function FaqPage() {
  const faqs = await getFAQs();

  return (
    <div className="flex flex-col overflow-hidden w-full bg-[#F8FAFC]">
      {/* Main Container expands to push footer down naturally */}
      <main className="flex-1 flex flex-col justify-between w-full">
        <FaqClient initialFaqs={faqs} />
      </main>

      <Footer />
    </div>
  );
}
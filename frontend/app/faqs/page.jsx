import FaqClient from "./FaqClient";
import Footer from "../../UiComponents/Footer/Footer"; // Adjust path to your Footer
import { getFAQs } from "../../lib/api"; // Adjust path to your API fetcher

export const metadata = {
  title: "FAQs | CareerHub",
  description: "Find answers to questions about studying abroad, admissions, and visas.",
};

export default async function FaqPage() {
  // Fetch FAQs server-side (Django API)
  const faqs = await getFAQs();

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8FAFC]">
      {/* Main Content Container */}
      <main className="flex-1 w-full pt-28 sm:pt-32">
        <FaqClient initialFaqs={faqs} />
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
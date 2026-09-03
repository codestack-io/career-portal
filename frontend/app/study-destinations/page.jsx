import StudyDestinations from "../(Components)/study-destinations/study-destinations";
import Footer from "../../UiComponents/Footer/Footer";

export const metadata = {
  title: "Study Destinations | VisaHub",
  description: "Discover top study abroad destinations worldwide.",
};

export default function DestinationsPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 pt-20">
      <StudyDestinations/>
      <Footer/>
    </div>
  );
}
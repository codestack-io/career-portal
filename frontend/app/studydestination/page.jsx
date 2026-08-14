import StudyDestinations from "../Components/StudyDestination/StudyDestination";

export const metadata = {
  title: "Study Destinations | VisaHub",
  description: "Discover top study abroad destinations worldwide.",
};

export default function DestinationsPage() {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 pt-20">
      <StudyDestinations />
    </div>
  );
}
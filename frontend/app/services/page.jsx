import Services from "../Components/Services/Services";
import Footer from "../../UiComponents/Footer/Footer";
import { getServices } from "../../lib/api";

export default async function ServicesPage() {
  const services = await getServices();

  const studentServices = services.filter((s) => s.category === "student");
  const universityServices = services.filter((s) => s.category === "university");

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden">
      <Services
        studentServices={studentServices}
        universityServices={universityServices}
      />
      <Footer />
    </div>
  );
}
import Services from "../Components/Services/Services";
import Footer from "../../UiComponents/Footer/Footer";
import { getServices } from "../../lib/api";

export default async function ServicesPage() {
  const services = await getServices();

  const studentServices = services.filter((s) => s.category === "student");
  const universityServices = services.filter((s) => s.category === "university");

  return (
    <div className=" flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
      <Services
        studentServices={studentServices}
        universityServices={universityServices}
      />
      <Footer />
    </div>
  );
}
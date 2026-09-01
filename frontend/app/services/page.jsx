import Services from "../Components/Services/Services";
import Footer from "../../UiComponents/Footer/Footer";
import { getServices } from "../../lib/api";

export default async function ServicesPage() {
  const rawServices = await getServices();


  const services = Array.isArray(rawServices)
    ? rawServices
    : rawServices?.results || [];

  
  const getCategorySlug = (s) => {
    if (!s.category) return "";
    return typeof s.category === "object"
      ? (s.category.slug || s.category.name || "").toLowerCase()
      : String(s.category).toLowerCase();
  };

  
  const studentServices = services.filter((s) =>
    getCategorySlug(s).includes("student")
  );
  
  const universityServices = services.filter((s) =>
    getCategorySlug(s).includes("university")
  );

  return (
    <div className="flex flex-col justify-between overflow-x-hidden overflow-y-hidden">
      <Services
        studentServices={studentServices}
        universityServices={universityServices}
        initialServices={services}
      />
      <Footer />
    </div>
  );
}
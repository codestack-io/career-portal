import Footer from "../../UiComponents/Footer/Footer";
import About from "../(Components)/about/About";

export default function AboutPage() {
  return (
    <main className="pt-28 sm:pt-36 bg-white min-h-screen overflow-hidden">
      <About />
      <Footer/>
    </main>
  );
}
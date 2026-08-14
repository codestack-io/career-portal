'use client';

import Blogs from "../Components/Blogs/Blogs"; // Adjust path if needed
import Footer from "../../UiComponents/Footer/Footer";

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white overflow-x-hidden">
      {/* flex-1 fills remaining space without forcing extra page height */}
      <main className="flex-1 pt-24 sm:pt-28">
        <Blogs />
      </main>

      {/* Footer sticks cleanly to the bottom */}
      <Footer />
    </div>
  );
}
'use client';

import Blogs from "../(Components)/blogs/Blogs"; 
import Footer from "../../UiComponents/Footer/Footer";

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white overflow-x-hidden">
      {/* Increased padding-top to prevent floating navbar from clipping header text */}
      <main className="flex-1 pt-32 sm:pt-36">
        <Blogs />
      </main>

      {/* Footer sticks cleanly to the bottom */}
      <Footer />
    </div>
  );
}
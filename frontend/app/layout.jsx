import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
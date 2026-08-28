import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./context/AuthContext"; // Adjust path if needed
import Navbar from "@/UiComponents/Navbar/Navbar"; // Adjust path if needed
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:8000"),
  title: {
    default: "Global Education & Career Consultancy",
    template: "%s | Global Education Consultancy",
  },
  description: "Empowering your journey to international education, study abroad admissions, and global career growth.",
  openGraph: {
    title: "Global Education & Career Consultancy",
    description: "Expert study abroad and career counseling.",
    url: "/",
    siteName: "Global Education",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Global Education Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}>
      <body className="flex min-h-full flex-col bg-slate-950 font-sans text-slate-100 selection:bg-violet-500 selection:text-white">
        
        {/* Wrap everything that needs state in AuthProvider */}
        <AuthProvider>
          <Navbar />
          
          {/* Main content area */}
          <main className="flex-1">
            {children}
          </main>
        </AuthProvider>

        {/* Google Analytics Implementation */}
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
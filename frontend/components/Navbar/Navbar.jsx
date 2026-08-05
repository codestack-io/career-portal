import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Career<span className="text-blue-600">Portal</span>
        </h1>

        <nav className="hidden md:flex gap-10 text-lg">

          <Link href="/">Home</Link>

          <Link href="/about">About</Link>

          <Link href="/services">Services</Link>

          <Link href="/study-destinations">Destinations</Link>

          <Link href="/blogs">Blogs</Link>

        </nav>

        <Link
          href="/contact"
          className="bg-black text-white px-8 py-4 rounded-full"
        >
          Contact
        </Link>

      </div>
    </header>
  );
}
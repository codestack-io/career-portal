/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // Required for static export if using Next.js Image component
  },
};

export default nextConfig;

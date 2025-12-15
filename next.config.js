/** @type {import('next').NextConfig} */
const nextConfig = {
  // Critical for GitLab Pages: tells Next.js to generate static HTML/JSON/CSS into an 'out' folder
  output: 'export',
  
  // Optional: optimizes images for static export (since the default Image component requires a server)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
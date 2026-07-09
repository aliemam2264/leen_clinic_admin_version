/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  // If you want to upload the site as pure static files to cPanel/static hosting,
  // uncomment the next line then run: npm run build
  // output: 'export'
};

export default nextConfig;

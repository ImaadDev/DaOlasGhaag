/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // allows any path on Unsplash
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // allows any path on Cloudinary
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**', // allows any path on Sanity CDN
      },
    ],
  },
};

export default nextConfig;

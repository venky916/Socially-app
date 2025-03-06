/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "8m8e80ou0k.ufs.sh",
      },
    ],
  },
};

export default nextConfig;

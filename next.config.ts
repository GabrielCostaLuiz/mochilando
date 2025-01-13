import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "moccasin-fancy-heron-222.mypinata.cloud",
      },
    ],
  },
}

export default nextConfig

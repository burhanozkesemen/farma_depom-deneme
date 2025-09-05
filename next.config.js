/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    const external = process.env.EXTERNAL_API_URL;
    if (!external) return [];
    const base = external.endsWith('/') ? external.slice(0, -1) : external;
    return [
      {
        source: '/api/:path*',
        destination: `${base}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

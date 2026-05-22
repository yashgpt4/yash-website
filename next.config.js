/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // Supabase Storage
      process.env.NEXT_PUBLIC_SUPABASE_URL
        ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
        : 'supabase.co',
      // Cloudflare Images (future)
      'imagedelivery.net',
    ],
  },

  // Rewrite tab-based routes to root so index.html JS can pick up the path.
  // This is a fallback for when Vercel auto-detects and builds the Next.js app.
  async rewrites() {
    return {
      fallback: [
        { source: '/about', destination: '/' },
        { source: '/portfolio', destination: '/' },
        { source: '/principles', destination: '/' },
        { source: '/blog', destination: '/' },
        { source: '/sakura', destination: '/' },
        { source: '/inspo', destination: '/' },
        { source: '/entrepreneurship', destination: '/' },
      ],
    };
  },
};

module.exports = nextConfig;

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

  // beforeFiles rewrites run BEFORE Next.js checks any page or route handler.
  // This ensures /portfolio, /about, etc. always get index.html from public/,
  // regardless of what's in app/[...slug]/route.ts.
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/about', destination: '/index.html' },
        { source: '/portfolio', destination: '/index.html' },
        { source: '/principles', destination: '/index.html' },
        { source: '/blog', destination: '/index.html' },
        { source: '/sakura', destination: '/index.html' },
        { source: '/inspo', destination: '/index.html' },
        { source: '/entrepreneurship', destination: '/index.html' },
      ],
    };
  },
};

module.exports = nextConfig;

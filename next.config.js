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
};

module.exports = nextConfig;

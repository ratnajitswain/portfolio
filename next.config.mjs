/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      env:{
        GOOGLE_AI_API_KEY:process.env.GOOGLE_AI_API_KEY,
        MONGODB_URI:process.env.MONGODB_URI
      }
};

export default nextConfig;

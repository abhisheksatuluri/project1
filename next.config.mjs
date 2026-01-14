/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow images from external sources (avatars, etc.)
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};

export default nextConfig;

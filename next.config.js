/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'suitmedia.static-assets.id',
            }
        ],
    }
}

module.exports = nextConfig

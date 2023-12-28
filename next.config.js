/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: [
            'codemarket.s3.ap-south-1.amazonaws.com',
            'static.vecteezy.com',
            'emartbackend-7b7e.onrender.com',
            'user-images.githubusercontent.com',
            'miro.medium.com'
        ]
    },

    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            },
        ]
    }


}

module.exports = nextConfig

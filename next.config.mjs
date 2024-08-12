/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images:{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's1.ticketm.net',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;

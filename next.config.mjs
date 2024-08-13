/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images:{
        remotePatterns: [
            {
             
                hostname: 's1.ticketm.net',
            
            },
            {
                protocol: 'https',
                hostname: 'dummyimage.com',
                port: '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;

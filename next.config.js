/** @type {import('next').NextConfig} */
const nextConfig = {
  // Разрешаем загрузку изображений с Unsplash
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
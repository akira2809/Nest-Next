/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'file.hstatic.net',
      'product.hstatic.net',
      'owen.cdn.vccloud.vn',
      'dosi-in.com',
      "i.ytimg.com" // Thêm domain này
    ],
  },
};

module.exports = nextConfig;

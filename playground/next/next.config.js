// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false,
//         path: false,
//         os: false,
//         crypto: false,
//         stream: false,
//         http: false,
//         https: false,
//         zlib: false,
//         url: false,
//         util: false
//       },
//       // add config for react jsx
//       config.module.rules.push({
//         test: /\.(js|jsx)?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/react']
//           }
//         }
//       })
//     }
//     return config
//   }

// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  // Configure webpack NOT to ignore node_modules changes for HMR
  webpack: config => {
    config.snapshot = {
      ...(config.snapshot ?? {}),
      // Add all node_modules but @next module to managedPaths
      // Allows for hot refresh of changes to @next module
      managedPaths: [/^(.+?[\\/]node_modules[\\/])(?!@next)/],
    };
    return config;
  },
};

module.exports = nextConfig;
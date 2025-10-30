module.exports = {
  images: {
    domains: [
      'localhost',
      "developers.google.com"
    ],
  },
  experimental: {
    scrollRestoration: true,
     outputFileTracingRoot: __dirname,
  },
  env: {
    UPSTAGE_API_KEY: process.env.UPSTAGE_API_KEY,
  },
};

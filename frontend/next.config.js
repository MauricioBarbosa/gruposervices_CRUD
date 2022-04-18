/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'observatoriodocinema.uol.com.br'
    ]
  },
  env: {
    BACKEND_URL: 'http://localhost:3001/', 
    BACKEND_URL_CONTAINER: 'http://localhost:3001/'
  },
};
  
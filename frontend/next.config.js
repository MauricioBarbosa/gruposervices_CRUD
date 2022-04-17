/** @type {import('next').NextConfig} */
module.exports = {
  webpackDevMiddleware: (config) => {
    // Solve compiling problem via vagrant
    config.watchOptions = {
      poll: 1000,   // Check for changes every second
      aggregateTimeout: 300,   // delay before rebuilding
      ignored: ['**/files/**/*.js', '**/node_modules', '**/.next'],
    };
    return config;
  },
  images: {
    domains: [
      'observatoriodocinema.uol.com.br'
    ]
  },
  env: {
    BACKEND_URL: 'http://localhost:3001', 
    BACKEND_URL_CONTAINER: 'http://gruposervices_crud-gruposervices_backend-1:3001'
  }
};

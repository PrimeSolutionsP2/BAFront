module.exports = {
  reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'via.placeholder.com',
          port: '',
          pathname: '/150',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8080',
          pathname: '/users/v1/get/users',
        }
      ],
    },
  }
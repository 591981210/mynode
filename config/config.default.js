module.exports = {
  baseURL: 'http://localhost:8000/api/v1/',
    rememberMeExpires: 1000 * 60 * 60 * 24,
    crypto: {
        alg: 'aes-256-cfb',
        secret: 'itcast'
    }
}

const axios = require('axios')
const config = require('../config/config.default')

// 配置 axios 请求的基准路径
const instance = axios.create({
  baseURL: config.baseURL
})


module.exports = instance

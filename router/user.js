const express = require('express')
const userCtrl = require('../controller/user')

const router = express.Router()

// 查询指定用户的问题
router.get('/users/check', userCtrl.check)

module.exports = router

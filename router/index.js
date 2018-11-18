const express = require('express')
const indexCtrl = require('../controller/index')
const router = express.Router()


router.get('/', indexCtrl.showIndex);
router.get('/login', indexCtrl.loginIndex);

module.exports = router
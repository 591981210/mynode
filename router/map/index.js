const express = require('express')
const indexCtrl = require('../../controller/index')
const router = express.Router()

//渲染页面
router.get('/', indexCtrl.showIndex);
router.get('/demo', (req, res, next) => {
//    测试用
});
router.get('/login', indexCtrl.loginIndex);



//逻辑处理
router.post('/signup', indexCtrl.signup);
router.get('/captcha', indexCtrl.captcha);
router.get('/captcha/check', indexCtrl.checkCaptcha)

module.exports = router
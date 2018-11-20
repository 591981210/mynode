const User = require('../service/user.js')
var svgCaptcha = require('svg-captcha');

module.exports.showIndex = async (req, res, next) => {
    res.render('index.html')
}
module.exports.loginIndex = async (req, res, next) => {
    res.render('login.html')
}
/**
 * 用户注册
 */
module.exports.signup = async (req, res, next) => {
    // 1. 获取数据
    const {email, password, nickname, captcha} = req.body

    const {captcha: sessionCaptcha} = req.session
    // 如果当前最新时间超过了会话验证码的过期时间
    if (+new Date() > sessionCaptcha.expires) {
        return res.status(200).json({
            code: 4,
            message: '验证码已过期'
        })
    }

    // 2. 表单数据验证
    // 验证码校验
    if (captcha.toLowerCase() !== sessionCaptcha.text.toLowerCase()) {
        return res.status(200).json({
            code: 1,
            message: '验证码错误'
        })
    }

    // 3. 注册
    const user = await User.signup({
        email,
        password,
        nickname
    })

    res.status(200).json({
        code: 0,
        message: 'ok'
    })
}


/**
 * 验证码
 */
module.exports.captcha = async (req, res, next) => {
    const captcha = svgCaptcha.create() // 创建验证码
    req.session.captcha = {
        text: captcha.text, // 验证码文本内容
        expires: +new Date() + 1000 * 60 * 10 // 验证码过期时间
    } // 把验证码存储到会话 Session 中
    res.type('svg') // 设置响应内容类型
    res.status(200).send(captcha.data) // 发送响应结果
}

/**
 * 校验验证码
 */
exports.checkCaptcha = async(req, res, next) => {
    const { captcha } = req.query
    const { captcha: sessionCaptcha } = req.session
    console.log(123123)
    console.log(sessionCaptcha);
    let ret = false

    if (!sessionCaptcha) {
        res.end()
    }

    // 如果验证码没有过期并且用户输入的验证码和 Session 中的验证码一致
    if (+new Date() < sessionCaptcha.expires && captcha.toLowerCase() === sessionCaptcha.text.toLowerCase()) {
        ret = true
    }
    res.status(200).send(ret)
}



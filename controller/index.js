const User = require('../service/user.js')
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
    const {email, password, nickname} = req.body

    // 2. 昵称是否被占用
    if (await User.findByNickname(nickname)) {
        return res.status(200).json({
            code: 2,
            message: '昵称已存在'
        })
    }

    // 3. 注册
    const user = await User.signup({
        email,
        password,
        nickname
    })

    //返回数据
    return res.status(200).json({
        code: 0,
        message: 'OK'
    })
}


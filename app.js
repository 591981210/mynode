const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const router = require('./router')
const proxy = require('http-proxy-middleware')
const config = require('./config/config.default')
const app = express()
var session = require('express-session')
var cookieParser = require('cookie-parser')
const rememberMe = require('./middleware/remember-me')


// 配置代理中间件,一般上传文件时,需要将域名代理到腾讯或阿里云等,所以/api 开头都代理处理
app.use('/api', proxy({
    // /api/upload
    // http://192.168.10.217:8000/api/v1/upload
    target: config.baseURL, // 代理的目标网址
    changeOrigin: true,
    pathRewrite: {
        '^/api' : '',// /api/upload
    },
}))

// 开放 public 目录资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.use(express.json()) // application/json 格式的数据 {key: value, key: value...}
app.use(express.urlencoded({
    extended: true
})) // application/x-www-form-urlencoded key=value&key=value...

// 配置解析 Cookie 的中间件
app.use(cookieParser())

// 配置 Session 中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))


nunjucks.configure(path.join(__dirname, './view/'), {
    autoescape: true,
    express: app,
    watch:true //启动监事文件,文件改变,重新编译
});

//挂载html 访问路由链接
app.use(rememberMe)
app.use((req, res, next) => {
    // 挂载到 app.locals 中的数据可以直接在模板页中访问
    app.locals.sessionUser = req.session.user
    app.locals.config = config
    next()
})
app.use(...router)
//错误返回
app.use((err, req, res, next) => {
    const response = err.response
    if (response) {
        res.status(response.status).send(response.data)
    } else {
        res.status(500).send(err)
    }
})

app.listen(3001,()=>{

    console.log('服务启动成功');
    console.log('http://localhost:3001/')
})
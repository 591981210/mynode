const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
const router = require('./router')
const app = express()
var session = require('express-session')
var cookieParser = require('cookie-parser')



// 开放 public 目录资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.use(express.json()) // application/json 格式的数据 {key: value, key: value...}
app.use(express.urlencoded({
    extended: true
})) // application/x-www-form-urlencoded key=value&key=value...

//session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
//    cookie
app.use(cookieParser())


nunjucks.configure(path.join(__dirname, './view/'), {
    autoescape: true,
    express: app,
    watch:true //启动监事文件,文件改变,重新编译
});

//挂载html 访问路由链接
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
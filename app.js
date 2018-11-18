const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()


// 开放 public 目录资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))


nunjucks.configure(path.join(__dirname, './view/'), {
    autoescape: true,
    express: app,
    watch:true //启动监事文件,文件改变,重新编译
});

app.get('/', function(req, res) {
    res.render('index.html',{
        foo:'bar'
    });
});

app.get('/',(req,res,next)=>{
    res.status(200).send('hello world')
})


app.listen(3000,()=>{

    console.log('服务启动成功');
    console.log('http://localhost:3000/')
})
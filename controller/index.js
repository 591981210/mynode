module.exports.showIndex = async(req,res,next)=>{
    res.render('index.html')
}
module.exports.loginIndex = async(req,res,next)=>{
    res.render('login.html')
}
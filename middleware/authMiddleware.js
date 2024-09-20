//Middleware para verificar se o usuario esta logado no sistema
function isAuthenticated(req,res,next) {
    if (req.session && req.session.user) {
        return next();
        
    }else{
       res.redirect('login.html') ;
    }
}
module.exports = {isAuthenticated};
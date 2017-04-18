/**
  @@@@@@@@@ external library @@@@@@@@@@@
  1) Passport
        we have used passport from http://passportjs.org/docs/configure
 */

var auth = require('../controllers/auth');
//you can include all your controllers here

module.exports = function (app, passport) {
    app.get('/user/status',auth.userStatus);
    app.get('/user/confirm', auth.userConfirmation);
    app.post('/user/logout', auth.logout);
    app.post('/user/forgotpassword', auth.forgotpassword);
    app.post('/user/resendactivationmail', auth.resendactivationmail);
    // sigin and signup route with passport implemention start from here
    app.post('/user/registration',function(req,res){
        passport.authenticate('local-signup',function(err, user, info){
            if(err){
                res.status(500).send(info);
            }else if(!user){
                res.status(200).send(info);
            }else{
                res.status(200).send(info);
            }
        })(req, res);
    });
    app.post('/user/login',function(req,res){
        passport.authenticate('local-signin',function(err, user, info){
            if(err){
                res.status(500).send(info);
            }else if(!user){
                res.status(200).send(info)
            }else{
                req.logIn(user, function(err) {
                    if (err) { return res.status(401).send({status : true,message:"Login not successfully"}) }
                    res.status(200).send(info);
                });
            }
        })(req, res)
    });
    // sigin and signup route with passport implemention start from here
}


/**
 @@@@@@@@@ external library @@@@@@@@@@@
 1) passport-local
 2) bcrypt-nodejs
 we have used bcrypt-nodejs https://www.npmjs.com/package/bcrypt-nodejs
 we have used passport-local https://www.npmjs.com/package/passport-local
 */
var LocalStrategy   = require('passport-local').Strategy;
var Users  		    = require('../../models/users.js');
var bcrypt          = require('bcrypt-nodejs');
var sendEmail          =  require('../../libs/email.js');
 module.exports     = function(passport) {
     /* =========================================================================
      How to work serializeUser and deserializeUser

      passport.serializeUser(function(user, done) {
      done(null, user.id);
                  |
                  |
                  |_________ //saved to session req.session.passport.user = {id:'..'}
      });                                |-------|
                                         |
      passport.deserializeUser(function(id, done) {
      ___________________|
      |
      User.findById(id, function(err, user) {
      done(err, user);
      |
      |____________________//user object attaches to the request as req.user
      });
      });
      http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
      =========================================================================
      */

     passport.serializeUser(function (user, done) {
         done(null, user.email);
     });

     // used to deserialize the user
     passport.deserializeUser(function (email, done) {
         Users.findOne({email: email}, function (err, user) {
             done(err, user);
         });
     });
     /* =========================================================================
         LOCAL SIGNUP
       =========================================================================
      */
     passport.use('local-signup', new LocalStrategy({
         usernameField : 'email',
         passwordField : 'password',
         passReqToCallback : true
     },function(req, email, password, done){
         Users.findOne({email:email},function(err,user){
            if(err){
                return done("Error Occour From The Database : " +err);
            }
             // if user exist
            if(user){
                if(user.active_status === false){
                    var isoDate       = new Date().toISOString();
                    Users.update({email:email},{$set:{created_date: isoDate}},function(err,data){
                        if(err){
                            return done("Error Occour From The Database : " +err);
                        }
                        sendEmail.activate_email(req.body.name, email, user.active_code,null, function(err,data){
                            if(err){
                                return done("Error Occour From The Mail Library "+ err);
                            }
                            req.session.destroy();
                            return done(null, false,{status : false, message:"This Account is Already Exists,Please Check Your Email For Account Confirmation"});
                        });
                    })
                }else{
                    return done(null, false, { status : false , message: "The Email Has Already Exist"});
                }
            }
            // if there is no user with that email then create new user
            else{
                var newUser       = new Users(); // create Users object
                var active_code   = bcrypt.hashSync(Math.floor((Math.random() * 99999999) *54), null, null);
                var active_status = false;
                var isoDate       = new Date().toISOString();
                var created_date  = isoDate ;
                var updated_date  = isoDate;
                //add value in object
                newUser.name           = req.body.name;
                newUser.email          = email;
                newUser.mobile         = req.body.mobile;
                newUser.password       = newUser.generateHash(password);
                newUser.accountType    = req.body.accountType;
                newUser.active_code    = active_code;
                newUser.active_status  = active_status;
                newUser.created_date   = created_date;
                newUser.updated_date   = updated_date;
                newUser.save(function(err){
                    if(err){
                        return done(err);
                    }
                    sendEmail.activate_email(req.body.name, email, active_code,null, function(err,data){
                        if(err){
                            return done(err);// we can try to write pending model here
                        }
                        req.session.destroy();
                        return done(null, newUser,{status : true, message:"Account Created Successfully,Please Check Your Email For Account Confirmation"});
                    });
                })
            }
         })
     }));
     /* =========================================================================
      LOCAL SIGNIN
      =========================================================================
      */
     passport.use('local-signin', new LocalStrategy({
         usernameField : 'email',
         passwordField : 'password',
         passReqToCallback : true
     },function(req, email, password, done){
         Users.findOne({email: email},function(err,user){
             if(err){
                 return done(err);
             }
             if(!user){
                 return done(null, false,{status : false, message:"Sorry Your Account Not Exits ,Please Create Account"});
             }
             if(user.active_status === false){
                 return done(null, false,{status : false, message:"Sorry Your Account Not Verfied From Your Mail"});
             }
             if(!user.validPassword(password)){
                 return done(null,false,{status : false,message:"Sorry Your Password is incorrect"});
             }
             // all is well, return successful user
             req.session.user = user;

             return done(null, user,{status : true,message:"Login successfully"});
         })
     }));

 }
var Users  		        = require('../models/users.js');
var SendMail  		    = require('../libs/email.js');
function loggedIn(req,res,next){
    if (!req.isAuthenticated()) {
        return res.status(401).send({status: false});
    }
    next();
}
function userStatus(req,res){
	if (!req.isAuthenticated()) {
	    return res.status(401).send({status: false});
    }
    res.status(200).json({status: true});
}
function userConfirmation(req,res){
    Users.findOne({email : req.query.email, active_code : req.query.active_link},function(err,result){
        if(err){
            return res.status(500).send("Error Occour in Database "+err); //we can add rout for 500
        }
        if(!result){
            return res.status(400).send({status: false,message:"Your Requested Email And Activation link is in valid"}); //we can add rout for 500
        }
        var pastDate    = new Date(result.created_date);
        var d = new Date();
            d = d.toISOString();
        var currentDate = new Date (d);
        var timeDiff    = currentDate.getTime() - pastDate.getTime();
        if(timeDiff > 3600000){
            return res.status(404).send({status: false,message:"Activation Link Has Expaired"}); //we can add rout for 404
        }else{
            Users.update({email:req.query.email,active_code : req.query.active_link},{$set:{active_status: true}},function(err,data){
                if(err){
                    return res.status(500).send("Error Occour in Database "+err);
                }
                res.redirect('/');
            })
        }

    });
}
function logout(req, res){
    if(req.body.key === "logout"){
        req.logout();
        res.status(200).send({status:true,message:"Logout Successfully"})
    }
}
function forgotpassword(req,res){
    if(req.body.password,req.body.email){
        Users.findOne({email:req.body.email},function(err,data){
            if(err){
                return res.status(500).send("Error Occour in Database "+err); //we can add rout for 500
            }
            if(!data){
                return res.status(400).send({status: false,message:"Your Requested Email is not registered"}); //we can add rout for 400
            }
            Users.update({email:data.email},{$set:{password : data.generateHash(req.body.password)}},function(err,result){
                if(err){
                    return res.status(500).send("Error Occour in Database "+err); //we can add rout for 500
                }
                if(!data){
                    return res.status(400).send({status: false,message:"Your Requested Email is not registered"}); //we can add rout for 400
                }
                SendMail.activate_email(data.name,data.email,null,req.body.password,function(err,data){
                    if(err){
                        return res.status(500).send("Error Occour in mail "+err); //we can add rout for 500
                    }
                    return res.status(200).send({status: true,message:"Password sent in your mail"}); //we can add rout for 500
                })
            })
        })
    }else{
        return res.status(400).send({status: false,message:"You need to call post"}); //we can add rout for 400
    }
}
function resendactivationmail(req,res){
    if(req.body.email){
        Users.findOne({email:req.body.email},function(err,data){
            if(err){
                return res.status(500).send("Error Occour in Database "+err); //we can add rout for 500
            }
            if(!data){
                return res.status(400).send({status: false,message:"Your Requested Email is not registered"}); //we can add rout for 400
            }
            var isoDate       = new Date().toISOString();
            Users.update({email:data.email},{$set:{created_date : isoDate}},function(err,result){
                if(err){
                    return res.status(500).send("Error Occour in Database "+err); //we can add rout for 500
                }
                if(!result){
                    return res.status(400).send({status: false,message:"Your Requested Email is not registered"}); //we can add rout for 400
                }
                SendMail.activate_email(data.name,data.email,data.active_code,null,function(err,mail){
                    if(err){
                        return res.status(500).send("Error Occour in mail "+err); //we can add rout for 500
                    }
                    return res.status(200).send({status: true,message:"Activation link sent in your mail"}); //we can add rout for 500
                })
            })
        })
    }else{
        return res.status(400).send({status: false,message:"You need to call post"}); //we can add rout for 400
    }
}
module.exports = {
	loggedIn            : loggedIn,
	userStatus          : userStatus,
    userConfirmation    : userConfirmation,
    logout              : logout,
    forgotpassword      : forgotpassword,
    resendactivationmail: resendactivationmail
}
var devenv       = require('../config/environments/development.js');
var nodemailer   = require('nodemailer');
module.exports.activate_email = function(name, userEmail, acitvate_link,password, cb){
    console.log(name, userEmail, acitvate_link,password);
    if(name && userEmail && acitvate_link && !password){
        // get mail template
        devenv.getMailTemplate(name, userEmail, acitvate_link, password, function(err,data){
            if(err){
                return cb("Error in Proceedings Html Template " +err);
            }
            sendUserMail(data);
        });
    }else{
        if(name && userEmail && !acitvate_link && password){
            devenv.getMailTemplate(name, userEmail, acitvate_link,password, function(err,data){
                if(err){
                    return cb("Error in Proceedings Html Template " +err);
                }
                sendUserMail(data);
            });
        }else{

            return cb("name && userEmail && password && acitvate_link in not available");
        }
    }

    function sendUserMail(mailTemplate){
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            service: devenv.service,
            auth: {
                user: devenv.user,
                pass: devenv.pass
            }
        });
        // setup email data with unicode symbols
        var mailOptions = {
            from    : devenv.from, // sender address
            to      : userEmail, // list of receivers
            subject : devenv.subject, // Subject line
            text    : devenv.text, // plain text body
            html    : mailTemplate // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return cb("Error Cccour in SMTP Server "+error);
            }
            return cb(null,"Your Corresponding Confirmation Mail Has Sent");
        });
    }
}
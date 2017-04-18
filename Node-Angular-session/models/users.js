var mongoose 	= require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var userSchema 	= mongoose.Schema({
	name        : String,
	email       : {type:String,required: true},
	mobile      : {type : String,required:true,min:10,max:10},
	password    : {type:String,required: true},
	accountType : String,
	active_code : String,
	active_status: Boolean,
	created_date: { type: String},
	updated_date: { type: String}
});
//methods ======================
//generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};
//create the model for users and expose it to our app
module.exports = mongoose.model('Users', userSchema);
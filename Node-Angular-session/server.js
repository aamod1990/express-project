var app		= require('./app');
var config	= require('./config/config.json')
var env = {
	"title"		: process.title,
	"version"	: process.version,
	"platform"	: process.platform
}
app.listen(config.PORT, function () {
  console.log('Server listening on port '+config.PORT);
  console.log('with follwing environment '+ JSON.stringify(env))
})
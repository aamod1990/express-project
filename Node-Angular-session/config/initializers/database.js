var config   = require('../../config/config.json');
var mongoose = require('mongoose'); 
function connectMongoDB(){
    var str = [ ];
    config.mongo.replicas.forEach(function(item){
        str.push( item + '/' + config.mongo.database);
    });
    var connectionString = "mongodb://" + config.mongo.username +  ":" + config.mongo.password + '@' + str.join(",");
 	//CONNECTION METHOD OF MONGOOSE ORM
    mongoose.connect(connectionString);
    // CONNECTION EVENTS

    // When successfully connected
	mongoose.connection.on('connected', function () {  
	  console.log('Mongoose default connection open to ' );
	}); 

	// If the connection throws an error
	mongoose.connection.on('error',function (err) {  
	  console.log('Mongoose default connection error: ' + err);
	}); 

	// When the connection is disconnected
	mongoose.connection.on('disconnected', function () {  
	  console.log('Mongoose default connection disconnected'); 
	});

	// If the Node process ends, close the Mongoose connection 
	process.on('exit', function (){
	  console.log('Goodbye!!! Node Server stoped');
	});
	
	process.on('SIGINT', function() {  
	  mongoose.connection.close(function () { 
	    console.log('Mongoose default connection disconnected through app termination'); 
	    process.exit(0); 
	  }); 
	}); 
}
module.exports = {
	connectMongoDB : connectMongoDB
}
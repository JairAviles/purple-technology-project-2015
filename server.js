//Dependencies
var Hapi = require('hapi'); //Hapi Object instance from module

//Global Objects
var server = new Hapi.Server(); //Global Hapi server instance

//Start server
function start(routes) {

	// Create a server with a host and port
	server.connection({
		host: '0.0.0.0',
		port: parseInt(process.env.PORT, 10) || 3000
	});

	//Add routes to current server
	server.route(routes);

	//Start server
	server.start(function(err) {
		if(err) {
			console.log('Internal server error:' + err);
		}
		console.log('Server running at:', server.info.uri);
	});
}

//Return start Server method
module.exports.start = start;
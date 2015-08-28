var Hapi = require('Hapi'), //Hapi Object instance from module
    port = parseInt(process.env.PORT, 10) || 3000, //Asign port by enviroment variable or 3000 as default
	server = new Hapi.Server(); //global server instance

function start(routes) {

	// Create a server with a host and port
	server.connection({
		host: 'localhost',
		port: port
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

module.exports.start = start;
//Dependencies
var server = require('./server'), // Server module
	routes = require('./routes/api'); // Routes module

// Implementing 'Dependency Injection' for having loousy,
// non-blocking & asynchronous functions and classes,
// regarding future scalability of this app
server.start(routes);
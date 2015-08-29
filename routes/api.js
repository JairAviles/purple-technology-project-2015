//Dependencies
var Joi = require('joi'), //Joi property for validation requirements
	fx  = require('money'), //Library for easy currency conversion
	oxr = require('open-exchange-rates'); //API wrapper

//Config Object
var config = require('../config/config'); // Config module

// Set App ID (required):
oxr.set({
    app_id: config.api_open_exchange_rates_key
});

//Return routes
module.exports = [
	// Greeting
	{
	  method: 'GET',
	  path: '/',
	  handler: function (req, rep) {
	     rep({
	     	message: 'Welcome to exchange-rates API!',
	     	url: 'https://github.com/JairAviles/purple-technology-project-2015',
	     	wiki: 'https://github.com/JairAviles/purple-technology-project-2015/wiki',
	     	author: 'Jair Israel Aviles Eusebio',
	     	version: config.version 
	     }).type('application/json');
	  }
	},
	// Go to default route
	{
	  method: 'GET',
	  path: '/exchange-rates',
	  handler: function (req, rep) {
	    rep.redirect('/exchange-rates/' + config.baseCurrency);
	  }
	},	
	// Go to default route
	{
	  method: 'GET',
	  path: '/exchange-rates/',
	  handler: function (req, rep) {
	    rep.redirect('/exchange-rates/' + config.baseCurrency);
	  }
	},	
	// Base route for API with optional parameters
    {
	    method: 'GET',
	    path: '/exchange-rates/' + config.baseCurrency,
	    handler: getExchangeRate,
	    config: {
	    	validate: {
	    		query: {
	    			toCurrency: Joi.string().min(3).max(3).required(),
	    			amount: Joi.number().default(1).optional()
	    		}
	    	}
	    }
	},
	//Validate other methods types and reject
	{
		method:['POST', 'PUT', 'DELETE'],
		path: '/',
		handler: function(req, rep) {
			rep().type('application/json').code(400); //return Bad Request
		}
	},
	{
		method:['POST', 'PUT', 'DELETE'],
		path: '/exchange-rates/{param?}',
		handler: function(req, rep) {
			rep().type('application/json').code(400); //return Bad Request
		}
	}
];

//Validate the params from request and reply according to them
function getExchangeRate(req, rep) {
	    var params = {}; //Object that handles the params data from request
	   
	    /* Expecting /exchange-rates/USD&toCurrency=value&amount=value */
	    params.toCurrency   = req.query.toCurrency ? encodeURIComponent(req.query.toCurrency).toUpperCase() : undefined; //Get toCurrency from uri parameters
	    params.amount = req.query.amount; //Get amount from uri parameters
		try {
			rep(findLatestRate(params)).type('application/json').code(200);
		} catch(err) {
			rep('Internal Error. Please, try again.').code(500);
		}	
}

//This function will validate the received
//params and invoke the third
//party api call
function findLatestRate(params) {
	//Break point
     debugger;
     // Result Variable
     var jsonObj = {};     

     // Get latest exchange rates from API and pass to callback function
    oxr.latest(function(err) { //node callback structure
     	if(err) {
     		//Print stack trace according to enviroment
     		console.log(
     			 config.node_env === 'development' ? 
     			 err.toString() : 
     			 'Error occurred when trying to consume ox API'
     			);

     		return false;
     	}
     	// Apply exchange rates and base rate to 'fx' library object:
    	fx.rates = oxr.rates; //Rates Currency from APU call
    	fx.base = oxr.base; //Base Currency from API call
     });
    //Prepare jsonObj according to params
     	if(params.toCurrency && params.toCurrency in config.currencies_list) {
			//prepare result for base currency to specified currency
			jsonObj.baseCurrency = {
		    	'fromCurrency': config.baseCurrency,
		    	'amount': params.amount
		    }; 
		    jsonObj.toCurrency = {
		    	'toCurrency':  params.toCurrency,
		    	'amountRate': fx(params.amount).from(config.baseCurrency).to(params.toCurrency)
		    };
		} else {
			jsonObj.statusCode = 400;
			jsonObj.error = 'Bad request';
			jsonObj.message = 'Only the following exchange currencies are available: ' +
							  Object.keys(config.currencies_list);
		}
	return JSON.stringify(jsonObj);
}
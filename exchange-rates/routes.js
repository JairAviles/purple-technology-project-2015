var Joi = require('joi'); //Joi property for validation requirements

module.exports = [
// Default route
	{
	  method: 'GET',
	  path: '/',
	  handler: function (req, rep) {
	    // rep.redirect('/exchange-rates/');
	     rep({
	     	message: 'Welcome to exchange-rates API!',
	     	url: 'https://github.com/JairAviles/purple-technology-project-2015',
	     	wiki: 'https://github.com/JairAviles/purple-technology-project-2015/wiki',
	     	author: 'Jair Israel Aviles Eusebio'
	     }).type('application/json');
	  }
	},
// Base route for API with optional parameters
    {
	    method: 'GET',
	    path: '/exchange-rates',
	    handler: getExchangeRate,
	    config: {
	    	validate: {
	    		query: {
	    			fromCurrency: Joi.string().required().min(3).max(3).default('EUR'),
	    			toCurrency: Joi.string().required().min(3).max(3).default('CZK')
	    		}
	    	}
	    }
	}
];

//function that validate the params from request and reply according to them
function getExchangeRate(req, rep) {
	    //expecting /exchange-rates/?fromCurrency=value&toCurrency=value
	    var fromCurrency = req.query.fromCurrency, //Get baseCurrency from uri parameter
			toCurrency   = req.query.toCurrency; //Get toCurrency from uri parameter
		rep(findLatestRate(fromCurrency, toCurrency));
}

//This function will find the Latest Rate for EUR, USD, GBP, CZK, JPY
function findLatestRate(fromCurrency, toCurrency) {
	return 'From Currency: ' + fromCurrency + ' To Currency: ' + toCurrency + '!';
}
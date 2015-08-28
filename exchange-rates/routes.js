var Types = require('hapi').types; //Types property for validation requirements

module.exports = [
// Add a route
	{
	  method: 'GET',
	  path: '/',
	  handler: function (req, rep) {
	    rep.redirect('/exchange-rates/');
	  }
	},
    {
	    method: 'GET',
	    path: '/exchange-rates/{baseCurrency?}',
	    handler: getExchangeRate
	}
];

function getExchangeRate(req, rep) {
		var baseCurrency = req.params.baseCurrency; //Get baseCurrency from uri parameter

		if(!baseCurrency) {
       		return rep('Welcome to exchange-rates API !!!');
		}
		rep(findLatestRate(baseCurrency));
}

//This function will find the Latest Rate for EUR, USD, GBP, CZK, JPY
function findLatestRate(baseCurrency) {
	return 'Base Currency: ' + baseCurrency + '!';
}
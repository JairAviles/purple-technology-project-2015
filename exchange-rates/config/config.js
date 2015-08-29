// Global Object
var config = {};

// Object Definition
config.currencies_list = {};

config.node_env = process.env.NODE_ENV || "production"; //Enviroment
config.api_open_exchange_rates_key = process.env.API_OPEN_EXCHANGE_RATES_KEY || "0bde6c73f7754a0da05461c28e769000"; //API Id
config.version = process.env.VERSION || "RC1"; //Current api version
config.baseCurrency = "USD"; //Base Currency
config.currencies_list = {
	USD: "United States Dollar", //Available currency
	EUR: "Euro", //Available currency
	GBP: "British Pound Sterling", //Available currency
	CZK: "Czech Republic Koruna", //Available currency
	JPY: "Japanese Yen" //Available currency
};

//Return config Object
module.exports = config;
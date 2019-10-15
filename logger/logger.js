var chalk = require( "chalk" );

var Logger = function() {};

Logger.prototype.info = function(logText) {
     console.log(chalk.green.bold(new Date()+'info:::::'+logText));
    
    
};

Logger.prototype.debug = function(logText) {
    console.log(chalk.yellow.bold(new Date()+'debug:::::'+logText));
    
};

Logger.prototype.error = function(logText) {
    console.log(chalk.red.bold(new Date()+'error:::::'+logText));
    
};

module.exports = new Logger();
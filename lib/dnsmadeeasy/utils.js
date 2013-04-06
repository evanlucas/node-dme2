/*
 *	Filename: utils.js
 *	Date: 1/9/13
 *	
 *	Description: Simple utility class for dnsmadeeasy.js
 *	Author: Evan Lucas
 *	
 */
exports.getArgs = function(a) {
	return Array.prototype.slice.call(a);
};

exports.getCB = function(args) {
	return (typeof args[args.length-1] === 'function') && args.pop();
}
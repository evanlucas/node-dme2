/*!
 *	Filename: core.js
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: Core file that actually makes the API requests for dme2-node
 *
 *  This file is part of dme2-node.
 *
 *  dme2-node is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  dme2-node is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with dme2-node.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

/**
 * Module depends
 */

var http = require('http'),
	https = require('https'),
	crypto = require('crypto'),
	request = require('request');

/**
 * Expose createClient
 * 
 * Example:
 *
 *		var dme = DNSMadeEasy.createClient(opts);
 *
 * @param {Object} Javascript object containing apikey, secret, and debug
 * @return {Function}
 * @api public	
 */
exports.createClient = function(options) {
	return new Client(options);
}


var Client = exports.Client = function(options) {
	if (!options) throw new Error('An options object is required');
	// options must have 
	// {
	//		apikey: '',
	//		secret: '',
	//		debug: false		// false will enable production and true is sandbox mode
	// }
	this.config = options;
	this.debug = (options.debug || false);
	this.apikey = options.apikey;
	this.secret = options.secret;
	this.host = (this.debug == true) ? 'api.sandbox.dnsmadeeasy.com' : 'api.dnsmadeeasy.com';
};

/*!
 * Generates headers for the API Request
 */
Client.prototype.generateHeaders = function() {
	var date = new Date().toGMTString();
	return {
		'x-dnsme-apiKey': this.apikey,
		'x-dnsme-requestDate': date,
		'x-dnsme-hmac': crypto.createHmac('sha1', this.secret).update(date).digest('hex'),
		'Content-Type': 'application/json'
	};
}

/*!
 * Builds the URI based on the arguments passed
 */
Client.prototype.buildURI = function(args) {
	var self = this;
	return 'https://' + self.host + '/V2.0/' + args.join('/');
}

/*!
 * Performs a GET request
 */
Client.prototype.get = function() {
	var self = this,
		args = Array.prototype.slice.call(arguments),
		cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
	
	
	var uri = self.buildURI(args);
	console.log('URI: '+uri);
	var opts = {
		uri: uri,
		headers: self.generateHeaders()
	};
	
	request(opts, function(err, res, body){
		//console.log(res);
		if (err) return cb(err);
		var output = JSON.parse(body);
		if (output) {
			cb(null, output);
		} else {
			cb(body);
		}
	});
}

/*!
 * Performs a PUT request
 */
Client.prototype.put = function() {
	var self = this,
		args = Array.prototype.slice.call(arguments),
		cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
		putData = (typeof(args[args.length - 1]) === 'object') && args.pop();
	
	
	var uri = self.buildURI(args);
	
	var opts = {
		uri: uri,
		headers: self.generateHeaders(),
		body: JSON.stringify(putData),
		method: "PUT"
	};
	
	request(opts, function(err, res, body){
		if (err) return cb(err);
		var output = JSON.parse(body);
		if (output) {
			cb(null, output);
		} else {
			cb(body);
		}
	});
}

/*!
 * Performs a POST request
 */
Client.prototype.post = function() {
	var self = this,
		args = Array.prototype.slice.call(arguments),
		cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
		postData = (typeof(args[args.length - 1]) === 'object') && args.pop();
	
	
	var uri = self.buildURI(args);
	
	var opts = {
		uri: uri,
		headers: self.generateHeaders(),
		body: JSON.stringify(postDate),
		method: "POST"
	};
	
	request(opts, function(err, res, body){
		if (err) return cb(err);
		var output = JSON.parse(body);
		if (output) {
			cb(null, output);
		} else {
			cb(body);
		}
	});
}
/*!
 * Performs a DELETE request
 */
Client.prototype.delete = function() {
	var self = this,
		args = Array.prototype.slice.call(arguments),
		cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
	
	
	var uri = self.buildURI(args);
	
	var opts = {
		uri: uri,
		headers: self.generateHeaders(),
		method: 'delete'
	};
	
	request(opts, function(err, res, body){
		if (err) return cb(err);
		var output = JSON.parse(body);
		if (output) {
			cb(null, output);
		} else {
			cb(body);
		}
	});
}
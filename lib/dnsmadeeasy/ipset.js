/*!
 *	Filename: ipset.js
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: IPSet module for DNSMadeEasy API V2.0
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
var dnsmadeeasy = require('./core'),
	utils = require('./utils');

/**
 * Expose the ManagedDNS submodule
 */
var IPSet = exports.IPSet = function(client) {
	if (!client) throw new Error('IPSet must be constructed with a client');
	
	this.client = client;
};



IPSet.prototype = {
	/**
	 * getIPSets
	 *
	 * @param {Function} Callback function(err, data)
	 * @return {Object} A list of IP Sets
	 * @api public
	 */
	
	getIPSets: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			self = this;
		
		self.client.get('dns', 'secondary', 'ipSet', function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	/**
	 * createIPSet
	 *
	 * @param {Object} ipconfig A javascript object specifying the configuration
	 * @param {Function} Callback function(err, data)
	 * @return {Object} The newly configured IP Set
	 * @api public
	 */
	createIPSet: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			ipconfig = (typeof(args[args.length - 1]) === 'object') && args.pop(),
			self = this;
		
		if (!ipconfig) {
			return cb({status: 'error', message: 'Must pass a valid object for IPSet Configuration.'});
		}
		
		self.client.post('dns', 'secondary', 'ipSet', ipconfig, function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	/**
	 * assignIPSetToDomain
	 *
	 * @param {String} domainName
	 * @param {Number} IPSetID
	 * @param {Function} Callback function(err, data)
	 * @return {Object}
	 * @api public
	 */
	 
	assignIPSetToDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			self = this;
		
		if (args.length != 2) {
			return cb({status: 'error', message: 'Must specify both the IPSetID and the Domain Name.'});
		}
		var ipSetID, domainName;
		if (typeof(args[0]) === 'number') {
			ipSetID = args[0];
			domainName = args[1];
		} else if (typeof(args[1]) === 'number') {
			domainName = args[0];
			ipSetID = args[1];
		} else {
			return cb({status: 'error', message: 'IPSetID must be a number and DomainName must be a string.'});
		}
		
		var postData = {
			name: domainName,
			ipSetId: ipSetID
		};
		self.client.post('dns', 'secondary', postData, function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
		
	},
	
	/**
	 * changeIPSetForDomainID
	 * 
	 * @param {String} domainID
	 * @param {Object} putData - The data to change
	 * @param {Function} Callback function(err, data)
	 * @return {Object}
	 * @api public
	 */
	changeIPSetForDomainID: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			putData = (typeof(args[args.length - 1]) === 'object') && args.pop(),
			domainID = (typeof(args[args.length - 1]) === 'string') && args.pop(),
			self = this;
		
		if (!putData) return cb({status: 'error', message: 'Must pass a valid javascript object for changing an IP Set.'});
		if (!domainID) return cb({status: 'error', message: 'Must pass a valid domain ID.'});
		
		self.client.put('dns', 'secondary', domainID, putData, function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
		
	}
	
	
}
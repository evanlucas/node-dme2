/*!
 *	Filename: manageddns.js
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: ManagedDNS module for DNSMadeEasy API V2.0
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
var ManagedDNS = exports.ManagedDNS = function(client) {
	if (!client) throw new Error('ManagedDNS must be constructed with a client');
	
	this.client = client;
};



ManagedDNS.prototype = {
	/**
	 * Fetches all domains
	 *
	 * @param {Function} Callback function(err, data)
	 * @return {Array} All domains for this account
	 * @api public
	 */
	getAllDomains: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
		var self = this;
		self.client.get('dns', 'managed', function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	deleteAllDomains: function() {
		// Not implementing yet...
	},
	
	updateAllDomains: function() {
		// The following values can be updated for all domains
		/*!
		 *	// PUT
		 *	Global Traffic Director 	(Bool)
		 *	Applied Template 			(int)
		 *	Vanity NS Config 			(int)
		 *	Custom SOA Record			(int)
		 *	Zone Transfer				(int)
		 *	Folder						(int)
		 *
		 */
		
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			putData = (typeof(args[args.length - 1]) === 'object') && args.pop();
			
		if (!putData) return cb({status: 'error', message: 'Must supply data envelope to edit specified domain'});
	    var self = this;
	    self.client.put('dns', 'managed', putData, function(err, data) {
		    if (err) return cb(err);
		    cb(null, data);
	    });
	},
	
	createDomains: function() {
		// POST
		// args: 
		//		should be an object
		//			{ "names": [ "name1.com", "name2.com" ] }
		//		callback
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			postData = (typeof(args[args.length - 1]) === 'object') && args.pop();
			
		var self = this;
		self.client.post('dns', 'managed', postData, function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	getDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
		
		if (args.length == 0) {
			return cb({status: 'error', message: 'Invalid domain id given'});
		}
		
		var domain_id = args[0];
		
		var self = this;
		self.client.get('dns', 'managed', domain_id, function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	deleteDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
			
		if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
		var self = this;
		self.client.delete('dns', 'managed', domain_id, function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	updateDomain: function() {
	    var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			putData = (typeof(args[args.length - 1]) === 'object') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
		if (!putData) return cb({status: 'error', message: 'Must supply data envelope to edit specified domain'});
	    if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
	    var self = this;
	    self.client.put('dns', 'managed', domain_id, putData, function(err, data) {
		    if (err) return cb(err);
		    cb(null, data);
	    });
	},
	
	getRecordsForDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
		
		if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
		var self = this;
		self.client.get('dns', 'managed', domain_id, 'records', function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	deleteRecordsForDomain: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
			
		if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
		var self = this;
		self.client.delete('dns', 'managed', domain_id, 'records', function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	createRecordsForDomain: function() {
		// POST	
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			postData = (typeof(args[args.length - 1]) === 'object') && args.pop(),
			domain_id = (typeof(args[args.length - 1]) === 'string') && args.pop();
		if (!postData) return cb({status: 'error', message: 'Must supply data envelope to create domain'});
	    if (!domain_id) return cb({status: 'error', message: 'Invalid domain id given'});
	    var self = this;
	    self.client.post('dns', 'managed', domain_id, postData, function(err, data) {
		    if (err) return cb(err);
		    cb(null, data);
	    });
	}
	
}
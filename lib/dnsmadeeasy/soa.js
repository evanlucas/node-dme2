/*
 *	Filename: soa.js
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: Exposes the SOA sub module for dme2-node
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
 
var dnsmadeeasy = require('./core'),
	utils = require('./utils');

var SOA = exports.SOA = function(client) {
	if (!client) throw new Error('SOA must be constructed with a client');
	
	this.client = client;
};





SOA.prototype = {
	getSOA: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
		var self = this;
		
		self.client.get('dns', 'soa', function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	updateSOA: function(putData, cb) {
		if (typeof(putData) !== 'object') {
			// Must be sent like
			// { "ids": ["12345", "123456"], "soaID": "9999" }
			return cb({status: 'error', message: 'Data envelope must be sent as an object'});
		}
	
		
		var self = this;
		
		self.client.put('dns', 'managed', putData, function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
		
	},
	
	createSOA: function(postData, cb) {
		if (typeof(postData) !== 'object') {
			// Must be sent like
			// { "names": ["example.com", "example1.com"], "soaID": "9999" }
			return cb({status: 'error', message: 'Data envelope must be sent as an object'});
		}
	
		
		var self = this;
		
		self.client.post('dns', 'managed', postData, function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
	}
}
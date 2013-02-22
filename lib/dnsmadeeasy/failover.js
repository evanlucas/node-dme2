/*!
 *	Filename: failover.js
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: Failover module for DNSMadeEasy API V2.0
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
var Failover = exports.Failover = function(client) {
	if (!client) throw new Error('Failover must be constructed with a client');
	
	this.client = client;
};



Failover.prototype = {
	/**
	 * configureFailover
	 *
	 * @param {String} Record ID
	 * @param {Object} Failover config
	 * @param {Function} Callback function(err, data)
	 * @return {Object} Failover response
	 * @api public
	 */
	
	configureFailover: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			foconfig = (typeof(args[args.length - 1]) === 'object') && args.pop(),
			recordid = (typeof(args[args.length - 1]) === 'string') && args.pop(),
			self = this;
		if (!recordid) {
			return cb({status: 'error', message: 'Must pass a valid record ID.'});
		}
		
		if (!foconfig) {
			return cb({status: 'error', message: 'Must pass a valid object for failover configuration.'});
		}
		self.client.put('monitor', recordid, foconfig, function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	}
}
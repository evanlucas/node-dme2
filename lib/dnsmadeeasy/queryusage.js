/*!
 *	Filename: queryusage.js
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: QueryUsage module for DNSMadeEasy API V2.0
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
var QueryUsage = exports.QueryUsage = function(client) {
	if (!client) throw new Error('QueryUsage must be constructed with a client');
	
	this.client = client;
};



QueryUsage.prototype = {
	/**
	 * getAllQueryUsage
	 *
	 * @param {String} Year
	 * @param {String} Month (ex. for January, pass "1")
	 * @param {String} Domain ID 
	 * @param {Function} Callback function(err, data)
	 * @return {Array} All query usage
	 * @api public
	 */
	
	getQueryUsage: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			self = this;
		var domainID, month, year;
		
		if (args.length > 0) {
			// if 3, we are getting for a specific domain id
			if (args.length == 3) {
				domainID = args[2];
				if (typeof domainID !== 'string') return cb({status: 'error', message: 'Domain ID must be a string'});
				month = args[1];
				if (typeof month !== 'string') return cb({status: 'error', message: 'Month must be passed as string.'});
				year = args[0];
				if (typeof year !== 'string') return cb({status: 'error', message: 'Year must be passed as string.'});
				self.client.get('usageApi', 'queriesApi', year, month, 'managed', domainID, function(err, data) {
					if (err) return cb(err);
					cb(null, data);
				});
			} else if (args.length == 2) {
				month = args[1];
				if (typeof month !== 'string') return cb({status: 'error', message: 'Month must be passed as string.'});
				year = args[0];
				if (typeof year !== 'string') return cb({status: 'error', message: 'Year must be passed as string.'});
				self.client.get('usageApi', 'queriesApi', year, month, function(err, data) {
					if (err) return cb(err);
					cb(null, data);
				});
			}
		} else {
			self.client.get('usageApi', 'queriesApi', function(err, data) {
				if (err) return cb(err);
				cb(null, data);
			});
		}
		
		
	}

}
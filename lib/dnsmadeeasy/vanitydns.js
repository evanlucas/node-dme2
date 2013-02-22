/*
 *	Filename: vanity.js
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: Exposes the VanityDNS sub module for dme2-node
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

var VanityDNS = exports.VanityDNS = function(client) {
	if (!client) throw new Error('VanityDNS must be constructed with a client');
	
	this.client = client;
};





VanityDNS.prototype = {
	getVanityDNS: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
		var self = this;
		
		self.client.get('dns', 'vanity', function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	}
}
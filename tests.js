/*
 *	Filename: helper.php
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: A simple test to list all domains and get their information
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

var dnsmadeeasy = require('./lib/dnsmadeeasy');

var args = process.argv.splice(2);


if (args.length < 2) {
	console.log('Please enter your API Key and Secret as the first and seconds args respectively');
	process.exit(1);
}

var apikey = args[0];
var secret = args[1];


var config = {
	apikey: apikey,
	secret: secret,
	debug: false
};

var client = dnsmadeeasy.createClient(config);

var mgdns = new dnsmadeeasy.ManagedDNS(client);
mgdns.getAllDomains(function(err, data){
	if (err) console.log(err);
	var domains = data.data;
	domains.forEach(function(domain) {
		//console.log('Retrieving domain object: '+domain);
		mgdns.getDomain(domain.id, function(err, data){
			if (err) console.log(err);
			console.log(data);
		});
	});
});

// Unfortunately, the sandbox environment appears to be not working.
// So it is a little hard to 'test' without that
// I will update this as soon as I hear back from DNSMadeEasy's tech support
// in regards to the sandbox environment
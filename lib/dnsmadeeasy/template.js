/*
 *	Filename: helper.php
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: Exposes the templates sub module for dme2-node
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

var Template = exports.Template = function(client) {
	if (!client) throw new Error('Template must be constructed with a client');
	
	this.client = client;
};


Template.prototype = {
	getTemplates: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop();
		var self = this;
		self.client.get('dns', 'template', function(err, data) {
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	getRecords: function(domain_id, record_type, cb) {
		if (typeof(domain_id) !== 'string') {
			return cb({status: 'error', message: 'Domain ID must be supplied as a string'});
		}
		var self = this;
		if (typeof(record_type) === 'string') {
			self.client.put('dns', 'template', domain_id+'?type='+record_type, function(err, data) {
		   		if (err) return cb(err);
		   		cb(null, data);
		   	});
		} else {
			self.client.put('dns', 'template', domain_id, 'records', function(err, data) {
		   		if (err) return cb(err);
		   		cb(null, data);
		   	});
		}
	    
	    
	},
	
	createRecordForTemplate: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			postData = (typeof(args[args.length - 1]) === 'object') && args.pop(),
			template_id = (typeof(args[args.length - 1]) === 'string') && args.pop(),
			self = this;
		
		if (!template_id) return cb({status: 'error', message: 'Must specify template ID'});
		if (!postData) return cb({status: 'error', message: 'Must specify data envelope to create new record'});
		
		self.client.put('dns', 'template', template_id, 'records', function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
	},
	
	deleteRecordForTemplate: function() {
		var args = utils.getArgs(arguments),
			cb = (typeof(args[args.length - 1]) === 'function') && args.pop(),
			record_id = (typeof(args[args.length - 1]) === 'string') && args.pop(),
			template_id = (typeof(args[args.length - 1]) === 'string') && args.pop(),
			self = this;
		
		if (!record_id) return cb({status: 'error', message: 'Must specify record ID'});
		if (!template_id) return cb({status: 'error', message: 'Must specify template ID'});
		
		self.client.delete('dns', 'template', template_id, 'records?ids='+record_id, function(err, data){
			if (err) return cb(err);
			cb(null, data);
		});
	}
}
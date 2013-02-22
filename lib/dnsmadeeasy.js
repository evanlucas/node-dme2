/*
 *	Filename: dnsmadeeasy.js
 *	Author: Evan Lucas
 *	Copyright: 2012-2013 5060
 *	Description: Main file to expose different sub modules
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

/*!
 * Exposes the library's submodules
 */
var DNSMadeEasy = exports;

DNSMadeEasy.createClient = require('./dnsmadeeasy/core').createClient;

DNSMadeEasy.Client = require('./dnsmadeeasy/core').Client;
DNSMadeEasy.ManagedDNS = require('./dnsmadeeasy/manageddns').ManagedDNS;
DNSMadeEasy.SecondaryDNS = require('./dnsmadeeasy/secondarydns').SecondaryDNS;
DNSMadeEasy.SOA = require('./dnsmadeeasy/soa').SOA;
DNSMadeEasy.Template = require('./dnsmadeeasy/template').Template;
DNSMadeEasy.VanityDNS = require('./dnsmadeeasy/vanitydns').VanityDNS;
DNSMadeEasy.QueryUsage = require('./dnsmadeeasy/queryusage').QueryUsage;
DNSMadeEasy.IPSet = require('./dnsmadeeasy/ipset').IPSet;
DNSMadeEasy.Folder = require('./dnsmadeeasy/folder').Folder;
DNSMadeEasy.Failover = require('./dnsmadeeasy/failover').Failover;
DNSMadeEasy.AccountACL = require('./dnsmadeeasy/accountacl').AccountACL;
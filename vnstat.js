//
// Serve VnStat with a Node.js
//
// Nicolas Hennion (aka) Nicolargo
//
// GPL v3.0
//

var server = require('./lib/server');
var router = require('./lib/router');
var request = require('./lib/request');

var urllist = {}
urllist["/"] = request.home;
urllist["/css/style.css"] = request.css;
urllist["/hour"] = request.hour;
urllist["/graph-h"] = request.hourgraph;
urllist["/day"] = request.day;
urllist["/graph-d"] = request.daygraph;
urllist["/week"] = request.week;
urllist["/graph-w"] = request.weekgraph;
urllist["/month"] = request.month;
urllist["/graph-m"] = request.monthgraph;
urllist["/graph-s"] = request.sumgraph;
urllist["/graph-t"] = request.topgraph;

//**********
// Main
//**********

server.start(router.route, urllist);

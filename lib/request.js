//
// VnStat in a Node.js
//
// Nicolas Hennion (aka) Nicolargo
//
// GPL v3.0
//

var prg_name = 'VnStat.js'
var prg_version = '0.1';

var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;
var spawn = require('child_process').spawn;

var cmd_vnstat = '/usr/bin/vnstat';
var cmd_vnstati = '/usr/bin/vnstati -c 5';

var htmlheader = '<html>'+
		 '<head>'+
		 '<meta http-equiv="Content-Type" content="text/html; '+
		 'charset=UTF-8" />'+
		 '<link rel="stylesheet" href=\"css/style.css\">'+
		 '</head>'+
		 '<body>'+
		 '<header>'+
		 '<ul><li><a class="button orange" href=\"/\">Home</a></li><li><a class="button gray" href=\"/hour\">Hour</a></li><li><a class="button gray" href=\"/day\">Day</a></li><li><a class="button gray" href=\"/week\">Week</a></li><li><a class="button gray" href=\"/month\">Month</a></li></ul>'+
		 '</header>'+
		 '<div id=\"container\">';
var htmlfooter = '</div> <!-- #container -->'+
		 '</body>'+
		 '<footer>'+prg_name+' version '+prg_version+' is powered by Node.js</footer>'+
		 '</html>';

// Privates functions

function statichtml(res, uri) {
	console.log("Request static file: "+uri);
	var filename = path.join(process.cwd(), uri);
	console.log("File path: "+filename);
	path.exists(filename, function(exists) {
		if (!exists) {
			console.log("Can not read the file " + filepath)
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not found");
			res.end();
			return;
		}

		res.writeHead(200, {'Content-Type': 'text/html'});
		fs.createReadStream(filename, {
			'flags': 'r',
			'encoding': 'binary',
			'mode': 0666,
			'bufferSize': 4 * 1024
		}).addListener("data", function(chunk) {
			res.write(chunk, 'binary');
		}).addListener("close",function() {
			res.end();
		});
	});
}

function vnstat(res, opt) {
	console.log("Request: "+opt);
	var command = cmd_vnstat+' '+opt;
	exec(command, function (error, stdout, stderr) {
		var body = stdout;

		body = 	"<div id=\"graph\"><img class=\"shadow\" src=\"/graph"+opt+"\" /></div>"+
			"<div id=\"text\"><pre>"+body+"</pre></div>";

		var html = htmlheader+body+htmlfooter;

		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(html);
		res.end();
	});
}

function vnstati(res, opt) {
	console.log("Request graph: "+opt);
	var filename = "./vnstat"+opt+'.png';
	var command = cmd_vnstati+' '+opt+' -o '+filename;
	exec(command, function (error, stdout, stderr) {
		res.writeHead(200, {'Content-Type': 'image/png'});
		fs.createReadStream(filename, {
			'flags': 'r',
			'encoding': 'binary',
			'mode': 0666,
			'bufferSize': 4 * 1024
		}).addListener("data", function(chunk) {
			res.write(chunk, 'binary');
		}).addListener("close", function() {
			res.end();
		});
  });
}

// Publics functions

function css(res) {
	statichtml(res, 'css/style.css');
}

function home(res) {
	console.log("Request home page");

  // var vnstatrt = spawn("/usr/bin/vnstat", ["-tr"]);

  // vnstatrt.stdout.on('data', function (data) {
  //  console.log("RT: "+data);
  //  document.getElementById("text").innerHTML = data;
  // });

  var body = "<div id=\"graph\"><img class=\"shadow\" src=\"/graph-s\" /></div>"+
       "<div id=\"graph\"><img class=\"shadow\" src=\"/graph-t\" /></div>"+
       "<div id=\"text\"></div>";

  var html = htmlheader+body+htmlfooter;

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(html);
  res.end();
}

function hour(res) {
	vnstat(res, '-h');
}

function hourgraph(res) {
	vnstati(res, '-h');
}

function day(res) {
	vnstat(res, '-d');
}

function daygraph(res) {
	vnstati(res, '-d');
}

function week(res) {
	vnstat(res, '-w');
}

function weekgraph(res) {
	// The Weekly graph did not exist, display the last days one...
	vnstati(res, '-d');
}

function month(res) {
	vnstat(res, '-m');
}

function monthgraph(res) {
	vnstati(res, '-m');
}

function sumgraph(res) {
	vnstati(res, '-s');
}

function topgraph(res) {
	vnstati(res, '-t');
}

exports.home = home;
exports.css = css;
exports.hour = hour;
exports.hourgraph = hourgraph;
exports.day = day;
exports.daygraph = daygraph;
exports.week = week;
exports.weekgraph = weekgraph;
exports.month = month;
exports.monthgraph = monthgraph;
exports.sumgraph = sumgraph;
exports.topgraph = topgraph;


[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=nicolargo&url=https://github.com/nicolargo/vnstat.js&title=vnstat.js&language=en_GB&tags=github&category=software)

VnStat.js
=========

VnStat.js is a simple Web interface for the VnStat software.
It is a HTTP node based on the Node.js framework.
No Web server is needed, every think is included in the node.

Installation
------------

1) Install the VnStat and VnStati software.

Exemple on Debian Squeeze (using root console):

	$ apt-get install vnstat vnstati
	$ vnstat -u -i eth0 --nick "LAN0"
	$ /etc/init.d/vnstat start

2) Install the Node.js framework following https://github.com/joyent/node/wiki/Installation

3) Download the VnStat.js node

	$ cd ~
	$ git clone git://github.com/nicolargo/vnstat.js.git

Run the VnStat.js node
----------------------

Run the node:

	$ cd ~/vnstat.js
	$ node ./vnstat.js

On the console, the URL of the VnStat.js is displayed.
Use a HTML5 compatible Web browser.

![](http://desmond.yfrog.com/Himg734/scaled.php?tn=0&server=734&filename=vuvn.png&xsize=640&ysize=640)

Informations
------------

By default, the node listen on the TCP port 1337, do not forget to open your firewall if necessary.
You can customized the web design by editing the css/style.css file.

VnStat.js use vnstat and vnstati softwares. You can edit the path using the lib/request.js file:

	var cmd_vnstat = '/usr/bin/vnstat';
	var cmd_vnstati = '/usr/bin/vnstati -c 5';

The end...
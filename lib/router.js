function route(handle, path, res) {
	console.log ("Route to "+path);
	if (typeof handle[path] === 'function') {
		// Execute the function related to the path
		return handle[path](res);
	} else {
		console.log("No function defined for the URL:" + path)	
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("404 Not found");
		res.end();
	}
}

exports.route = route;

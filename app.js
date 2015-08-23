var http=require('http'),
sqlcheck=require('./sqlcheck'),
SQL=require('./sql'),
winston = require('winston');


var sql = new SQL();

var handleRequest = function(req, res) {
		if (req.method == 'POST') {
		var body='';
		req.on('data', function(data) {
			body += data;
		});
		req.on('end', function() {
			var cleanedSQL = sqlcheck(body);
			winston.info("Got sql request:" + body);
			if (!cleanedSQL.valid) {
				res.writeHead(400);
				res.end("Only SELECT, SHOW, COUNT, and DESCRIBE queries supported");
				winston.error("SQL request did not begin with SELECT:" + cleanedSQL.query)
			} else {
				sql.post(cleanedSQL.query).then(
					function(results) {
						res.writeHead(200, {
							response.writeHead(200, {
							  'Content-Length': body.length,
							  'Content-Type': 'application/json',
							  'Access-Control-Allow-Origin': 'http://localhost.com'
						});
						res.end(results);
						winston.info("Got SQL results:" + results);
					},
					function(error) {
						res.writeHead(400),
						res.end(error)
						winston.error("Got SQL error:" + error);
					});
			}
		})
	} else {
		res.writeHead(400);
		res.end("Only post requests supported.");
	};
};

http.createServer(handleRequest).listen(8000);
winston.info("Listening on port 8000");
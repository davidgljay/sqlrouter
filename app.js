var http=require('http'),
sqlcheck=require('./sqlcheck'),
SQL=require('./sql'),
winston = require('winston');
var sql = new SQL();

var handleRequest = function(req, res) {
		console.log("Request method:" + req.method);
		if (req.method == 'POST') {
			var body='';
			req.on('data', function(data) {
				body += data;
			});
			req.on('end', function() {
				var cleanedSQL = sqlcheck(body);
				console.log("Got sql request:" + body);
				if (!cleanedSQL.valid) {
					res.writeHead(500);
					res.end("Only SELECT, SHOW, COUNT, and DESCRIBE queries supported");
					console.log("SQL request did not begin with SELECT:" + cleanedSQL.query)
				} else {
					sql.post(cleanedSQL.query).then(
						function(results) {
							res.writeHead(200, {
								  'Content-Length': new Buffer(results).length,
								  'Content-Type': 'application/json',
								  'Access-Control-Allow-Origin':'*'
							});
							console.log(results.length);
							res.write(results);
							res.end();
						},
						function(error) {
							res.writeHead(500, {
								  'Content-Type': 'text/plain',
								  'Access-Control-Allow-Origin':'*'
							}),
							res.end('{"error":"'+JSON.stringify(error)+'"}');
							console.log("Got SQL error:" + error);
						});
				}
		})
	} else if (req.method == 'OPTIONS') {
      console.log('!OPTIONS');
      var headers = {
      };
      // IE8 does not allow domains to be specified, just the *
      // headers["Access-Control-Allow-Origin"] = req.headers.origin;
      headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
      headers["Access-Control-Allow-Credentials"] = false;
      headers["Access-Control-Max-Age"] = '86400'; // 24 hours
      headers["Access-Control-Allow-Origin"] = '*';
      headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
      res.writeHead(200, headers);
      res.end();
	} else {
		console.log("Request method error");
		res.writeHead(500,{
						  'Content-Type': 'text/plain',
						  'Access-Control-Allow-Origin':'*'
						});
		res.end('{"error": "Only post requests supported."}');
	};
};

http.createServer(handleRequest).listen(8000);
winston.info("Listening on port 8000");
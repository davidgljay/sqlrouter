var http=require('http'),
sqlcheck=require('./sqlcheck'),
SQL=require('./sql');

var sql = new SQL()

var handleRequest = function(req, res) {
		if (req.method == 'POST') {
		var body='';
		req.on('data', function(data) {
			body += data;
		});
		req.on('end', function() {
			var cleanedSQL = sqlcheck(body);
			if (!cleanedSQL.valid) {
				res.writeHead(400);
				res.end("Only SELECT queries supported");
			} else {
				sql.post(cleanedSQL).then(
					function(results) {
						res.writeHead(200);
						res.end(results);
					},
					function(error) {
						res.writeHead(400),
						res.end(error)
					});
			}
		})
	} else {
		res.writeHead(400);
		res.end("Only post requests supported.");
	};
};

http.createServer(handleRequest).listen(8000);
var Deferred = require("promised-io/promise").Deferred,
winston = require('winston'),
mysql = require("mysql");

var SQL = function() {
  var self = this;
  var connectionVars = {
      host     : process.env.SQL_HOST,
      port     : process.env.SQL_PORT,
      user     : process.env.SQL_USER,
      password : process.env.SQL_PWD,
      database : process.env.SQL_DB,
      ssl      : "Amazon RDS"
    };

  self.connection = mysql.createConnection(connectionVars);

  self.connection.connect(function(err) {
    if (err) {
      winston.error('error connecting: ' + err.stack);
      return;
    }
   
    winston.info('SQL connected as id ' + self.connection.threadId);
  });
};

SQL.prototype.post = function(query) {
  var self = this;
  var deferred = new Deferred();
  self.connection.query(query, function(err, rows, fields) {
    if (err) {
      deferred.reject("Error in SQL query: " + err);
    } else {
      var body = {
        rows:rows
      }
      deferred.resolve(JSON.stringify(body));
    }
  });

  return deferred.promise;   
}

module.exports = SQL;
var sqlcheck = function(query) {
	//Check to make sure that this is a select query.
	var firstterm = query.toUpperCase().split(' ')[0];
	if (firstterm != 'SELECT' && firstterm != 'SHOW' && firstterm != 'DESCRIBE' ) {
		return {valid:false, query:query};
	}
	return {
		valid:true,
		query:query.replace(";","").replace("--","")
	};
}

module.exports=sqlcheck;
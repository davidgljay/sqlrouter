var sqlcheck = function(query) {
	//Check to make sure that this is a select query.
	if (query.toUpperCase().split(' ')[0] != 'SELECT') {
		return {valid:false, query:query};
	}
	return {
		valid:true,
		query:query.replace(";","").replace("--","")
	};
}

module.exports=sqlcheck;
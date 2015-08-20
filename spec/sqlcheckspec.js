//Spec for SQL check
var sqlcheck = require('../sqlcheck.js');

describe("Sql check", function() {
	it("should accept if the first word in the query is SELECT", function() {
		var query = "SELECT * FROM DATABASE";
		expect(sqlcheck(query).valid).toBe(true);
		expect(sqlcheck(query).query).toBe(query);

	});

	it("should accept if the first word in the query is SHOW", function() {
		var query = "SHOW TABLES";
		expect(sqlcheck(query).valid).toBe(true);
		expect(sqlcheck(query).query).toBe(query);
	});

	it("should accept if the first word in the query is DESCRIBE", function() {
		var query = "DESCRIBE THINGS";
		expect(sqlcheck(query).valid).toBe(true);
		expect(sqlcheck(query).query).toBe(query);
	});

	it("should reject if the first word in the query is not SELECT", function() {
		var query = "INSERT * INTO DATABASE";
		expect(sqlcheck(query).valid).toBe(false);
		expect(sqlcheck(query).query).toBe(query);
	});

	it("should sanitize the inputs", function() {
		var query = "SELECT * FROM Robert'); DROP TABLE Students;--"
		expect(sqlcheck(query).valid).toBe(true);
		expect(sqlcheck(query).query).toNotBe(query);
	})
})
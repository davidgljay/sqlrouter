//Spec for SQL check
var sqlcheck = require('../sqlcheck.js');

describe("Sql check", function() {
	it("should accept if the first word in the query is SELECT", function() {
		var query = "SELECT * FROM DATABASE";
		expect(sqlcheck(query).valid).toBeTruthy;
		expect(sqlcheck(query).query).toBe(query);
	});

	it("should reject if the first word in the query is not SELECT", function() {
		var query = "INSERT * INTO DATABASE";
		expect(sqlcheck(query).valid).toBeFalsy;
		expect(sqlcheck(query).query).toBe(query);
	});

	it("should sanitize the inputs", function() {
		var query = "SELECT * FROM Robert'); DROP TABLE Students;--"
		expect(sqlcheck(query).valid).toBeTruthy;
		expect(sqlcheck(query).query).toNotBe(query);
	})
})
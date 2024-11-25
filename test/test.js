const sqlite = require('../sqlite');

async function test_func() {
	await sqlite.init();
	sqlite.connect('test/test.db');
// sqlite.debug = true;

	let res = sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);");

	sqlite.insert("COMPANYS", {NAME: "TESTE"}, function (res) {

	});

	sqlite.run("BEGIN; DELETE FROM COMPANYS WHERE ID = 6; ROLLBACK;");

	sqlite.run('SELECT * FROM COMPANYS', function (res) {
		if (res.error)
			throw (res.error)
		console.log(res)
	});

// poormans testing
	let testVal1 = "It ain't there";
	let testVal2 = "It's there";
	sqlite.insert("COMPANYS", {NAME: testVal1});

	let test = false;
	sqlite.run("SELECT * FROM COMPANYS WHERE NAME = ?", [testVal1], function (res) {
		if (res.length > 0)
			test = true;
	});
	if (!test)
		console.log('Test1 fail:', testVal1);
	else
		console.log('Test1 success:', testVal2);

	let updated = sqlite.update('COMPANYS', {NAME: testVal2}, {NAME: testVal1});
	if (updated != 0)
		console.log('Test2 fail:', updated + ' updated rows != 1');
	else
		console.log('Test2 success:', updated + ' updated rows = 1');

	let deleted = sqlite.delete("COMPANYS", {NAME: testVal2});
	if (deleted != 0)
		console.log('Test3 fail:', deleted + ' deleted rows != 1');
	else
		console.log('Test3 success:', deleted + ' deleted rows = 1');

	test = false;
	sqlite.run("SELECT * FROM COMPANYS WHERE SUBSTR(NAME,0,2) = 'It'", function (res) {
		if (res.length == 0)
			test = true;
	});
	if (!test)
		console.log('Test4 fail:', testVal2);
	else
		console.log('Test4 success:', testVal1);


	sqlite.close();
}
test_func();

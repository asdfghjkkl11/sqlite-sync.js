# sqlite-sync.js

[![NPM](https://nodei.co/npm/@asdfghjkkl11/sqlite-sync.png?downloads=true&downloadRank=true)](https://nodei.co/npm/@asdfghjkkl11/sqlite-sync/)

this repository forked from https://github.com/jayralencar/sqlite-sync.js

Node module to sqlite sync and async</br>


node.js package for database connection with <strong> SQLite </strong>, and execute SQL commands synchronously or asynchronously.

# Install
```shell
-origin
npm i @asdfghjkkl11/sqlite-sync 
-alias
npm i sqlite-sync@npm:@asdfghjkkl11/sqlite-sync 
```

# Usage
```js
const sqlite = require('@asdfghjkkl11/sqlite-sync'); //requiring
const sqlite = require('sqlite-sync'); //alias

//Initiating
await sqlite.init();

//Connecting - if the file does not exist it will be created
sqlite.connect('test/test.db'); 

//Creating table - you can run any command
sqlite.run("CREATE TABLE COMPANYS(ID  INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT NOT NULL);",function(res){
	if(res.error)
		throw res.error;
	console.log(res);
});

//Inserting - this function can be sync to, look the wiki
sqlite.insert("COMPANYS",{NAME:"My COMPANY"}, function(res){
	if(res.error)
		throw res.error;
	console.log(res);
});

//Updating - returns the number of rows modified - can be async too
let rows_modified = sqlite.update("COMPANYS",{NAME:"TESTING UPDATE"},{ID:1});

//Create your function
function test(a,b){
	return a+b;
}

//Add your function to connection
sqlite.create_function(test);

// Use your function in the SQL
console.log(sqlite.run("SELECT ID, test(NAME, ' Inc') as NAME FROM COMPANYS"));

// Closing connection 
sqlite.close();

```

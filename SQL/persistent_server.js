var mysql = require('mysql');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chatterBoxxx"
});

dbConnection.connect();

var submitMessage = function(message, username, roomname){
  var date = new Date();
  dbConnection.query("insert into messages (message, userID, roomnameID) values (\'" + message + "\', \'" + username + "\', \'" +roomname + "\')", function(error, result){
    if (error) console.log(error);
    console.log('this message has been sent:', message);
  });
};

submitMessage('hello this is a test', '1', 1);

/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

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

var submitMessage = exports.submitMessage = function(message, username, roomname){
  var date = new Date();
  checkUsernameAndRoomname(username, roomname, function(userID, roomID){
    dbConnection.query("insert into messages (message, userID, roomnameID) values (\'" + message + "\', \'" + userID + "\', \'" +roomID + "\')", function(error, result){
      if (error) console.log(error);
      console.log('this message has been sent:', message);
    });
  });
};


var checkUsernameAndRoomname = function(username, roomname, cb){
  grabUsername(username, function(nameID){
    if(nameID){
      getRoomname(nameID, roomname, function(nameID, roomID){
        cb(nameID, roomID);
      });
    }else{
       setUsername(username, roomname, function(nameID, roomname){
         getRoomname(nameID, roomname, function(nameID, roomID){
           cb(nameID, roomID);
         });}
      );
    }
  });
};

var grabUsername =  function(username, cb){
  dbConnection.query("select id from usernames where username = \'"+ username +"\'", function(error, result){
    if (error) console.log('error in usernameHelper');
    if (result[0]){
      cb(result[0]['id']);
    } else {
      cb(false);
    }
  });
};

var getRoomname = function(userID, roomname, cb){
  dbConnection.query("select id from roomnames where roomname = \'"+ roomname +"\'", function(error, result){
    if (error) console.log('error in roomnameHelper');
    if (result[0]){
      cb(userID, result[0]['id']);
    } else {
      setRoomname(userID, roomname, function(userID, roomID) {cb(userID, roomID);});
    }
  });

  //get the roomnameID from the server
    //if there is a roomnameID, pass it into the final callback of submit message
    //else
    //call into another function that will set room
};

var setRoomname = function(userID, roomname, cb){
  dbConnection.query('INSERT INTO roomnames SET ?', {roomname: roomname}, function(error, result){
      if (error) console.log(error);
      console.log('roomname has been set', result);
      cb(userID, result.insertId);
  });
};

var setUsername = function(username, roomname, cb){
  dbConnection.query('INSERT INTO usernames SET ?', {username: username}, function(error, result){
      if (error) console.log(error);
      console.log('usernames have been set', result);
      cb(result.insertId, roomname);
  });
};

submitMessage("we are really the kings", "felix", "hackreaktor");
  //check if input username has an ID
    //if has an ID, return ID to submit message
    //else
      //create a new row in userID table, and return new ID
//roomname helper
  //check if input roomname has an ID
    //if has an ID, return ID to submit message
    //else
      //create a new row in roomname table, and return new ID




/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

/* You already know how to create an http server from the previous
 * assignment; you can re-use most of that code here. */

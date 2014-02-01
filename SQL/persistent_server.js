var mysql = require('mysql');
var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chatterBoxxx"
});

dbConnection.connect();

//get request













//post request
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
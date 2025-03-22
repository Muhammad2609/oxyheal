var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'oxyhealdb.cjhnuxaepwr5.eu-west-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'Oxyheal123',
  database : 'oxyhealdb'
});
 

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
  

module.exports = connection
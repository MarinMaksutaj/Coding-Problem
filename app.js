// the main node.js file
// import the mysql connection
var mysql = require('mysql');
// import the express module
var express = require('express');
// cors middle ware to fix cross origin issue
const cors = require('cors'); 

// import the body-parser module
var bodyParser = require('body-parser');

// connect to the database
// Note: this is a local database I have created. The schema used is also attached in the email.
var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 23306,
    user: 'root',
    password: 'root',
    database: 'test_db'
});

// create the express app
var app = express();
app.use(cors());

// use the body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// fetch all the records from the database
app.get('/plants', function(req, res) {
    connection.query('SELECT * FROM plants', function(err, rows, fields) {
        if (err) throw err;
        res.send(rows);
    });
} );


// start the server and listen on port 3000
app.listen(3000, function() {
    console.log('Server started on port 3000');
}
);




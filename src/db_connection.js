const mysql = require('mysql');

const con = mysql.createConnection({
    user: 'root',
    password: '',
    host: ',
    port: 3306,
    database: 'db_posts'
});

module.exports = con;

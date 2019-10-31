const mysql = require('mysql');

const con = mysql.createConnection({
    user: 'root',
    password: 'dbGodinner2019',
    host: 'db-godinner.cpmvqfvc7pth.sa-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'db_posts'
});

module.exports = con;

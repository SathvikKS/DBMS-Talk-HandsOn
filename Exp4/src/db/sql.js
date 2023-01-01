const mysql = require('mysql');

const connection = mysql.createConnection({
    user: process.env.dbUser,
    password: process.env.dbPassword,
    host: process.env.dbHost,
    database: process.env.dbName,
    port: process.env.dbPort,
    multipleStatements: true
})

connection.connect((err) => {
    if (err) {
        console.log('Connection to DB Failed')
        throw err
    } else {
        console.log('Connection to DB Successful')
    }
})

module.exports = {connection, mysql}
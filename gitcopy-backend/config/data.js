const mysql = require('mysql2')

// Create database
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'userrecords',
    port: 3306
})


db.connect((err)=>{
    if(err) {
        return console.log(err)
    }
    console.log("DB connection is successfull!")
})

module.exports = db;
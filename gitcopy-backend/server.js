const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const db = require('./config/data')

const app = express();

app.use(bodyparser.json())
app.use(cors())

// READ full data
app.get('/user', (req, res)=>{
    let qr = 'SELECT * FROM users2';
    db.query(qr, (err, results)=>{
        if(err){
            return console.log(err)
        }
        if(results.length>0) {
            res.send({
                message: 'All Users',
                data: results
            })
        } else {
            res.send('No user found!')
        }
    })
    
})

// READ Single data
app.get('/user/:id', (req, res)=>{
    let qrId = req.params.id
    let qr = `SELECT * FROM users2 WHERE id = '${qrId}'`;
    db.query(qr, (err, results)=>{
        if(err){
            return console.log(err)
        }
        if(results.length>0) {
            res.send({
                message: 'Selected user!',
                data: results
            })
        } else {
            res.send('No user found!')
        }
    })
    
})

// create user (POST)
app.post('/user', (req, res)=>{
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let age = req.body.age;
    let gender = req.body.gender;
    let email = req.body.email;
    let phone = req.body.phone;

    let qr = `INSERT INTO users2 (firstname, lastname, age, gender, email, phone) values 
    ('${firstName}','${lastName}', '${age}', '${gender}', '${email}', '${phone}')`

    db.query(qr, (err,results)=>{
        if (err){
            return console.log(err)
        }
        res.send({
            message: 'Data posted successfully!'
        })
    })
})

// update
app.put('/user/:id', (req, res)=>{
    let qrId = req.params.id;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let age = req.body.age;
    let gender = req.body.gender;
    let email = req.body.email;
    let phone = req.body.phone;

    let qr = `UPDATE users2 SET firstname='${firstName}', lastname='${lastName}',
    age='${age}',gender='${gender}', email= '${email}', phone='${phone}' WHERE id=${qrId}`

    db.query(qr, (err,results)=>{
        if (err){
            return console.log(err)
        }
        res.send({
            message: 'Data updated successfully!'
        })
    })
})

// delete
app.delete('/user/:id', (req, res)=>{
    let qrId = req.params.id;
    let qr = `DELETE from users2 WHERE id = ${qrId}`
    db.query(qr, (err, results)=>{
        if(err){
            return console.log(err)
        }
        if(results.affectedRows>0){
            res.send({
                message: 'Data deleted!'
            })
        } else {
            res.send({
                message:'User not found'
            })
        }
        
    })

})

app.post('/login', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const token = jwt.sign({email}, 'secretkey')
    res.json({token})
})

// // Ascending and descending
// app.get('/user', (req, res)=>{

//     let qr = `SELECT * FROM users2 SORT BY age DESC`
//     db.query(qr, (err, results)=>{
//         if(err){
//             return console.log(err)
//         }
//         if(results.length>0) {
//             res.send({
//                 message: 'All Users',
//                 data: results
//             })
//         } else {
//             res.send('No user found!')
//         }
//     })
// })

// Male - female
// app.get('/user?gender=female', (req, res)=>{
//     let qr = `SELECT * FROM users2 WHERE gender=female`
//     db.query(qr, (err, results)=>{
//         if(err){
//             return console.log(err)
//         }
//         if(results.length>0) {
//             res.send({
//                 message: 'All Users',
//                 data: results
//             })
//         } else {
//             res.send('No user found!')
//         }
//     })
// })



app.listen(3000, (err)=>{
    if(err) {
        return console.log(err)
    }
    console.log('Server is open at port 3000')
})
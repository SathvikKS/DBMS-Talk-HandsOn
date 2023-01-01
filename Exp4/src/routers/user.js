const express = require('express');
const bcrypt = require('bcrypt');
const {connection, mysql} = require('../db/sql')

const router = new express.Router()

router.post('/api/userLogin', (req, res) => {
    const userEmail = req.body.email
    const userPassword = req.body.password
    console.log(req.body)
    connection.query(`select * from users_demo where email = "${userEmail}"`, async (err, results, field) => {
        if (err) {
            res.status(500).send({
                "message": "Server error"
            })
            console.log(err)
        } else {
            if (results.length == 0) {
                return res.status(401).send({
                    "message": "The entered credentials do not match"
                })
            }
            const match = await bcrypt.compare(userPassword, results[0].password)
            if (match) {
                req.session.userName = results[0].name
                res.status(200).send()
            } else {
                res.status(401).send({
                    "message": "The entered credentials do not match"
                })
            }
        }
    })    
})

router.post('/api/userSignup', async (req, res) => {
    const userName = req.body.name
    const userEmail = req.body.email
    const userPassword = req.body.password
    const encryptedPassword = await bcrypt.hash(userPassword, 8)
    connection.query(`insert into users_demo(email, name, password) values ("${userEmail}", "${userName}", "${encryptedPassword}")`, (err, results, field) => {
        if (err) {
            console.log(err)
            if (err.errno === 1062) {
                return res.status(406).send({
                    "message": "The entered email is already registered"
                })
            }
            res.status(500).send({
                "message": "Server error"
            })
        } else {
            res.status(200).send()
        }
    })
    console.log(req.body)
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.render('index.hbs')
})

module.exports = router
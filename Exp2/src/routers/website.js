const express = require('express');

const router = new express.Router()

router.get('', (req, res) => {
    res.render('index.hbs')
})

router.get('/login', (req, res) => {
    res.render('login.hbs')
})

router.get('/signup', (req, res) => {
    res.render('signup.hbs')
})

router.get('/welcome', (req, res) => {
    res.render('welcome.hbs', {
        "user": "demo user"
    })
})

module.exports = router
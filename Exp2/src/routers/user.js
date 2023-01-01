const express = require('express');

const router = new express.Router()

router.post('/api/userLogin', (req, res) => {
    console.log(req.body)
    res.render('welcome.hbs', {
        "user": req.body.uname
    })
})

router.post('/api/userSignup', (req, res) => {
    console.log(req.body)
    res.render('index.hbs')
})

module.exports = router
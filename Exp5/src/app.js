const express = require('express');
const hbs = require('hbs');
const path = require('path');


const app = express()
const viewsPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index.hbs')
})

app.listen(3000, ()=> {
    console.log('Exp5 server is running')
})
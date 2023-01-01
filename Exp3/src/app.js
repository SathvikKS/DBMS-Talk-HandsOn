const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const path = require('path');

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const siteRouter = require('./routers/website')
const userRouter = require('./routers/user')

app.use(siteRouter)
app.use(userRouter)
app.get('*', (req, res) => {
    res.status(404).send({
        "error": "Requested resource was not found"
    })
})
app.listen(3000, () => {
    console.log('Exp3 Server is running')
})
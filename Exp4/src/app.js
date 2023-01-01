const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
var MySQLStore = require('express-mysql-session')(session);

require('./db/sql')
var options = {
	user: process.env.dbUser,
    password: process.env.dbPassword,
    host: process.env.dbHost,
    database: process.env.dbName,
    port: process.env.dbPort,
};
var sessionStore = new MySQLStore(options);

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
	secret: process.env.sessionSecret,
	resave: true,
	saveUninitialized: true,
    store: sessionStore,
}));
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
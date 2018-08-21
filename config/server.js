const parser = require('body-parser');
const consign = require('consign');
const handlebars = require('express-handlebars')
const express = require('express');
const validator = require('express-validator');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const multiParty = require('connect-multiparty')

const domain = 'azcrew.ddns.net'

const app = express();

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: './app/views/layout'
}));
app.set('views', './app/views')
app.set('view engine', 'handlebars')

app.use(express.static('./app/public'));
app.use(express.static('./app/lib'));
app.use(helmet());
app.use(multiParty());
app.use(parser.urlencoded({ 'extended': true }));
app.use(session({
    cookie: {
        domain: domain,
        httpOnly: true,
        path: '/login',
        secure: true
    },
    resave: false,
    saveUninitialized: false,
    secret: 'ahsla',
    store: new MongoStore({
        url: 'mongodb://azcrew.ddns.net/messenger',
        ttl: 24 * 24 * 60 * 60
    })

}));
app.use(validator())

consign()
    .include('./app/controllers')
    .then('./app/routes')
    .into(app)

module.exports = app;
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
const app = express();
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const log = `${new Date().toString()}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('err: ', err);
    });
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname +'/public'));

app.get('/', (req, res) => {
   // res.send('<h1>Hello Express!</h1>');
//    res.send({
//        name: 'div',
//        hobby: 'biking'
//    });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        year: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
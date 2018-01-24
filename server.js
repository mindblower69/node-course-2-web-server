const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {// next() will signal that the middleware function is done
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

//app.use((req, res, next) => {
 //res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));//__dirname : stores the path to the project directory (root of project)

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
 //res.send('<h1>Hello Express!</h1>');//This will be injected in the body of an html page the user will see
 res.render('home.hbs', {
   pageTitle: 'Home Page',
   welcomeMessage: 'Welcome to the site! This is dynamic content!'
 });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fullfil this request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});//Pretty standard port for devs on local machine // Will keep listening until manually stopped

//Need documentation in writting for server stuff

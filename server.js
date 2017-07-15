const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



hbs.registerHelper('getCurrentYear', () => {
  
  return new Date().getFullYear()
  
});

app.use((req, res, next) => {
  
  var now = new Date().toString();
  
  var log = `${now}: ${req.method} ${req.url}`;
  
  fs.appendFile('server.log', log + '\n', (err) => {
    
    if (err) {
      
      console.log('Unable to append to server.log');
      
    }
    
  });
  
  console.log(log);
  
  next();
  
});

// app.use((req, res, next) => {
  
//   res.render('maintenance.hbs', {
    
//     pageTitle: 'Maintenance In Progress',
//     maintenanceMessage: 'We will be back soon'
    
//   });
  
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
  
  return text.toUpperCase();
  
});

app.get('/', (req, res) => {
  
  res.render('home.hbs', {
  
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the homepage',
    currentYear: new Date().getFullYear()
  
  });
  
});

app.get('/about', (req, res) => {
  
  res.render('about.hbs', {
    
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
    
  });
  
});

// Create route /bad

// Send back json with error message property

app.get('/bad', (req, res) => {
  
  res.send({
    
    errorMessage: 'Error Message Here'
    
  });
  
});

app.listen(port, () => {
  
  console.log(`Server is running on port ${port}`);
  
});
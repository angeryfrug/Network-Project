//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Legend = require('./models/legends.js');
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form



//___________________
// Routes
//___________________
//localhost:3000

app.listen(PORT, () => console.log( 'Listening on port:', PORT));

  // INDEX
  app.get('/', (req, res) => {
    Legend.find({}, (error, allLegends) =>{
      res.render('index.ejs', {
        legends: allLegends})
    })
  })

  // SHOW
  app.get('/Legend/:id', (req, res)=>{
    Legend.findById(req.params.id, (error, foundLegend)=>{
      res.render('show.ejs', {
        legends: foundLegend})
    })
  })

  // NEW
  app.get('/newlegend', (req, res) => {
    res.render('new.ejs')
  })

  app.post('/newlegend', (req, res)=>{
    Legend.create(req.body, (error, createdLegend)=>{
      res.redirect('/');
    });
  });

  // EDIT
  app.get('/Legend/:id/edit', (req, res)=>{
    Legend.findById(req.params.id, (error, foundLegend)=>{
      res.render('edit.ejs', {
        legends: foundLegend})
    })
  })


  // UPDATE
  app.put('/Legend/:id/edit', (req, res)=>{
    Legend.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, foundLegend)=>{
      res.redirect('/legend/' + req.params.id)
    });
  });

  // DELETE
  app.delete('/Legend/:id', (req, res)=>{
    Legend.findByIdAndRemove(req.params.id, (error, foundLegend)=>{
      res.redirect('/')
    })
  })


//___________________
//Listener
//___________________
//Error Checks

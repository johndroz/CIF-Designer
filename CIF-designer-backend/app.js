const fs = require('fs');
const multer  = require('multer');
const upload = multer({
  limits: {
    fieldSize: 50000000000,
  }
});
const mongoose = require('mongoose');
const User = require('./models/user');
const Design = require('./models/design');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');
const { type } = require('os');
require('dotenv').config();

// express app
var app = express();

// Configure session middleware
app.use(session({ secret: process.env.APP_SECRET, resave: false, saveUninitialized: false, cookie: {maxAge : 90000} }));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true, limit: '75mb' }));

// connect to database
const dbUri = process.env.APP_DB_URI;
mongoose.connect(dbUri)
  .then((result)=>console.log('connected to db.'))
  .catch((err)=>console.log(err));

// get all users & designs from DB
var users = [];
var designs = [];

// USERS MODEL
User.find()
.then(result=>{
  users = result;
})
.catch((err)=>{
  console.log(err);
})

// DESIGNS MODEL
Design.find()
.then(result=>{
  designs = result;
})
.catch((err)=>{
  console.log(err);
})

// Passport local strategy for username and password
const strategy = new LocalStrategy((username, password, done) => {
  let user = users.find(u => u['username'] == username);

  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }

  if (user['password'] !== password) {
    return done(null, false, { message: 'Incorrect password.' });
  }

  return done(null, user);
})
passport.use(strategy);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = users.find(u => u.id === id);
  done(null, user);
});



// ROUTES
app.post('/login', (req, res) =>{
  var data;
  
  if(req.isAuthenticated()){
    data = {
      url: '/account?username=' + req.user.username,
      validated: true,
      username: req.user.username,
    }
  } else {
    data = {
      validated: false
    }
  }

  res.json(data);
})

// Passport login route
app.post('/users',
passport.authenticate('local', {failureRedirect: '/fail', failureMessage: true, passReqToCallback: true}),
(req, res)=>{
  let data = {
    validated: true,
    username: req.user.username,
    message: 'Successfully Logged in',
    url: '/account?username=' + req.user.username
  }
  res.json(data);
});

app.get('/fail', (req, res)=>{
  let data = {
    validated: false,
    username: 'No User',
    message: 'Unable to Log in'
  }
  res.json(data);
})

app.post('/account', (req, res)=>{
    // get current designs
    Design.find()
    .then(result=>{
      designs = result;
      let desAll = designs.filter(d=>d.username == req.user.username);
      if(desAll == undefined){
        desAll = [];
      }
      // GET THE USER'S DESIGNS
      // THIS WILL COME FROM DATABASE BY SEARCHING FOR DESIGNS BY SPECIFIC USER
      let data = {
        validated: true, 
        designs: desAll,
      }

      res.json(data);

      /*let stringData = JSON.stringify(data);
      fs.writeFile("data.txt", stringData, (err)=>{
        if(err) {
          throw err;
        } else {
          console.log('file updated.');
        }
        
      });
      res.setHeader('Content-Type', 'application/octet-stream');
      const stream = fs.createReadStream('./data.txt');

      // Listen for the 'data' event, which is emitted when data is read.
      stream.on('data', chunk => {
        // Send each chunk to the client as it's read.
        res.write(chunk);
      });

      // Listen for the 'end' event, which is emitted when the entire file has been read.
      stream.on('end', () => {
        // End the response when all data has been sent.
        res.end();
      });

      // Optionally, handle any errors that may occur during the streaming process.
      stream.on('error', err => {
        console.error('Stream error:', err);
        res.statusCode = 500; // Set an appropriate error status code.
        res.end('Internal Server Error');
      });*/
    })
    .catch((err)=>{
      console.log(err);
    })
    
    //res.json(data);
    //res.send(JSON.stringify(data));
});

app.post('/signup',
(req, res)=>{
  let data;
  let user = users.find({username: req.body.username});
  if(!user){
    //CREATE AND SAVE THE USER IF THEY DONT ALREADY EXIST
    user = new User({
      username: req.body.username,
      password: req.body.password
    });
    user.save()
    .then(result=>{
      data = {
        url: '/login',
        userCreated: true,
      }
      User.find()
        .then(result=>{
          users = result;
          res.json(data)
        })
        .catch((err)=>{
          console.log(err);
        })
    })
    .catch(err=>{
      console.log(err);
    })
  } else {
    data = {
      userCreated: false,
      message: 'Username already exists'
    }
    res.json(data);
  }
});

app.post('/logout', (req, res, next)=>{
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

app.post('/save', upload.any(), (req, res)=>{
  let data;

  if(req.isAuthenticated()){
    const newgraphics = req.body;

    let design = new Design({
      username: req.user.username,
      front: newgraphics.front,
      back: newgraphics.back
    })

    design.save()
    .then(result=>{
      data = {
        url: '/account?username=' + req.user.username,
        validated: true
      }
      return result
    })
    .then(saved=>{
      Design.find()
      .then(result=>{
        designs = result;
        req.session.save();
        res.json(data);
      })
      .catch((err)=>{
        console.log(err);
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }else{
    data = {
      validated: false
    }
    res.json(data);
  }
  

})

app.post('/delete', (req, res)=>{

  if(req.isAuthenticated()){
    var id = req.body.id;
    Design.deleteOne({_id: id})
    .then(result=>{
      req.session.save();
      res.send('Design ' + id + ' has been deleted');
    })
    .catch((err)=>console.log(err));
    
  }


  
})




















// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err);
});

module.exports = app;

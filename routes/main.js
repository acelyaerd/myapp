module.exports = function(app)

{
const { check, validationResult } = require('express-validator');
const redirectLogin = (req, res, next) => {
                                                                                                                     
   if (!req.session.userId ) {
     res.redirect('./login')
   } else { next (); }
 }

     app.get('/',function(req,res){
        res.render('index.html')
     });
     app.get('/about',function(req,res){
        res.render('about.html');
    });

    app.get('/search', redirectLogin, function(req,res){

       res.render("search.html");
       });

    // app.get('/search-result', function (req, res) {
         //searching in the database
        // res.send('This is the keyword you  entered: '+ req.query.keyword+ ' This is the result of the search:' );
     app.post('/search-result', function(req, res) {
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('recipebankdb');
      db.collection('recipes').find({name: req.body.keyword}).toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
      client.close();
  res.render('search-result.ejs', {availablerecipes:results}); 
  });
});
});
        
   
    
   app.get('/register', function (req,res) {
         res.render('register.html');                                                                   
      });                                                                                                 

        app.get('/list', redirectLogin, function(req, res) {
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('recipebankdb');                                                                     
      db.collection('recipes').find().toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
         res.render('list.ejs', {availablerecipes:results});
      client.close();                                                                                              
  });
});
});

        app.get('/addrecipe', redirectLogin, function(req,res){
                res.render('addrecipe.html');
        });
///
        app.get('/deleterecipe', redirectLogin, function(req,res){
                res.render('deleterecipe.html');
        });
///
        app.get('/updaterecipe', redirectLogin, function(req,res){
                res.render('updaterecipe.html');
        });
///
        app.get('/editrecipe', redirectLogin, function(req,res){
                res.render('editrecipe.html');
        });



        app.post('/registered',[check('email').isEmail()] , function (req,res) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const plainPassword = req.sanitize(req.body.password);
        const username = req.sanitize(req.body.username);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.redirect('./register'); }
       else {
        bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
        // Store hashed password in your database.
        // saving data in database
                                                                                              
       var MongoClient = require('mongodb').MongoClient;                                                          var url = 'mongodb://localhost'; 
        MongoClient.connect(url, function(err, client) {                                                           if (err) throw err;                                                  
        var db = client.db ('recipebankdb');
                                                                                                       
        db.collection('users').insertOne({
                                                                                                        
        username: req.body.username,                                                                  
        password: hashedPassword,                                                                      
        email: req.body.email                                                                        
        });
                                                                                                          
        client.close();                                                                                             
        res.send('You are now registered, Your user name is: '+ req.body.username +' your email is: ' + req.body.email + ' your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword+'<a href='+'./'+'>Home</a>');
        });
       });
}
});

      app.post('/recipeadded', function (req,res) {
       // saving data in database
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost';
       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('recipebankdb');
        db.collection('recipes').insertOne({
        name: req.body.name,
        instructions: req.body.instructions,
        user: req.session.userId 
        });
        client.close();
        res.send(' This recipe has been added to the database, by: ' + req.body.name + ' with the instructions as follows:' + req.body.instructions +'<a href='+'./'+'>Home</a>' );        });     
        });

///////

      app.post('/recipedeleted', function (req,res) {
       // saving data in database
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost';
       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('recipebankdb');
        db.collection('recipes').deleteOne({
        name: req.body.name,
        });
        client.close();
        res.send(' This recipe is deleted from the database, name: '+ req.body.name +'<a href='+'./'+'>Home</a>' );        });
        });

///////

      app.post('/recipeupdated', function (req,res) {
       // saving data in database
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost';
       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('recipebankdb');
        db.collection('recipes').updateOne({
        name : req.body.prevname},
        {$set: {name: req.body.name,
        instructions: req.body.instructions}
        });
        client.close();
        res.send(' Recipe Updated to '+ req.body.name +'<a href='+'./'+'>Home</a>' );        });
        });


///////

      app.post('/recipeedited', function (req,res) {
       // saving data in database
       var MongoClient = require('mongodb').MongoClient;
       var url = 'mongodb://localhost';
       MongoClient.connect(url, function(err, client) {
        if (err) throw err;
        var db = client.db ('recipebankdb');
        db.collection('recipes').findOne({name:
        req.body.name}, function(err,result){
        if(err) throw err;
        else{ res.render('updaterecipe.html', {recipes:result});
        }; 
        client.close();
        });
        });
        });
  
//*****************login*******************

     app.get('/login', function (req,res) {
           res.render('login.html');
     });
                                                                                        

      app.post('/loggedin', function (req, res) {
            var MongoClient = require('mongodb').MongoClient;
            var url = 'mongodb://localhost';
            MongoClient.connect(url, function (err, client) {
                if (err) throw err;
                var db = client.db('recipebankdb');
                const bcrypt = require('bcrypt');
                const plainPassword = req.body.password;
                let users = db.collection('users');
                users.findOne({username: req.body.username}, function (err, result) {
                    if (err) throw err;
                    if (result) {
                        var hashedPassword = result.password;
                        bcrypt.compare(plainPassword, hashedPassword, function (err, result)
{
                            if (result == true) {
                                // **** save user session here, when login is successful
                                req.session.userId = req.body.username;   
                                res.send("hi " + req.body.username +'<br />'+'<a href='+'./'+'>Home</a>');
                            } else {
                                res.send("Wrong Login");
                            }
                        });
                    }else {i
                        res.send("non-existent user.")
                    }
                    client.close();  
                });
            });
        });
                                                                                                      

/* 
                                                                                                      
app.get('/list', function(req, res) {
        var sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            res.render('list.ejs', {availablebooks: result});                  
         });
    });
*/

app.get('/weather', function(req, res){
    const request = require('request');
          
let apiKey = 'ea2280b832c98da507831e436589731f';
//let city = 'london';
let city = req.query.city
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
             
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    var weather = JSON.parse(body)
    var wmsg = 'It is '+ weather.main.temp + ' degrees in '+ weather.name +'! <br> humidity now is:'+ weather.main.humidity;
    res.send (wmsg);
   // res.send(body);
  } 
});
});   
//------------------  
    app.get('/weatherform', function(req, res){
    res.render('weatherform.html');
    });

//------------------
app.get('/api', function (req,res) {
     var MongoClient = require('mongodb').MongoClient;
     var url = 'mongodb://localhost';
     MongoClient.connect(url, function (err, client) {
     if (err) throw err                                                                                                                                                
     var db = client.db('recipebankdb');                                                                                                                                                                   
      db.collection('recipes').find().toArray((findErr, results) => {                                                                                                                                
      if (findErr) throw findErr;
      else
         res.json(results);                                                                                                                                             
      client.close();                                                                                                                                                   
  });
});
});




    app.get('/addrecipe', function(req, res){
    res.render('addrecipe.html');
    });


      app.get('/list', function(req, res) {
      var MongoClient = require('mongodb').MongoClient;
      var url = 'mongodb://localhost';
      MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      var db = client.db('recipebankdb');
      db.collection('recipes').find().toArray((findErr, results) => {
      if (findErr) throw findErr;
      else
         res.render('list.ejs', {availablerecipes:results});
      client.close();
  });
});
});


//logout route:
  app.get('/logout', redirectLogin, (req,res) => {
     req.session.destroy(err => {
     if (err) {
       return res.redirect('./')
     }
     res.send('you are now logged out. <a href='+'./'+'>Home</a>');
     })
     })

} 

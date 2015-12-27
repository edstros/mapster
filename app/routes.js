//dependencies
var mongoose = require('mongoose');
var User = require('./model.js');

//Open App Routes
module.exports = function (app) {

  /* Get Routes
  ----------------------- */

  //Retrieve records for all users in the database
  app.get('/users', function(req, res) {

    //Use Mongoose schema to run the search (empty conditions)
    var query = User.find({});
    //default first parameter is error
    query.exec(function(err, users) {
      if (err)
        res.send(err);
      //if no errors, respond with a json of all users
      res.json(users);
    });
  });

  /* Post routes
  --------------------------*/
  app.post('/users', function(req, res) {

    //create a new User based on the Mongoose schema and the post body
    var newuser = new User(req.body);

    // new User is saved in the database
    newuser.save(function (err) {
      if (err)
        res.send(err);

      //if no errors are found, respond with a json of the new user
      res.json(req.body);
    });
  });
};

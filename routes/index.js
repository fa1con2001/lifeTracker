var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Training = mongoose.model('Training');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.param('training', function(req, res, next, id) {
  var query = Training.findById(id);
  query.exec(function (err, training){
    if (err) { return next(err); }
    if (!training) { return next(new Error('Can\'t find training ' + id)); }
    req.training = training;
    return next();
  });
});

router.get('/trainings', function(req, res, next) {
  Training.find(function(err, trainings){
    if(err){ return next(err); }
    res.json(trainings);
  });
});

router.get('/training/:training', function(req, res) {
  res.json(req.training);
});

router.post('/trainings', function(req, res, next) {
  var training = new Training(req.body);
  training.save(function(err, training){
    if(err){ return next(err); }
    res.json(training);
  });
});

/*function queryDate(date, callback){
  // Query date
  var queryDate = new Date(date);
  queryDate.setHours(0);
  queryDate.setMinutes(0);
  queryDate.setSeconds(0);
  var maxDate = new Date(queryDate);
  maxDate.setDate(maxDate.getDate()+1);
  var query = Day.findOne({day: {$gte: queryDate, $lt: maxDate}});
  query.exec(callback);
}

function getOrCreateDay(date, callback){
  queryDate(date, function(err, day){
    if (err) { return callback(err); }
    if (day) { return callback(null, day); }
    // If day does not exist, create it with the current goals
    day = new Day({day: date});
    // Get current goals
    Goal.find(function(err, goals){
      if(err){ return callback(err); }
      // Take useful fields only (_id and description)
      var goalsShort = [];
      for (var i=0; i<goals.length; i++) {
        var g = {
          _id: goals[i]._id,
          description: goals[i].description
        }
        goalsShort.push(g);
      }
      day.goals = goalsShort;
      return callback(null, day);
    });
  });
}*/

router.delete('/training/:training', function(req, res, next) {
  Training.remove({_id: req.training._id}, function (err) {
    if (err) { return next(err); }
    res.sendStatus(204);
  });
});


module.exports = router;

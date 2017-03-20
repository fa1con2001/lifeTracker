var mongoose = require('mongoose');

var TrainingSchema = new mongoose.Schema({
  date: Date,
  environment: String,
  type: String
}, { collection: 'trainings' });

/*TrainingSchema.methods.addOk = function(callback) {
  if (!this.ok) {
    this.ok = 0;
  }
  this.ok++;
  this.save(callback);
};

TrainingSchema.methods.addKo = function(callback) {
  if (!this.ko) {
    this.ko = 0;
  }
  this.ko++;
  this.save(callback);
};*/

mongoose.model('Training', TrainingSchema);

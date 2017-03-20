angular.module('trainingController', [])
.controller('trainingCtrl', function($scope, $http, Trainings) {
  Trainings.get().success(function(data) {
    $scope.trainings = data;
  });
  $scope.addTraining = function() {
    if(!$scope.newDate || $scope.newDate === '') { return; }
    var trainingObject = {
      date: new Date($scope.newDate),
      type: $scope.newType,
      environment: $scope.newEnvironment
    }
    Trainings.create(trainingObject).success(function(data) {
      trainingObject._id = data._id;
      $scope.trainings.push(trainingObject);
      $scope.newDate = new Date();
    });
  };
  $scope.removeTraining = function(training) {
    Trainings.delete(training._id).success(function(data) {
      var index = $scope.trainings.indexOf(training);
      $scope.trainings.splice(index, 1);
    });
  };
});

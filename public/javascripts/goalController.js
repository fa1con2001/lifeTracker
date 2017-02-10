angular.module('goalController', [])
.controller('goalCtrl', function($scope, $http, Goals) {
  Goals.get().success(function(data) {
    for (var i=0;i<data.length; i++) {
      data[i].ok = i;
      data[i].ko = 1;
      data[i].percentage = (data[i].ok/(data[i].ok+data[i].ko))*100;
    }
    $scope.goals = data;
    $scope.days = [
      {
        date: "hola",
        type: "hol"
      },
      {
        date: "hoy",
        type: "guay"
      }
    ];
  });
  $scope.addDay = function () {
    var dayObject = {
      date: "algo",
      type: "otro algo"
    };
    $scope.days.push(dayObject);
  };
  $scope.addGoal = function() {
    if(!$scope.goalName || $scope.goalName === '') { return; }
    var goalObject = {
      description: $scope.goalName
     }
    Goals.create(goalObject).success(function(data) {
      goalObject._id=data._id;
      goalObject.percentage = 0;
      $scope.goals.push(goalObject);
      $scope.goalName = '';
    });
  };
  $scope.removeGoal = function(goal) {
    Goals.delete(goal._id).success(function(data) {
      var index = $scope.goals.indexOf(goal);
      $scope.goals.splice(index, 1);
    });
  };
});

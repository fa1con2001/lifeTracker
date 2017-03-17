angular.module('goalController', [])
.controller('goalCtrl', function($scope, $http, Goals) {
  Goals.get().success(function(data) {
<<<<<<< HEAD
    for (var i=0;i<data.length; i++) {
      data[i].ok = i;
      data[i].ko = 1;
      data[i].percentage = (data[i].ok/(data[i].ok+data[i].ko))*100;
    }
    $scope.goals = data;
    $scope.days = [
      {
        date: "21/05/17",
        type: "gu",
        ambiente: "bla"
      },
      {
        date: "21/07/18",
        type: "guay"
      }
    ];
  });
  $scope.addDate = function () {
   var dayObject = {
     date: $scope.newDate,
     type: $scope.test,
     ambiente: $scope.test2
    };
    $scope.days.push(dayObject);
=======
    $scope.loadDay(new Date(), data);
  });
  $scope.loadDay = function(date, goals) {
    Goals.getDay(date).success(function(day) {
      if (!day) {
        var originalDate = new Date(date);
        day = {day: originalDate};
      } else { // Convert to javascript date in order to avoid datepicker problems
        day.day = new Date(day.day);
      }
      $scope.goals = updateGoals(goals, day);
      $scope.day = day.day;
    });
  };
  updateGoals = function (goals, day) {
    for (var i=0; i<goals.length; i++) {
      var currentElement = goals[i];
      currentElement.percentage = (currentElement.ok/(currentElement.ok+currentElement.ko))*100;
      if (day.goals) {
        for (var j=0; j<day.goals.length; j++) {
          if (day.goals[j]._id == currentElement._id) {
            currentElement.result = day.goals[j].result;
            break;
          }
        }
      } else {
        currentElement.result = 0;
      }
    }
    return(goals);
>>>>>>> profjesus/master
  };
  $scope.addGoal = function() {
    if(!$scope.goalName || $scope.goalName === '') { return; }
    var goalObject = {
<<<<<<< HEAD
      description: $scope.goalName
     }
    Goals.create(goalObject).success(function(data) {
      goalObject._id=data._id;
      $scope.goals.push(goalObject);
=======
      description: $scope.goalName,
      ok: 0,
      ko: 0
    };
    Goals.create(goalObject).success(function(data) {
      data.percentage = 0;
      $scope.goals.push(data);
>>>>>>> profjesus/master
      $scope.goalName = '';
    });
  };
  $scope.removeGoal = function(goal) {
    Goals.delete(goal._id).success(function(data) {
      var index = $scope.goals.indexOf(goal);
      $scope.goals.splice(index, 1);
    });
  };
  $scope.addOk = function(goal) {
    Goals.addOk(goal._id, $scope.day).success(function(data) {
    });
  };
  $scope.addKo = function(goal) {
    Goals.addKo(goal._id, $scope.day).success(function(data) {
    });
  };
});

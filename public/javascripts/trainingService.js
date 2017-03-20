angular.module('trainingService', [])
// each function returns a promise object
.factory('Trainings', function($http) {
    return {
        get : function() {
            return $http.get('/trainings');
        },
        create : function(trainingData) {
            return $http.post('/trainings', trainingData);
        },
        delete : function(id) {
            return $http.delete('/trainings/' + id);
        }
    }
});

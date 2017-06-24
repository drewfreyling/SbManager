$app.controller('queueController', ['$scope', '$routeParams', '$http', '$window', function ($scope, $routeParams, $http, $window) {
    $scope.name = $routeParams.queue;

    $scope.refresh = function () {
        $scope.model = null;
        $http.get(window.applicationBasePath + "/api/v1/busmanager/queue/" + $routeParams.queue)
            .then(function(response) {
                $scope.model = response.data;
            });
    };
    $scope.refresh();

    $scope.requeue = function() {
        if (!$window.confirm("Are you sure you want to requeue all these messages?")) return;
        $http.post(window.applicationBasePath + "/api/v1/busmanager/queue/" + $routeParams.queue + "/requeue/all")
            .then(function(response) {
                $scope.model = response.data;
            });
    };

    $scope.removeall = function(deadletter) {
        if (!$window.confirm("You sure? These messages will be entirely deleted!")) return;
        var dead = deadletter ? "_$DeadLetterQueue" : "";
        $http.post(window.applicationBasePath + "/api/v1/busmanager/queue/" + $routeParams.queue + dead + "/remove/all")
            .then(function(response) {
                $scope.model = response.data;
            });
    };

    $scope.deadletterall = function() {
        if (!$window.confirm("Are you sure you want to send all these active messages to the deadletter queue?")
        ) return;
        $http.post(window.applicationBasePath + "/api/v1/busmanager/queue/" + $routeParams.queue + "/dead")
            .then(function(response) {
                $scope.model = response.data;
            });
    };

    $scope.delete = function() {
        if (!$window.confirm("You sure? This can't be undone and your app might explode.")) return;
        $http.post(window.applicationBasePath + "/api/v1/busmanager/queue/" + $routeParams.queue + "/delete")
            .then(function() {
                $window.location = "#/";
            });
    };
}]);
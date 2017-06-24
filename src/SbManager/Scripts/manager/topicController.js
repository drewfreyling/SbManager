$app.controller('topicController', ['$scope', '$routeParams', '$http', '$window', function ($scope, $routeParams, $http, $window) {
    $scope.name = $routeParams.topic;

    $scope.refresh = function() {
        $http.get(window.applicationBasePath + "/api/v1/busmanager/topic/" + $routeParams.topic)
            .then(function(response) {
                $scope.model = response.data;
            });
    };

    $scope.delete = function() {
        if (!$window.confirm("You sure? This can't be undone and your app might explode.")) return;
        $http.post(window.applicationBasePath + "/api/v1/busmanager/topic/" + $routeParams.topic + "/delete")
            .then(function() {
                $window.location = "#/";
            });
    };

    $scope.refresh();
}]);
$app.controller('homeController', ['$scope', '$route', '$http', '$window', '$log', function ($scope, $route, $http, $window, $log) {

    $scope.deadletterFilterEnabled = $route.current.$$route.deadletterFilter;

    $scope.refresh = function () {
        $scope.model = null;
        $http.get(window.applicationBasePath + '/api/v1/busmanager/')
            .then((response) => {
                $scope.model = response.data;
                $scope.queuesWithDeadlettersCount = response.data.Queues.reduce((c, q) => c + (q.DeadLetterCount ? 1 : 0), 0);
                $scope.topicsWithDeadlettersCount = response.data.Topics.reduce((c, t) => c + (t.DeadLetterCount ? 1 : 0), 0);
            })
            .catch((error) => {
                $log.error(error);
            });
    };
    $scope.refresh();

    $scope.deleteAll = function () {
        if (!$window.confirm('Are you sure you want to delete all topics and queues? This can\'t be undone and your world might explode.')) return;
        $scope.model = null;
        $http.post(window.applicationBasePath + '/api/v1/busmanager/deleteall')
            .then(() => {
            $scope.resfresh();
        });
    };

    $scope.deleteAllDeadLetters = function () {
        if (!$window.confirm('Are you sure you want to delete all dead letters? This can\'t be undone and your world might explode.')) return;
        $scope.model = null;
        $http.post(window.applicationBasePath + '/api/v1/busmanager/deletealldeadletters')
            .then(() => {
            $scope.refresh();
        });
    };
}]);

(function (angular) {
    "use strict";

    angular
        .module("manager")
        .controller ("homeController", HomeController);

    HomeController.$inject = ['$scope', '$http'];

    function HomeController($scope, $http) {
        $scope.refresh = refresh;
        $scope.deleteAll = deleteAll;
        activate();

        function activate() {
            $scope.refresh();
        }

        function refresh() {
            $scope.model = null;
            return $http.get(window.applicationBasePath + '/api/v1/busmanager/')
                .then(function(data) {
                    $scope.model = data;
                    $scope.$digest();
                })
                .catch(function(err) {
                    alert("ERROR: " + err.message);
                });
        }

        function deleteAll() {
            if (!window.confirm("You sure? This can't be undone and your world might explode.")) return;
            $scope.model = null;
            $http.post(window.applicationBasePath + "/api/v1/busmanager/deleteall", function(d) {
                window.location = "#/";
            });
        }

    }
}(angular));
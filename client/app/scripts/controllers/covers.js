'use strict';

Bookshelf.controller('CoversCtrl', function ($scope, $http) {

    $scope.images = [];
    $scope.searchOnProcess = false;
    $scope.searchCompleted = false;

    $scope.search = function(toSearch) {
        $scope.searchOnProcess = true;
        var parsed = toSearch.split(" ").join("+");


        $http.jsonp("http://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+parsed)
            .success(function(data, status, headers, config) {
                $scope.images = data.responseData.results;
                $scope.searchOnProcess = false;
            })
            .error(function(data, status, headers, config) {
                $scope.searchOnProcess = false;
            });

        /*
        Covers.query({ 'searchKeys': parsed },
            // Success
            function(resource){
                $scope.images = resource.responseData.results;
                $scope.searchOnProcess = false;
            },
            function(resource, status) {
                console.log('error');
                $scope.searchOnProcess = false;
            }
        );
        */
    }

});

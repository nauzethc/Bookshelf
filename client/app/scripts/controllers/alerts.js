'use strict';

Bookshelf.controller('AlertCtrl', function ($scope, Shared) {

    $scope.alerts = Shared.alerts;

    $scope.close = function(index) {
        Shared.removeAlert(index);
    }

});

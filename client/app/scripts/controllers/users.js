'use strict';

Bookshelf.controller('UsersCtrl', function ($scope, Shared, User) {

    $scope.users = User.query();
    $scope.newUser = {
        'username': '',
        'first_name': '',
        'last_name': ''
    }

    $scope.selectUser = function(user) {
        Shared.selectUser(user);
    }

    $scope.refreshUsername = function() {
        $scope.username = $scope.first_name.toLowerCase() + $scope.last_name.toLowerCase().splice(0,2);
    }

});

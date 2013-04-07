'use strict';

Bookshelf.controller('UsersCtrl', function ($scope, Shared, User) {

    $scope.users = User.query();

    $scope.selectUser = function(user) {
        Shared.selectUser(user);
    }

});

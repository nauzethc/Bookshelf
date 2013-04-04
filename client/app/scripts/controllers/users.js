'use strict';

Bookshelf.controller('UsersCtrl', function ($scope, $rootScope, User) {

    $scope.users = User.query();

    $scope.selectUser = function(user) {
        $rootScope.selectedUser = user;
        $rootScope.$apply();
    }

});

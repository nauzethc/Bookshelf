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
        $scope.newUser.username = $scope.newUser.first_name.toLowerCase();
    }

    $scope.create = function(user) {
        User.save({}, user,
            // Success
            function(resource, status) {
                $scope.newUser = {
                    'username': '',
                    'first_name': '',
                    'last_name': ''
                }
                $scope.users.objects.push(resource);
                Shared.addAlert('success', 'The user ' + resource.full_name + ' was added!');
                $scope.closeModal();
            },
            // Error
            function() {
                Shared.addAlert('error', 'The user could not be added!');
            }
        );
    };

    $scope.showModal = function() {
        this.addUserModal = true;
    }
    $scope.closeModal = function() {
        this.addUserModal = false;
    }
    $scope.opts = {
        backdropFade: true,
        dialogFade: true,
    };

});

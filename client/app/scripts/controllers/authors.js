'use strict';

Bookshelf.controller('AuthorsCtrl', function ($scope, Shared, Author) {

    $scope.create = function(author) {
        Author.save({}, author,
            // Success
            function(resource, status) {
                Shared.authorCreated = resource;
                Shared.broadcastAuthor(resource);
                Shared.addAlert('success', 'The author was added successfuly!');
                $scope.newAuthor = null;
            },
            // Error
            function() {
                Shared.addAlert('error', 'The could not be added!');
            }
        );
    };

});

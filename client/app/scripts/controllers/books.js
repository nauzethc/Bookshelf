'use strict';

Bookshelf.controller('BooksCtrl', function ($scope, $http, Shared, Author, Book, BookByUser, BookByUri) {

    $scope.authors = Author.query();

    if (Shared.selectedUser != null) {
        $scope.books = BookByUser.query({}, Shared.selectedUser);
    } else {
        $scope.books = { 'objects': [] };
    }

    $scope.$on('userChanged', function() {
        $scope.books = BookByUser.query({}, Shared.selectedUser);
    });


    $scope.create = function(book) {
        book.user = Shared.selectedUser.resource_uri;
        Book.save({}, book,
            // Success
            function(resource, status) {
                var headers = status();
                console.log(headers);
                BookByUri.get({ 'uri': headers.location },
                    function(book) {
                        console.log(book);
                        $scope.books.objects.push(book);
                    }
                );
            },
            // Error
            function() {
                // Add alert
            }
        );
    };

    $scope.update = function(book) {
        Book.update({}, book);
    };

    $scope.remove = function(book) {
        var index = $scope.books.objects.indexOf(book);
        Book.remove({}, book,
            // Success
            function() {
                $scope.books.objects.splice(index, 1);
                Shared.addAlert('success', 'The book was removed successfuly!');
            },
            // Error
            function() {
                Shared.addAlert('error', 'There was a problem removing he book!');
            }
        );
    };

});

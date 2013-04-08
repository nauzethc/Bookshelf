'use strict';

Bookshelf.controller('BooksCtrl', function ($scope, Shared, Author, Book, BookByUser) {

    $scope.showBooks = false;
    $scope.showEditor = false;
    $scope.selectedBook = null;
    $scope.authors = Author.query();
    $scope.response = null;

    if (Shared.selectedUser != null) {
        $scope.books = BookByUser.query({}, Shared.selectedUser);
        $scope.showBooks = true;
    } else {
        $scope.books = { 'objects': [] };
        $scope.showBooks = false;
    }

    $scope.$on('userChanged', function() {
        $scope.books = BookByUser.query({}, Shared.selectedUser);
        $scope.showBooks = true;
    });

    $scope.$on('authorCreated', function() {
        $scope.authors.objects.push(Shared.authorCreated);
    });

    $scope.select = function(book) {
        $scope.selectedBook = book;
    }

    $scope.create = function(book) {
        book.user = Shared.selectedUser.resource_uri;
        Book.save({}, book,
            // Success
            function(resource, status) {
                $scope.newBook = null;
                $scope.books.objects.push(resource);
                Shared.addAlert('success', 'The book was added successfuly!');
            },
            // Error
            function() {
                Shared.addAlert('error', 'The book was added successfuly!');
            }
        );
    };

    $scope.update = function(book) {
        Book.update({}, book);
    };

    $scope.remove = function(book) {
        if (book != null) {
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
        }
    };

    $scope.enableEditor = function(book) {
        this.newTitle = book.title;
        this.showEditor = true;
    }

    $scope.disableEditor = function() {
        this.newTitle = '';
        this.showEditor = false;
    }

    $scope.setTitle = function(book) {
        book.title = this.newTitle;
        $scope.update(book);
        this.disableEditor();
    }

});

'use strict';

Bookshelf.controller('BooksCtrl', function ($scope, Shared, Author, Book, BookByUser) {

    $scope.showBooks = false;
    $scope.showEditor = false;
    $scope.showPaginator = false;
    $scope.selectedBook = null;
    $scope.authors = Author.query();
    $scope.response = null;

    if (Shared.selectedUser != null) {
        $scope.get();
    } else {
        $scope.books = { 'objects': [] };
        $scope.showBooks = false;
    }

    $scope.$on('userChanged', function() {
        $scope.get();
    });

    $scope.$on('authorCreated', function() {
        $scope.authors.objects.push(Shared.authorCreated);
    });

    $scope.loadPaginator = function() {
        if ($scope.books.meta.previous != null) {
            $scope.showPaginator = true;
            $scope.paginatorPrev = '';
        } else {
            $scope.paginatorPrev = 'disabled';
        }
        if ($scope.books.meta.next != null) {
            $scope.showPaginator = true;
            $scope.paginatorNext = '';
        } else {
            $scope.paginatorNext = 'disabled';
        }
    }

    $scope.get = function(offset_uri) {
        var offset = 0;
        var re = /(?:offset=)(\d+)/;
        // Parse uri if is defined
        if (angular.isDefined(offset_uri)) {
            var match = re.exec(offset_uri);
            if (match.length > 1) {
                offset = match[1];
            }
        }
        // Load books
        $scope.books = BookByUser.query({ 'pageNumber': offset }, Shared.selectedUser,
            function(){
                $scope.loadPaginator();
                $scope.showBooks = true;
            }
        );
    }
    $scope.getPrev = function() {
        if ($scope.books.meta.previous) {
            $scope.get($scope.books.meta.previous);
        }
    }
    $scope.getNext = function() {
        if ($scope.books.meta.next) {
            $scope.get($scope.books.meta.next);
        }
    }

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
                    $scope.deleteBookModal = false;
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

    $scope.showModal = function(book) {
        this.deleteBookModal = true;
        $scope.select(book);
    }
    $scope.closeModal = function() {
        this.deleteBookModal = false;
    }
    $scope.opts = {
        backdropFade: true,
        dialogFade: true,
    };

});

'use strict';

Bookshelf.controller('BooksCtrl', function ($scope, $rootScope, Book, BookUser) {

    $scope.books = Book.query();

    /*
    $scope.getBooks = function() {
        if (!angular.isDefined($rootScope.selectedUser)){
            console.log($rootScope.selectedUser);
            $scope.books = null;
        } else {
            $scope.books = BookUser.query({}, $rootScope.selectedUser);
        }
    };
    */

});

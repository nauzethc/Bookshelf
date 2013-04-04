'use strict';

Bookshelf.factory('Book', ['$resource', function($resource){
    return $resource('http://localhost\\:8000/api/v1/book/:bookId', {
        "bookId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
        update:  { method:'PUT' },
    })
}]);

Bookshelf.factory('BookUser', ['$resource', function($resource){
    return $resource('/api/v1/book/?user__username=:username', {
        "username": "@username"
    }, {
        query:   { method:'GET', isArray: false },
    })
}]);

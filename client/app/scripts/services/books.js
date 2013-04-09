'use strict';

Bookshelf.factory('Book', ['$resource', function($resource){
    return $resource('http://localhost\\:8000/api/v1/book/:bookId', {
        "bookId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
        update:  { method:'PUT' },
    })
}]);

Bookshelf.factory('BookByUser', ['$resource', function($resource){
    return $resource('http://localhost\\:8000/api/v1/book/?user__username=:username&limit=10&offset=:pageNumber', {
        "username": "@username",
        "pageNumber": 0
    }, {
        query:   { method:'GET', isArray: false },
    })
}]);

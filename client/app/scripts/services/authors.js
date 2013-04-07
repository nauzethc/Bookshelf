'use strict';

Bookshelf.factory('Author', ['$resource', function($resource){
    return $resource('http://localhost\\:8000/api/v1/author/:authorId', {
        "authorId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
        update:  { method:'PUT' },
    })
}]);

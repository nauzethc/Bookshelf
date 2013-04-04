'use strict';

Bookshelf.factory('User', ['$resource', function($resource){
    return $resource('http://localhost\\:8000/api/v1/user/:userId', {
        "userId": "@id"
    }, {
        query:   { method:'GET', isArray: false },
        update:  { method:'PUT' },
    })
}]);

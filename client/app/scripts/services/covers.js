'use strict';

Bookshelf.factory('Covers', ['$resource', function($resource){
    return $resource('http://ajax.googleapis.com/ajax/services/search/images?v1.0&q=:searchKeys', {}, {
        query:   { method: 'JSONP', isArray: false }
    })
}]);

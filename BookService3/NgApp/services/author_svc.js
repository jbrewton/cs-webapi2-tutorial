(function () {
    'use strict';
    angular.module('app')
        .factory('authors_svc', ['$http', function ($http) {

            var urlBase = '/api/authors';
            var author_svc = {};

            // Array to hold "index" of book service
            author_svc.list = [];

            // Get the author index
            author_svc.getAuthors = function () {
                var promise = $http.get(urlBase);
                promise.then(
                    function (result) {
                        var datas = result.data.map(
                            function (item, idx) {
                                // perform any setup of the item
                                author_svc.setup_author(item);
                                return item;
                            });
                        angular.copy(datas, author_svc.list);
                    }
                ).catch(
                    function (error) {
                        console.log("#{error}");
                    }
                );

                // Let the caller have a chance to act on the promise after we insert our initial setup
                return promise;
            };

            author_svc.setup_author = function (item) {
                // setup author item
                item.pants = "yes";
            };

            return author_svc;
        }]);
})();

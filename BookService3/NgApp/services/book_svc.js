(function () {
    'use strict';
    angular.module('app')
        .factory('books_svc', ['$http', function ($http) {

            var urlBase = '/api/books';
            var books_svc = {};

            // Array to hold "index" of book service
            books_svc.list = [];

            // Get the book index
            books_svc.getBooks = function () {
                var promise = $http.get(urlBase);
                promise.then(
                    function (result) {
                        var datas = result.data.map(
                            function (item, idx) {
                                // perform any setup of the item
                                books_svc.setup_book(item);
                                return item;
                            });
                        angular.copy(datas, books_svc.list);
                    }
                ).catch(
                    function (error) {
                        console.log("#{error}");
                    }
                );

                // Let the caller have a chance to act on the promise after we insert our initial setup
                return promise;
            };

            books_svc.getBook = function (id) {
                var fetchedBook = {};
                var promise = $http.get(urlBase + '/' + id);
                promise.then(
                    function (result) {
                        fetchedBook = result.data;
                        return books_svc.setup_book(fetchedBook); // return the book after it is setup for use
                    }).catch(
                    function (error) {
                        console.log("#{error}");
                    });
                return promise;
            };

            books_svc.setup_book = function (book_item) {
                // setup book item
                book_item.pants = "yes";
            };

            books_svc.addBook = function (book) {
                return $http.post(urlBase, book);
            };

            //books_svc.updateCustomer = function (cust) {
            //    return $http.put(urlBase + '/' + cust.ID, cust)
            //};

            //books_svc.deleteCustomer = function (id) {
            //    return $http.delete(urlBase + '/' + id);
            //};

            //books_svc.getOrders = function (id) {
            //    return $http.get(urlBase + '/' + id + '/orders');
            //};

            return books_svc;
        }]);
})();

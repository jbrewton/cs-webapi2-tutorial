(function () {
    'use strict';

    angular
        .module('app')
        .controller('Main', ['books_svc', 'authors_svc',
        function main(books_svc, authors_svc) {

            // Set the scope
            var vm = this;

            // Create new book with default author
            vm.createNewBook = function () {
                if (vm.authorList.length > 0) {
                    return { AuthorId: vm.authorList[0] };
                }
                return {};
            };

            // Dont mind me
            vm.first_thing = 'I said Good Day, Sir.'

            // View model to hold the current book detail
            vm.book_detail = null;

            // View model to hold the new book item
            vm.newBook = {};

            // Bind to our data services
            vm.booklist = books_svc.list;
            vm.authorList = authors_svc.list;

            // Get initial data
            books_svc.getBooks();
            authors_svc.getAuthors().then(function () {
                vm.newBook = vm.createNewBook();
            });

            // Callback for the get details to load more information
            vm.getBookDetails = function (id) {
                var promise = books_svc.getBook(id);
                promise.then(function (result) {
                    vm.book_detail = result.data;
                });
            };

            // Callback for the form to submit with
            vm.addBook = function () {
                var promise = books_svc.addBook(vm.newBook);
                promise.then(function (result) {
                    vm.newBook = vm.createNewBook();
                    books_svc.getBooks();
                });
            };
        }]);
})();
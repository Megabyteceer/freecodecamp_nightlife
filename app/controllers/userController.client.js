'use strict';

(function () {

   angular.module('voteApp')

     .controller('UserController', function($http, $rootScope) {
         
       var user = this;
       
       $http.get('/api').then(function(res){
           debugger;
         user.data = res.data;
         $rootScope.loggedIn = res.data.displayName;
       });

     });


})();

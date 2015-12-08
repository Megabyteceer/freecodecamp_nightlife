'use strict';

(function () {

   angular.module('megabyte.night-life')

     .controller('UserController', function($http, $rootScope) {
         
       var user = this;
       
       $http.get('/api').then(function(res){
         user.data = res.data;
         $rootScope.loggedIn = res.data.displayName;
       });

     });


})();

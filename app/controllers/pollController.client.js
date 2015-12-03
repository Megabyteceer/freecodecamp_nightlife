'use strict';




(function() {


   function Answer(name) {
      if (!name) name = '';

      this.name = name;
   }
   
   var googleChartsLoaded=false;
   var dataToDraw = false;

   google.load('visualization', '1.0', {'packages':['corechart']});
   google.setOnLoadCallback(function(){
      googleChartsLoaded=true
      if(dataToDraw){
         drawGoogleChart(dataToDraw);
      }
   });
   
   
   function drawGoogleChart(pool){
      
      if(!googleChartsLoaded){
         dataToDraw = pool;
         return;
      }
      
      var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        
        var rows = [];
        
        pool.answers.forEach(function(a){
           rows.push([a.name,a.rate]);
        })

        data.addRows(rows);

        var options = {'title':'',
                       'width':600,
                       'height':400};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);

   }
   
   


   angular.module('voteApp')

   .controller('PollController', function($http, $rootScope, $location) {


      var poll = this;
      
      poll.refreshPolls = function () {
        $http.get('/api/poll').then(function(res) {
           poll.polls = res.data;
        });
        poll.page=false;
        poll.newPool = false;
      }
      

      
      
      
      poll.removePoll = function(id) {
         $http.delete('/api/poll/'+id).then(function(res) {
           poll.refreshPolls();
         });
      }
      
      poll.showPoll = function (id) {
          $http.get('/api/poll/'+id).then(function(res) {
           poll.currentPoll = res.data;
           poll.page='poll';
           poll.curid = id;

           poll.publicUrl = $location.protocol()+'://'+ $location.host() + '/vote:'+id;
           if(poll.currentPoll.answered)
           {
              drawGoogleChart(poll.currentPoll);
           }
           
           
         });
         
      }
      
      poll.vote = function(id){
         $http.post('/api/poll/'+id).then(function(res) {
           if(res.data !== 'ok') {
              alert(res.data);
           }
           poll.showPoll(poll.curid);
           
         });
      }
      
      poll.loggedIn = function(){
         
         return $rootScope.loggedIn;
      }
      
      poll.addPoll = function() {
         poll.newPool = {
            name: '',
            answers: [new Answer(''), new Answer('')]
         }
         poll.page='new';
      };

      poll.addAnswer = function() {
         poll.newPool.answers.push(new Answer());
      };

      poll.removeAnswer = function(answer) {
         if (poll.canDeleteOption()) {
            var i = poll.newPool.answers.indexOf(answer);
            poll.newPool.answers.splice(i, 1);
         }
      };

      poll.isValid = function() {
         if(!poll.newPool) return false;
         
         var count = 0;
         for (var i in poll.newPool.answers) {
            if (poll.newPool.answers[i].name != '') {
               count++;
            }
         }
         return (poll.newPool.name != '') && (count > 1);
      }

      poll.canDeleteOption = function() {
         return poll.newPool.answers.length > 2;
      }
      
      
      poll.submit = function() {

         if (poll.isValid()) {
               $http.post('/api/poll', poll.newPool).then(function(res) {
                  if(res.data ==='ok') {
                     poll.refreshPolls();
                  } else {
                     alert(res.data)
                  }
            }, function(err){
               alert(err);
            });
         }

      }
      
      
      var a = $location.absUrl().split('/vote:');
      if(a[1]){
         poll.showPoll(a[1]);
      } else {
         poll.refreshPolls();
      }
      


   });


})();

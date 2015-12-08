'use strict';




(function() {


   angular.module('megabyte.night-life')

   .controller('PlaceController', function($http, $timeout, $rootScope, $window) {

      var controller = this;
      
      controller.places = [{"id":"cafe-gigu-boston","snippet_text":"This is a great place to go for drinks and a snack. The drink list is interesting and extensive. Both the drinks we had were excellently flavored and not...","image_url":"http://s3-media2.fl.yelpcdn.com/bphoto/3yhyBMdQUoe2IFSsqOZBig/ms.jpg","name":"Cafe Gigu","rating_img_url":"http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png","url":"http://www.yelp.com/biz/cafe-gigu-boston","adr":"102 Meridian St","going":3},{"id":"barcelona-wine-bar-south-end-boston-6","snippet_text":"Barcelona is easily the best dining experience I've ever had in Boston.  Actually, it is one of the better tapas restaurants I've tried.  \n\nThe Whiskey Root...","image_url":"http://s3-media3.fl.yelpcdn.com/bphoto/bER1fLI40qYu0zcRvc_wMg/ms.jpg","name":"Barcelona Wine Bar South End","rating_img_url":"http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png","url":"http://www.yelp.com/biz/barcelona-wine-bar-south-end-boston-6","adr":"525 Tremont St","going":3},{"id":"maverick-marketplace-cafe-boston-2","snippet_text":"I love this place, the employees are friendly and attentive, you can really tell that everyone who works there cares about the success of the business. It...","image_url":"http://s3-media2.fl.yelpcdn.com/bphoto/YWSurR4Z7sTU74ESeNVqbQ/ms.jpg","name":"Maverick Marketplace Cafe","rating_img_url":"http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png","url":"http://www.yelp.com/biz/maverick-marketplace-cafe-boston-2","adr":"Maverick Marketplace","going":3},{"id":"the-tap-trailhouse-boston-2","snippet_text":"Crab Nachos.\n\nCame here after a Celtics game and wasn't ready to go home.  I love how they revamped The Tap and decided to stop by for a glass of delicious...","image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/G8nU4imAbYHnNbJ2qY70Eg/ms.jpg","name":"The Tap Trailhouse","rating_img_url":"http://s3-media2.fl.yelpcdn.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png","url":"http://www.yelp.com/biz/the-tap-trailhouse-boston-2","adr":"19 Union St","going":3},{"id":"internal-matter-boston","snippet_text":"I've been here multiple times now, and every time gets better. Staff is always attentive and informative. Tried some new items tonight pizzetta and...","image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/cXMiLWwrX8vSKhq2TFgdqQ/ms.jpg","name":"Internal Matter","rating_img_url":"http://s3-media1.fl.yelpcdn.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png","url":"http://www.yelp.com/biz/internal-matter-boston","adr":"35 Channel Center St","going":3},{"id":"atlantic-fish-company-boston","snippet_text":"GET THE LOBSTER ROLL. THANK ME LATER. \n\nI got so full on the pre-dinner bread, that I could only finish half my lobster roll. I remember feeling like the...","image_url":"http://s3-media1.fl.yelpcdn.com/bphoto/YsuJAUAmGqjGBW0OzreBdA/ms.jpg","name":"Atlantic Fish Company","rating_img_url":"http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png","url":"http://www.yelp.com/biz/atlantic-fish-company-boston","adr":"761 Boylston St","going":3},{"id":"corner-cafe-boston","snippet_text":"Exactly what is needed after walking the Freedom Trail for a couple hours!  Great \"dive\" bar!!","image_url":"http://s3-media2.fl.yelpcdn.com/bphoto/JSdMluF73gNsqRTYDsAalA/ms.jpg","name":"Corner Cafe","rating_img_url":"http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png","url":"http://www.yelp.com/biz/corner-cafe-boston","adr":"87 Prince St","going":3},{"id":"corner-tavern-boston","snippet_text":"Back Bay is full of tourist traps, Corner Tavern is not one of them. It's my favorite bar in the area. Good crowds, excellent atmosphere, wether you're here...","image_url":"http://s3-media3.fl.yelpcdn.com/bphoto/i49mv6rpUf0BPuJyCisAUw/ms.jpg","name":"Corner Tavern","rating_img_url":"http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png","url":"http://www.yelp.com/biz/corner-tavern-boston","adr":"421 Marlborough St","going":3},{"id":"drink-boston","snippet_text":"There has been so much hype about this place and it is definitely well deserved!\n\nI've heard stories about how bartenders ask for a story and make a drink...","image_url":"http://s3-media1.fl.yelpcdn.com/bphoto/-dnb45j-zQc7RhMQYqdJkg/ms.jpg","name":"Drink","rating_img_url":"http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png","url":"http://www.yelp.com/biz/drink-boston","adr":"348 Congress St","going":3},{"id":"eastern-standard-kitchen-and-drinks-boston-3","snippet_text":"One of the best places I've ever been to in terms or food, drinks, and service. My family of 7 people came here on a Saturday after a comedy show that we...","image_url":"http://s3-media4.fl.yelpcdn.com/bphoto/vbKWnpsxcbP67Gk1CjqOIA/ms.jpg","name":"Eastern Standard Kitchen and Drinks","rating_img_url":"http://s3-media4.fl.yelpcdn.com/assets/2/www/img/c2f3dd9799a5/ico/stars/v1/stars_4.png","url":"http://www.yelp.com/biz/eastern-standard-kitchen-and-drinks-boston-3","adr":"528 Commonwealth Ave","going":3}]      
      
      
      function collapse(){
          controller.containerClass = 'places-container-collapse';
      }
      
      function expand(){
          controller.containerClass=""
      }
      
      
      collapse();
      controller.searchChanged = function () {
        if(controller.whereYou && (controller.whereYou.length > 1)) {
            controller.showLoaderPic = true;
            $http.get('/api/place?placeName='+controller.whereYou).then(function(res) {
               controller.showLoaderPic = false;
               controller.places = res.data;
                $timeout(function(){
                    expand();
                    if(controller.clickAfterLoad) {
                        
                        controller.places.some(function(p){
                            if(p.id === controller.clickAfterLoad){
                                controller.goingClick(p);
                                return true;
                            }
                            return false;
                        });
                        
                        delete(controller.clickAfterLoad);
                    }
                }, 20);
            });
        } else {
            collapse();
        }
      }
      
      controller.goingClick = function (place) {
          if($rootScope.loggedIn) {
          
              $http.post('/api/place', {'id':place.id} ).then(function (res) {
                place.going = res.data;
              });
          } else {
             $window.location.href = ('/login?whereYou='+controller.whereYou+'&placeId='+place.id);
          }
      }
      
      $http.get('/afterLoginData').then(function(res) {
          if(res.data.whereYou) {
              controller.whereYou = res.data.whereYou;
              controller.clickAfterLoad = res.data.placeId;
              controller.searchChanged();
             }
        })

      

   });


})();

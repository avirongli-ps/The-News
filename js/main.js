

(function($) {

	"use strict";

	var cfg = {		
		defAnimation   : "fadeInUp",    		
		scrollDuration : 800,           
		statsDuration  : 4000,          
		mailChimpURL   : 'http://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e65110b38d'
	},
		
	$WIN = $(window);


	
	var ssPreloader = function() {
		$WIN.on('load', function() {	

	       
	    	$("#loader").fadeOut("slow", function(){

	        
	        $("#preloader").delay(300).fadeOut("slow");

	      }); 
	  	});
	};  


	 
	var ssMediaElementPlayer = function() {
		$("audio").mediaelementplayer({
			features: ['playpause','progress', 'tracks','volume']
	  	});
	};


	 
	var ssFitVids = function() {
		$(".fluid-video-wrapper").fitVids();
	}; 

		

	var ssPrettyPrint = function() {
		$('pre').addClass('prettyprint');
		$( document ).ready(function() {		
	    	prettyPrint();		
	  	}); 
	};


	
  	var ssAlertBoxes = function() {

  		$('.alert-box').on('click', '.close', function() {
		  $(this).parent().fadeOut(500);
		}); 

  	};	   


	
	var ssSuperFish = function() {
		$('ul.sf-menu').superfish({

	   	animation: { height:'show' }, 
			animationOut: { height:'hide'}, 			
			cssArrows: false, 
			delay: 600 
			
		});
	};

	
  
   var ssMobileNav = function() {

   	var toggleButton = $('.menu-toggle'),
          nav = $('.main-navigation');

	   toggleButton.on('click', function(event){
			event.preventDefault();

			toggleButton.toggleClass('is-clicked');
			nav.slideToggle();
		});

	  	if (toggleButton.is(':visible')) nav.addClass('mobile');

	  	$WIN.resize(function() {
	   	if (toggleButton.is(':visible')) nav.addClass('mobile');
	    	else nav.removeClass('mobile');
	  	});

	  	$('#main-nav-wrap li a').on("click", function() {   
	   	if (nav.hasClass('mobile')) {   		
	   		toggleButton.toggleClass('is-clicked'); 
	   		nav.fadeOut();   		
	   	}     
	  	});

   }; 
   

 
   var ssSearch = function() {

   	var searchWrap = $('.search-wrap');
	   var searchField = searchWrap.find('.search-field');
	   var closeSearch = $('#close-search');
	   var searchTrigger = $('.search-trigger');
	   var body = $('body');

	   searchTrigger.on('click', function(e){

	      e.preventDefault();
	      e.stopPropagation();   
	      var $this = $(this);

	      body.addClass('search-visible');
	      setTimeout(function(){
	         $('.search-wrap').find('.search-field').focus();
	      }, 100);

	   });


	   closeSearch.on('click', function(){
	      var $this = $(this);
	      
	      if(body.hasClass('search-visible')){
	         body.removeClass('search-visible');
	         setTimeout(function(){
	            $('.search-wrap').find('.search-field').blur();
	         }, 100);
	      }
	   });

	   searchWrap.on('click',  function(e){
	   	if( !$(e.target).is('.search-field') ) {   		
	   		closeSearch.trigger('click');   		
	   	}
	   });

	   searchField.on('click', function(e){
	      e.stopPropagation();
	   });

	   searchField.attr({placeholder: 'Type Your Keywords', autocomplete: 'off'});

   };
	 


	
	var ssMasonryFolio = function() {
		var containerBricks = $('.bricks-wrapper');

		containerBricks.imagesLoaded( function() {

			containerBricks.masonry( {		  
			  	itemSelector: '.entry',
			  	columnWidth: '.grid-sizer',
	  			percentPosition: true,
			  	resize: true
			});			

		});
	};


  
	var ssBricksAnimate = function() {

		var animateEl = $('.animate-this');

		$WIN.on('load', function() {				
			setTimeout(function() {
				animateEl.each(function(ctr) {				
						var el = $(this);
						
						setTimeout(function() {
							el.addClass('animated fadeInUp');														
						}, ctr * 200);

				});
			}, 200);				
		});

		$WIN.on('resize', function() {	
			
			animateEl.removeClass('animate-this animated fadeInUp');
		});

	};
		

  
	var ssFlexSlider = function() {

		$WIN.on('load', function() {

		   $('#featured-post-slider').flexslider({
				namespace: "flex-",
		      controlsContainer: "", 
		      animation: 'fade',
		      controlNav: false,
		      directionNav: true,
		      smoothHeight: false,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,		
		   });

		   $('.post-slider').flexslider({
		   	namespace: "flex-",
		      controlsContainer: "",
		      animation: 'fade',
		      controlNav: true,
		      directionNav: false,
		      smoothHeight: false,
		      slideshowSpeed: 7000,
		      animationSpeed: 600,
		      randomize: false,
		      touch: true,
		      start: function (slider) {
					if (typeof slider.container === 'object') {
						slider.container.on("click", function (e) {
							if (!slider.animating) {
								slider.flexAnimate(slider.getTarget('next'));
							}
						});
					}

					$('.bricks-wrapper').masonry('layout');								
				}
		   });

	   });
	};	


  
	var ssSmoothScroll = function() {

		$('.smoothscroll').on('click', function (e) {
			var target = this.hash,
			$target    = $(target);
	 	
		 	e.preventDefault();
		 	e.stopPropagation();	   	

	    	$('html, body').stop().animate({
	       	'scrollTop': $target.offset().top
	      }, cfg.scrollDuration, 'swing').promise().done(function () {

	      	
	      	if ($('body').hasClass('menu-is-open')) {
					$('#header-menu-trigger').trigger('click');
				}

	      	window.location.hash = target;
	      });
	  	});

	};


  
	var ssPlaceholder = function() {
		$('input, textarea, select').placeholder();  
	}; 


 
	var ssAjaxChimp = function() {

		$('#mc-form').ajaxChimp({
			language: 'es',
		   url: cfg.mailChimpURL
		});

		
		$.ajaxChimp.translations.es = {
		  'submit': 'Submitting...',
		  0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
		  1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
		  2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
		  5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
		} 

	};
	

 
	var ssBackToTop = function() {

		var pxShow  = 500,         
		fadeInTime  = 400,         
		fadeOutTime = 400,         
		scrollSpeed = 300,         
		goTopButton = $("#go-top")

		
		$(window).on('scroll', function() {
			if ($(window).scrollTop() >= pxShow) {
				goTopButton.fadeIn(fadeInTime);
			} else {
				goTopButton.fadeOut(fadeOutTime);
			}
		});
	};	


 
	var ssGoogleMap = function() { 

		if (typeof google === 'object' && typeof google.maps === 'object') {

			var latitude = 31.2560 ,
				 longitude =  75.7051 ,
				 map_zoom = 15,		 
				 main_color = '#d8ac00',
				 saturation_value = -30,
				 brightness_value = 5,
				 marker_url = null,
				 winWidth = $(window).width();	

		   
		   $("#map-zoom-in, #map-zoom-out").show();	 	 

		   
			if ( winWidth > 480 ) {
				marker_url = 'images/icon-location@2x.png';                    
		   } else {
		      marker_url = 'images/icon-location.png';            
		   }	 

			
			var style = [ 
				{
					
					elementType: "labels",
					stylers: [
						{ saturation: saturation_value }
					]
				},  
			   {	
					featureType: "poi",
					elementType: "labels",
					stylers: [
						{visibility: "off"}
					]
				},
				{
					
			      featureType: 'road.highway',
			      elementType: 'labels',
			      stylers: [
			         { visibility: "off" }
			      ]
			   }, 
				{ 	
					
					featureType: "road.local", 
					elementType: "labels.icon", 
					stylers: [
						{ visibility: "off" } 
					] 
				},
				{ 
					
					featureType: "road.arterial", 
					elementType: "labels.icon", 
					stylers: [
						{ visibility: "off" }
					] 
				},
				{
					
					featureType: "road",
					elementType: "geometry.stroke",
					stylers: [
						{ visibility: "off" }
					]
				}, 
				
				{ 
					featureType: "transit", 
					elementType: "geometry.fill", 
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}, 
				{
					featureType: "poi",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.government",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.sport_complex",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.attraction",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "poi.business",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "transit",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "transit.station",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "landscape",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
					
				},
				{
					featureType: "road",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				},
				{
					featureType: "road.highway",
					elementType: "geometry.fill",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}, 
				{
					featureType: "water",
					elementType: "geometry",
					stylers: [
						{ hue: main_color },
						{ visibility: "on" }, 
						{ lightness: brightness_value }, 
						{ saturation: saturation_value }
					]
				}
			];
				
			
			var map_options = {

		      	center: new google.maps.LatLng(latitude, longitude),
		      	zoom: 15,
		      	panControl: false,
		      	zoomControl: false,
		        	mapTypeControl: false,
		      	streetViewControl: false,
		      	mapTypeId: google.maps.MapTypeId.ROADMAP,
		      	scrollwheel: false,
		      	styles: style

		    	};

		  
			var map = new google.maps.Map(document.getElementById('map-container'), map_options);

							
			var marker = new google.maps.Marker({

				 	position: new google.maps.LatLng(latitude, longitude),
				 	map: map,
				 	visible: true,
				 	icon: marker_url
				 
				});

			
			function CustomZoomControl(controlDiv, map) {
			
				
			 	var controlUIzoomIn= document.getElementById('map-zoom-in'),
				  	 controlUIzoomOut= document.getElementById('map-zoom-out');

				controlDiv.appendChild(controlUIzoomIn);
				controlDiv.appendChild(controlUIzoomOut);

				
				google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
					map.setZoom(map.getZoom()+1)
				});
				google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
					map.setZoom(map.getZoom()-1)
				});
					
			}

			var zoomControlDiv = document.createElement('div');
			var zoomControl = new CustomZoomControl(zoomControlDiv, map);

			
			map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);

		} 

	};



	(function ssInit() {	

		ssPreloader();
		ssMediaElementPlayer();
		ssFitVids();
		ssPrettyPrint();
		ssAlertBoxes();
		ssSuperFish();
		ssMobileNav();
		ssSearch();
		ssMasonryFolio();		
		ssBricksAnimate();
		ssFlexSlider();				
		ssSmoothScroll();
		ssPlaceholder();
		ssAjaxChimp();		
		ssBackToTop();
		ssGoogleMap();

	})();
 
 

})(jQuery);
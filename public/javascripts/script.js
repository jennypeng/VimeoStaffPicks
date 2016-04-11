var w, container, carousel, item, radius, itemLength, rY, ticker, fps; 
var mouseX = 0;
var mouseY = 0;
var addX = 0;
var paused = false;


window.onload = function() {
  // initialize the video display carousel 
  initCarousel();
  
  // if the user clicks a thumbnail, we append a video player and pause the carousel
  $('.video-start').on('click', function() {
    paused = true;
    $('.overlay').fadeIn();
    $('.video-player').width(640).height(390);
    
    $('.video-player').html(
      '<iframe src="https://player.vimeo.com/video/' + $(this).attr('data-video-id') + '?autoplay=1&loop=1&automute=0" width="640" height="390" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'
    ).fadeIn('slow');
  });
  
  // if the user hovers over a thumbnail, we can see the api info for the video
  $(".video-thumbnail").on("mouseover", function () {
    var id = '#info-' + $(this).attr('data-video-id');
    $(this).hide();
    $(id).fadeIn(200);
  });

  // if the user's mouse hovers away from the video info, we revert it back to the video thumbnail
  $(".video-info").on("mouseleave", function () {
    var id = '#thumbnail-' + $(this).attr('data-video-id');
    $(this).hide();
    $(id).fadeIn(200);
  });

  // when watching a video, clicking anywhere outside of the video will exit the player
  $('.overlay').on('click', function() {
    paused = false;
    $(this).fadeOut();
    $('.video-player').width(0).height(0);
    $('.video-player').fadeOut('slow').html('');
  })
}

/* 3D carousel code based of off John Blazek's 3D carousel for displaying videos. */

var fps_counter = {  
  tick: function () 
  {
    // this has to clone the array every tick so that
    // separate instances won't share state 
    this.times = this.times.concat(+new Date());
    var seconds, times = this.times;
    
    if (times.length > this.span + 1) 
    {
      times.shift(); // ditch the oldest time
      seconds = (times[times.length - 1] - times[0]) / 1000;
      return Math.round(this.span / seconds);
    } 
    else return null;
  },

  times: [],
  span: 20
};
var counter = Object.create(fps_counter);

//$(document).ready( init )

function initCarousel() {
  console.log('initing');
  w = $(window);
  container = $( '#contentContainer' );
  carousel = $( '#carouselContainer' );
  item = $( '.carouselItem' );
  itemLength = $( '.carouselItem' ).length;
  fps = $('#fps');
  rY = 360 / itemLength;
  radius = Math.round( (250) / Math.tan( Math.PI / itemLength ) );
  
  // set container 3d props
  TweenMax.set(container, {perspective:600})
  TweenMax.set(carousel, {z:-(2000)})
  
  // create carousel item props
  
  for ( var i = 0; i < itemLength; i++ )
  {
    var $item = item.eq(i);
    var $block = $item.find('.carouselItemInner');
    
    //thanks @chrisgannon!        
    TweenMax.set($item, {rotationY:rY * i, z:radius, transformOrigin:"50% 50% " + -radius + "px"});
    
    animateIn( $item, $block )            
  }
  
  // set mouse x and y props and looper ticker
  window.addEventListener( "mousemove", onMouseMove, false );
  ticker = setInterval(function() {
    if (!paused) {
      looper();
    }
  }, 3000/60 );  
}

function animateIn( $item, $block ) {    
  TweenMax.set( $item, { autoAlpha:1, delay:1 } )  
  TweenMax.set( $block, { z:-4, rotationY:-100, rotationX:-100, x:-2000, y:-2000, autoAlpha:0} )
  TweenMax.to( $block, 1.5, { delay:1, rotationY:0, rotationX:0, z:0 } )
  TweenMax.to( $block, 1, { delay:1, x:0, y:0, autoAlpha:1, } )
}

function onMouseMove(event) {
  mouseX = -(-(window.innerWidth * .5) + event.pageX) * .0025;
}

// loops and sets the carousel 3d properties
function looper() {
    addX += mouseX
    TweenMax.to( carousel, 1, { rotationY:addX, rotationX:mouseY, ease:Quint.easeOut } )
}

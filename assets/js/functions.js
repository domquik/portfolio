/*================================================
*
* Template name : Mone
* Version       : 1.0.1
* Author        : FlaTheme
* Author URL    : http://themeforest.net/user/flatheme
*
* Table of Contents :
* 1. Page Preloader
* 2. Cursor
* 3. Header Nav Menu
* 4. Scroll To Top
* 5. Sliders
* 6. Lightbox
* 7. Google Maps
* 8. Contact Form
*
================================================*/
"use strict";

var $body = $("body");

/*===============================================
  1. Page Preloader
===============================================*/
$(window).on("load", function () {
  $body.addClass("loaded");
});

if ($body.attr("data-preloader") === "true") {
  $body.append($("<div class='preloader'><div><span>L</span><span>O</span><span>A</span><span>D</span><span>I</span><span>N</span><span>G</span></div></div>"));
}

/*===============================================
  2. Cursor
===============================================*/
var customCursor = document.getElementById("cursor");

if (customCursor) {
  var cursor = document.getElementById("cursor");
  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
  });

  var mouseElms = document.querySelectorAll("a, button, input, textarea, .cursor-link");

  mouseElms.forEach(function(mouseElm) {
    mouseElm.addEventListener("mouseenter", function() {
      cursor.classList.add("scale-cursor");
    });
    mouseElm.addEventListener("mouseleave", function() {
      cursor.classList.remove("scale-cursor");
    });
  });
}


/*===============================================
  3. Header Nav Menu
===============================================*/
var headerNav = $(".nav-box");

if (headerNav.length) {
  var toggleBtn = $("#nav-toggle");
  //
  // Menu Toggle //
  //
  toggleBtn.on("click", function() {
    if (headerNav.hasClass("show")) {
      headerNav.removeClass("show");
      toggleBtn.removeClass("active");
    }
    else {
      headerNav.addClass("show");
      toggleBtn.addClass("active");
    }
  });
  //
  // Close Menu //
  //
  $(document).on("click", function(e) {
    if ( $(e.target).closest(".nav-box, #nav-toggle").length === 0 ) {
      if (headerNav.hasClass("show")) {
        headerNav.removeClass("show");
        toggleBtn.removeClass("active");
      }
    }
  });
}

/*===============================================
  4. Scroll To Top
===============================================*/
var scrollTopBtn = document.querySelector(".scrolltotop");

if (scrollTopBtn) {
  // Show, Hide //
  window.addEventListener("scroll", function() {
    if (window.pageYOffset > 700) { // 700px from top
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });
}


/*===============================================
  5. Sliders
===============================================*/
//
// Portfolio Slider //
//
function updatePortfolioChannel(swiperInstance) {
  var currentChannel = document.querySelector(".portfolio-channel-current");
  var totalChannels = document.querySelector(".portfolio-channel-total");
  var screenChannel = document.querySelector(".tv-program-channel");
  var screenProgram = document.querySelector(".tv-program-name");
  var activeProjectName = swiperInstance.slides[swiperInstance.activeIndex]
    .querySelector(".portfolio-caption");

  if (currentChannel && totalChannels) {
    currentChannel.textContent = String(swiperInstance.realIndex + 1).padStart(2, "0");
    totalChannels.textContent = String(swiperInstance.slides.length).padStart(2, "0");
  }

  if (screenChannel && screenProgram && activeProjectName) {
    var channel = String(swiperInstance.realIndex + 1).padStart(2, "0");
    screenChannel.textContent = "CH " + channel;
    screenProgram.textContent = activeProjectName.textContent.trim();
  }
}

function animatePortfolioChannel() {
  var tvScreen = document.querySelector(".tv-screen");

  if (!tvScreen) {
    return;
  }

  window.clearTimeout(portfolioChannelAnimationTimer);
  tvScreen.classList.remove("channel-changing");
  void tvScreen.offsetWidth;
  tvScreen.classList.add("channel-changing");
  portfolioChannelAnimationTimer = window.setTimeout(function() {
    tvScreen.classList.remove("channel-changing");
  }, 600);
}

var portfolioChannelAnimationTimer;
var portfolioSwiper = new Swiper(".portfolio-slider", {
  slidesPerView: 1,
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-portfolio-next",
    prevEl: ".swiper-portfolio-prev",
  },
  on: {
    init: updatePortfolioChannel,
    slideChange: function(swiperInstance) {
      updatePortfolioChannel(swiperInstance);
      animatePortfolioChannel();
    },
  },
});

var tvNoiseCanvas = document.querySelector(".tv-vhs-noise");

if (tvNoiseCanvas) {
  var tvNoiseContext = tvNoiseCanvas.getContext("2d");

  if (tvNoiseContext) {
    var tvNoiseWidth = 160;
    var tvNoiseHeight = 120;
    var tvNoiseImage = tvNoiseContext.createImageData(tvNoiseWidth, tvNoiseHeight);
    var tvNoiseTimer;
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    tvNoiseCanvas.width = tvNoiseWidth;
    tvNoiseCanvas.height = tvNoiseHeight;

    function drawTvVhsNoise() {
      var pixels = tvNoiseImage.data;

      for (var pixel = 0; pixel < pixels.length; pixel += 4) {
        var brightness = Math.random() > 0.5 ? 255 : 0;
        pixels[pixel] = brightness;
        pixels[pixel + 1] = brightness;
        pixels[pixel + 2] = brightness;
        pixels[pixel + 3] = Math.floor(Math.random() * 180);
      }

      tvNoiseContext.putImageData(tvNoiseImage, 0, 0);
    }

    function startTvVhsNoise() {
      if (!prefersReducedMotion && !document.hidden && !tvNoiseTimer) {
        tvNoiseTimer = window.setInterval(drawTvVhsNoise, 75);
      }
    }

    function stopTvVhsNoise() {
      if (tvNoiseTimer) {
        window.clearInterval(tvNoiseTimer);
        tvNoiseTimer = null;
      }
    }

    drawTvVhsNoise();
    startTvVhsNoise();
    document.addEventListener("visibilitychange", function() {
      if (document.hidden) {
        stopTvVhsNoise();
      } else {
        startTvVhsNoise();
      }
    });
  } else {
    console.error("Could not initialize the television VHS noise canvas.");
  }
}

//
// Blog Slider //
//
var swiper = new Swiper(".blog-slider", {
  slidesPerView: 1,
  spaceBetween: 24,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 50,
    },
  },
  navigation: {
    nextEl: ".swiper-blog-next",
    prevEl: ".swiper-blog-prev",
  },
});

//
// Clients Slider //
//
var swiper = new Swiper(".clients-slider", {
  slidesPerView: 2,
  spaceBetween: 24,
  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});

//
// Testimonial Slider //
//
var swiper = new Swiper(".testimonial-slider", {
  slidesPerView: 1,
  spaceBetween: 40,
  pagination: {
    el: ".swiper-testimonial-pagination",
    type: "progressbar",
  },
});


/*===============================================
  6. Lightbox
===============================================*/
//
// Lightbox - Image //
//
var $lightboxImage = $(".lightbox-image-box");

$lightboxImage.each(function () {
  var $this = $(this);
  $this.magnificPopup({
    type: 'image',
    fixedContentPos: false,
    removalDelay: 200,
    closeOnContentClick: true, 
    image: {
      titleSrc: 'data-image-title'
    }
  });
});

//
// Lightbox - Media //
//
var $lightboxMedia = $(".lightbox-media-box");

$lightboxMedia.each(function() {
  var $this = $(this);
  $this.magnificPopup({
    type: "iframe",
    fixedContentPos: false,
    removalDelay: 200,
    preloader: false,
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
        },
          vimeo: {
          index: 'vimeo.com/',
          id: '/',
          src: '//player.vimeo.com/video/%id%?autoplay=1'
        }
      },
      srcAction: "iframe_src" 
    }
  });
});


const logo = document.querySelector('.header .header-wrapper .header-logo');

window.addEventListener('scroll', () => {
  if (window.scrollY > 150) {
    logo.classList.add('hidden');
  } else {
    logo.classList.remove('hidden');
  }
});

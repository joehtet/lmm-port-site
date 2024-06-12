(function($) {
  "use strict"; // Start of use strict


  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Get rid of overlay when navigating carousel
  $('.carousel-control-prev').hover(function() {
    $('.overlay').css("opacity", 0);
  });
  $('.carousel-control-next').hover(function() {
    $('.overlay').css("opacity", 0);
  });

  var OPACITY = .7

  $('#corporate-strategy').hover(function() {
    $('.corp-overlay').css("opacity", OPACITY);
  });
  $('#training').hover(function() {
    $('.training-overlay').css("opacity", OPACITY);
  });
  $('#education').hover(function() {
    $('.education-overlay').css("opacity", OPACITY);
  });
  $('#template').hover(function() {
    $('.template-overlay').css("opacity", OPACITY);
  });

  $('#animation-showcase').hover(function() {
    $('.animation-showcase-overlay').css("opacity", .5);
  });
  $('#about').hover(function() {
    $('.about-overlay').css("opacity", OPACITY);
  });

  $('.carousel').on("mouseleave", function() {
    $('.overlay').css("opacity", .0);
  });


})(jQuery); // End of use strict


$(document).ready(function() {

  // Function to synchronize the carousel and modal
  function syncCarouselAndModal(carouselId, modalId, modalCarouselId) {
    // When the modal is shown
    $(modalId).on('show.bs.modal', function () {
      // Get the index of the active slide in the carousel
      var slideIndex = $(carouselId + ' .carousel-item.active').index();

      // Set the corresponding slide in the modal carousel
      var slides = document.querySelector(modalCarouselId).querySelectorAll('.carousel-item');

      slides.forEach(function(slide) {
        slide.classList.remove('active');
      });

      slides[slideIndex].classList.add('active');
      $(carouselId).carousel(slideIndex);
      updateControls($(carouselId));
    });

    // When the modal is hiding
    $(modalId).on('hide.bs.modal', function() {
      var slideIndex = $(modalCarouselId + ' .carousel-item.active').index();
      $(carouselId).carousel(slideIndex);
      updateControls($(carouselId));
    });
  }

  // Call the function for each modal and carousel pair
  syncCarouselAndModal('#corporate-strategy', '#corpModal', '#corpModalCarousel');
  syncCarouselAndModal('#training', '#trainingModal', '#trainingModalCarousel');
  syncCarouselAndModal('#education', '#educationModal', '#educationModalCarousel');
  syncCarouselAndModal('#template', '#templateModal', '#templateModalCarousel');


  // Setting video thumbnails and autoplay on hover
  var video = document.querySelector(".showcase");

  function startPreview() {
    video.muted = true;
    video.currentTime = 2;
    video.playbackRate = 0.5;
    video.play();
  }

  function stopPreview() {
    video.currentTime = 2.7;
    video.playbackRate = 1;
    video.pause();
  }

  var previewTimeout = null;

  video.addEventListener("mouseenter", function() {
    startPreview();
    previewTimeout = setTimeout(stopPreview, 8000);
  });

  video.addEventListener("mouseleave", function() {
    clearTimeout(previewTimeout);
    previewTimeout = null;
    stopPreview();
  });

 // autoplay video on modal open
  $('#animationModal').on('shown.bs.modal', function () {
    var modalVideo = document.getElementById('modalVideo');
    modalVideo.play();
  });

  // stop video on modal close
  $('#animationModal').on('hidden.bs.modal', function () {
    var modalVideo = document.getElementById('modalVideo');
    modalVideo.pause();
    modalVideo.currentTime = 0; // Optional: Reset the video to the beginning
  });

  // Carousel arrows hide on first/last slide
  function updateControls($carousel) {
    var $activeItem = $carousel.find('.carousel-item.active');
    var $prevControl = $carousel.find('.carousel-control-prev');
    var $nextControl = $carousel.find('.carousel-control-next');

    // Get the index of the active item
    var activeIndex = $activeItem.index();
    var totalItems = $carousel.find('.carousel-item').length;

    // Hide or show the prev control based on the active slide
    if (activeIndex === 0) {
      $prevControl.addClass('d-none');
    } else {
      $prevControl.removeClass('d-none');
    }

    // Hide or show the next control based on the active slide
    if (activeIndex === totalItems - 1) {
      $nextControl.addClass('d-none');
    } else {
      $nextControl.removeClass('d-none');
    }
  }

  // Initialize all carousels and set initial control visibility
  $('.carousel').each(function() {
    var $carousel = $(this);
    $carousel.carousel();
    updateControls($carousel);

    // Update control visibility when the slide changes
    $carousel.on('slid.bs.carousel', function () {
      updateControls($carousel);
    });
  });
});
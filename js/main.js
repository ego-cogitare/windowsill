$(document).ready(function() {
  var _ = {
    phonePattern: /^(\+380|0)?[1-9]\d{8}$/,
    processForm: '/ajax/process-form.php'
  };

  new Swiper('.slider-section .swiper-container', {
    direction: 'horizontal',
    slidesPerView: 1,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    // autoplay: 4000,
    loop: true,
    spaceBetween: 0,
    mousewheelControl: false,
    speed: 1000,
    simulateTouch:false
  });

  new Swiper('.rewiews-slider .swiper-container', {
    direction: 'horizontal',
    slidesPerView: 1,
    pagination: '.reviews-pagination',
    paginationClickable: true,
    // autoplay: 4000,
    loop: true,
    spaceBetween: 0,
    mousewheelControl: false,
    speed: 1000
  });

  $('.menu .menu-item A, .logo').on('click', function(e) {
    e.preventDefault();

    $('.menu').find('A').removeClass('active');
    $(this).addClass('active');
    $('.c-hamburger').removeClass('active');
    var id = $(this).attr('href');
    $('html, body').animate({
       scrollTop: $(id).offset().top - 74
    }, 1000);
  });

  $('.product-size').on('click', function() {
    var price = $(this).data('price');

    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
      .closest('.product-sizes')
        .next()
          .find('.price')
          .text(price);
  });

  $('.c-hamburger').on('click', function() {
    $(this).toggleClass('active');
  });

  $('.product-thumb').on('click', function() {
    var $productImg = $(this).parent().prev('.product-photo').find('IMG');
    $productImg.attr('src', $(this).find('IMG').attr('src'));
    $(this).addClass('active').siblings('.product-thumb').removeClass('active');
  });

  $('.popup-open').on('click', function() {
    var $popupWrapper = $('.popup-1')
      , role = $(this).data('role');

    $popupWrapper.show(0, function() {
      $(this)
        .removeClass('invisible')
        .find('.popup')
        .removeClass('default buy')
        .addClass(role || 'default');
    });
  });

  var collectPostData = function(role) {
    // Selected price
    var $activeSlide = $('.slider-section .swiper-slide-active')

    // Collect form data
    , data = {
      form: 'mosaic',
      price: $activeSlide.find('.product-size.active').data('price'),
      size: $activeSlide.find('.product-size.active').text(),
      title: $activeSlide.find('.product-title').text(),
      color:  $activeSlide.find('.product-brand').text(),
      userPhone: $(this).find('INPUT[name="contactPhone"]').val(),
      userName: $(this).find('INPUT[name="yourName"]').val()
    };

    // Remove unnecessary data
    if (role === 'default') {
      delete data.price;
      delete data.size;
      delete data.title;
      delete data.color;
    }

    return data;
  };

  $('#request-now-form').on('submit', function(e) {
    e.preventDefault();


    $(this).find('INPUT').removeClass('invalid');

    // Get phone number field link
    var $phone = $(this).find('INPUT[name="contactPhone"]')
      , role = $(this).closest('.popup').hasClass('buy') ? 'buy' : 'default'
      , form = this;

    // Validate phone number field
    if (!$phone.val().match(_.phonePattern)) {
      $phone.addClass('invalid');
      return false;
    }

    $.post(_.processForm, collectPostData.call(this, role), function(response) {
      if (response.success) {
        // Close popup
        $(form).closest('.popup-contents').find('.popup-close').trigger('click');

        // Clear form
        $(form).get(0).reset();

        // Open thanks popup
        var $popupWrapper = $('.popup-2');
        $popupWrapper.show(0, function() {
          $(this).removeClass('invisible')
        });
      }
    });
  });

  $('#get-catalog-form').on('submit', function(e) {
    e.preventDefault();

    var $phone = $(this).find('INPUT[name="contactPhone"]')
      , form = this;

    // Validate phone number field
    if (!$phone.val().match(_.phonePattern)) {
      $phone.addClass('invalid');
      return false;
    }

    $.post(_.processForm, collectPostData.call(this, 'default'), function(response) {
      if (response.success) {
        // Clear form
        $(form).get(0).reset();

        // Open thanks popup
        var $popupWrapper = $('.popup-2');
        $popupWrapper.show(0, function() {
          $(this).removeClass('invisible')
        });
      }  
    });
  });

  $('.popup-close').on('click', function() {
    var $popupWrapper = $(this).closest('.popup-wrapper');
    $popupWrapper.addClass('invisible');
    setTimeout(function() {
      $popupWrapper.hide();
    }, 300);
  });

  $(this).on('keyup', function(e) {
    (e.which === 27) && $('.popup-contents').find('.popup-close').trigger('click');
  });
});

function initMap() {
  var coords = {
    lat: 46.469020,
    lng: 30.752267
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: coords,
  });
  var marker = new google.maps.Marker({
    position: coords,
    map: map
  });
  if ($(document).width() > 1023) {
    map.panBy($(document).width() / -4, 0);
  }
}

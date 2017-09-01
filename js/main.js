$(document).ready(function() {
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
    speed: 1000
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
    var $popupWrapper = $('.popup-1');
    $popupWrapper.show(0, function() {
      $(this).removeClass('invisible')
    });
  });

  var collectPostData = function() {
    // Selected price
    var $activeSize = $('.slider-section .swiper-slide-active .product-size.active');

    // Collect form data
    return {
      price: $activeSize.data('price'),
      size:  $activeSize.text(),
      phone: $(this).find('INPUT[name="contactPhone"]').val(),
      name: $(this).find('INPUT[name="yourName"]').val()
    };
  };

  $('#request-now-form').on('submit', function(e) {
    e.preventDefault();

    $(this).find('INPUT').removeClass('invalid');

    // Get phone number field link
    var $phone = $(this).find('INPUT[name="contactPhone"]');

    // Validate phone number field
    if (!$phone.val().match(/^(\+380|0)?[1-9]\d{8}$/)) {
      $phone.addClass('invalid');
      return false;
    }

    $.post('', collectPostData.call(this), function(response) {
      // Close popup
      $(this).closest('.popup-contents').find('.popup-close').trigger('click');

      // Open thanks popup
      var $popupWrapper = $('.popup-2');
      $popupWrapper.show(0, function() {
        $(this).removeClass('invisible')
      });
    });
  });

  $('#get-catalog-form').on('submit', function(e) {
    e.preventDefault();

    var $popupWrapper = $('.popup-2');
    $popupWrapper.show(0, function() {
      $(this).removeClass('invisible')
    });

    $.post('', collectPostData.call(this), function(response) {
      // Open thanks popup
      var $popupWrapper = $('.popup-2');
      $popupWrapper.show(0, function() {
        $(this).removeClass('invisible')
      });
    });
  });

  $('.popup-close').on('click', function() {
    var $popupWrapper = $(this).closest('.popup-wrapper');
    $popupWrapper.addClass('invisible');
    setTimeout(function() {
      $popupWrapper.hide();
    }, 300);
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

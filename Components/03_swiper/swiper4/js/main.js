const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    // loop: true,
  
    // If we need pagination
    // pagination: {
    //   el: '.swiper-pagination',
    // },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 5,
    spaceBetween: 30,
    // centeredSlides: true,
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
  // },
  breakpoints: {
    360: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 4,
    },
    1600: {
      slidesPerView: 5,
    },
  },
  });
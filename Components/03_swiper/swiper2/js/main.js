const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const autoPlayBtn = document.querySelector('.autoplay-play-stop')

const swiper = new Swiper('.swiper', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
  // },
  on: { //프로그래스바(원형)
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    }
  }
});
  
autoPlayBtn.addEventListener('click', (e) => {
  const btn = e.currentTarget
  if (btn.classList.contains('stop')) { //일시정지중일 경우
    swiper.autoplay.resume();
    btn.classList.remove('stop')
  } else { //재생중일경우
    swiper.autoplay.pause();
    btn.classList.add('stop')
  }

})
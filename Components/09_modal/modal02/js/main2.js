const popupSliderCloseBtn = document.querySelector(".popup-slider-close-btn");
const popupSlider = document.querySelector(".popup-slider");

// 광고팝업닫기
popupSliderCloseBtn.addEventListener("click", () => {
  popupSlider.classList.remove("is-active");
});

function toggleMainPopup() {
  // 스토리지 제어 함수 정의
  const handleStorage = {
    // 스토리지에 데이터 쓰기(이름, 만료일)
    setStorage: function (name, exp) {
      // 만료 시간 구하기(exp를 ms단위로 변경)
      const date = new Date();
      date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

      // 로컬 스토리지에 저장하기
      // (값을 따로 저장하지 않고 만료 시간을 저장)
      localStorage.setItem(name, date);
    },
    // 스토리지 읽어오기
    getStorage: function (name) {
      const now = new Date();
      // 현재 시각과 스토리지에 저장된 시각을 각각 비교하여
      // 시간이 남아 있으면 true, 아니면 false 리턴
      const dateString = localStorage.getItem(name);
      const dateObject = new Date(dateString);
      const timestamp = dateObject.getTime();
      return timestamp > now.getTime();
    },
  };

  //데이터 불러오기 샘플
  const data = [
    {
      id: "data01",
      img: "http://www.aica-gj.kr/file/popup/1693184334.png",
      link: "https://www.naver.com/",
      title: "공지1",
    },
    {
      id: "data02",
      img: "http://www.aica-gj.kr/file/popup/1692259708.jpg",
      link: "https://www.naver.com/",
      title: "공지2",
    },
    {
      id: "data03",
      img: "http://www.aica-gj.kr/file/popup/1700206182.jpg",
      link: "https://www.naver.com/",
      title: "공지3",
    },
  ];

  let popupList = "";
  let popupNum = 0;
  for (let i = 0; i < data.length; i++) {
    //광고팝업 슬라이드 데이터 노출
    const d = data[i];
    const thisData = handleStorage.getStorage(d.id);
    if (!thisData) {
      const swiperSlide = document.createElement("div");
      swiperSlide.className = "swiper-slide swiper-slide01";

      // a 태그 생성
      const link = document.createElement("a");
      link.href = d.link;

      // img 태그 생성
      const img = document.createElement("img");
      img.src = d.img;
      img.alt = d.title;

      // div.popup_slider-btn-wrap 생성
      const btnWrap = document.createElement("div");
      btnWrap.className = "popup_slider-btn-wrap";

      // button 생성
      const button = document.createElement("button");
      button.id = d.id;
      button.textContent = "오늘 하루 보지 않기";

      // 각각의 요소를 조립
      btnWrap.appendChild(button);
      link.appendChild(img);
      swiperSlide.appendChild(link);
      swiperSlide.appendChild(btnWrap);

      // 스트링으로 변환
      const tempContainer = document.createElement("div");
      tempContainer.appendChild(swiperSlide);

      // HTML 문자열로 변환
      const newPopupItem = tempContainer.innerHTML;

      // popupList에 추가
      popupList += newPopupItem;
      popupNum += 1;
    }
  }
  const popupSwiperWrap = document.querySelector(
    ".popup-slider .swiper-wrapper"
  );
  popupSwiperWrap.innerHTML = popupList;

  //스와이퍼
  if (popupNum !== 0) {
    //팝업이 하나이상 있으면
    const popupSwiper = new Swiper("#popupSlider", {
      //   loop: true, //루프켜면 popupSlideBtns.length == popupSlideclickBtns.length 수정해야함

      pagination: {
        el: ".popup-slide-pagination",
      },

      navigation: {
        nextEl: ".popup-slide-next",
        prevEl: ".popup-slide-prev",
      },
    });

    // 오늘하루 보지 않기 버튼
    const popupSlideBtns = document.querySelectorAll(
      ".popup_slider-btn-wrap button"
    );
    for (let i = 0; i < popupSlideBtns.length; i++) {
      const p = popupSlideBtns[i];
      p.addEventListener("click", function (event) {
        const target = event.target;
        // 로컬 스토리지에 id 이름으로 1일(24시간 뒤) 동안 보이지 않게

        handleStorage.setStorage(target.id, 1);
        p.classList.add("today-display-none");
        const popupSlideclickBtns = document.querySelectorAll(
          ".popup_slider-btn-wrap button.today-display-none"
        );

        if (popupSlideBtns.length == popupSlideclickBtns.length) {
          popupSlider.classList.remove("is-active");
        } else {
          popupSwiper.slideNext();
        }
      });
    }
  } else {
    //팝업이 하나도 없으면 공지팝업 html 삭제
    document.querySelector(".popup-slider").remove();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  toggleMainPopup();
});

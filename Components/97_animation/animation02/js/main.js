const ani = document.querySelectorAll(".s__animation");

const bottomNum = 200; //바닥에서 얼마나 떨어져서 이벤트가 실행될 것인가

function numCounter(num, max) {
  //숫자 증가하는 이벤트
  let thisNum = max;
  const handler = setInterval(() => {
    num.innerHTML = Math.ceil(max - thisNum).toLocaleString();
    if (thisNum < 1) {
      clearInterval(handler);
    }
    const step = thisNum / 4; // 숫자 늘리면 더 느리게 올라갑니다
    thisNum -= step;
  }, 50);
}

if (ani) {
  window.addEventListener("scroll", function () {
    var clientHeight = document.documentElement.clientHeight;
    var scrollY = window.scrollY;
    var bottomDistance = scrollY + clientHeight; // 현재 페이지 높이

    for (let i = 0; i < ani.length; i++) {
      const a = ani[i];
      if (a.offsetTop + bottomNum <= bottomDistance) {
        a.classList.add("is-active");
        const numCount = a.querySelectorAll(".num-count");
        numCount.forEach((e) => {
          if (!e.classList.contains("num-is-active")) {
            e.classList.add("num-is-active");
            numCounter(e, e.dataset.count);
          }
        });
      } else {
        a.classList.remove("is-active");
        const numCount = a.querySelectorAll(".num-count");
        numCount.forEach((e) => {
          e.classList.remove("num-is-active");
        });
      }
    }
  });
}

const ani = document.querySelectorAll(".s__animation");
const bottomNum = 200 //바닥에서 얼마나 떨어져서 이벤트가 실행될 것인가
if (ani) {
  window.addEventListener("scroll", function () {
    var clientHeight = document.documentElement.clientHeight;
    var scrollY = window.scrollY;
    var bottomDistance = scrollY + clientHeight; // 현재 페이지 높이

    for (let i = 0; i < ani.length; i++) {
      const a = ani[i];
      if ((a.offsetTop + bottomNum) <= bottomDistance) {
          a.classList.add("is-active");
      } else {
        a.classList.remove("is-active");
      }
    }
  });
}

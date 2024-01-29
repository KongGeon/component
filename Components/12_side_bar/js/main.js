// 사이드바
let sideOpenBtn = document.querySelector(".s__sidebar-open-btn");//사이드바 오픈 버튼
let sidebar = document.querySelector(".s__sidebar");

sideOpenBtn.addEventListener('click', () => {
    sidebar.classList.toggle('is-open')
})

let sideMenu = document.querySelectorAll(".side-menu__step1");
  
for (let i = 0; i < sideMenu.length; i++) {
  const p = sideMenu[i];
  p.addEventListener("focusin", () => {
    sideMenu.forEach((e) => {
      e.classList.remove("is-open");
    });
    p.classList.add("is-open");
  });
  p.addEventListener("mouseover", () => {
    sideMenu.forEach((e) => {
      e.classList.remove("is-open");
    });
  });
}
let preMenu = document.querySelector(".s__sidebar-open-btn"); //사이드바 이전요소
let nextMenu = document.querySelector(".side-next"); //사이드바 다음요소
preMenu &&
  preMenu.addEventListener("focusin", () => {
    sideMenu.forEach((e) => {
      e.classList.remove("is-open");
    });
  });
nextMenu &&
  nextMenu.addEventListener("focusin", () => {
    sideMenu.forEach((e) => {
      e.classList.remove("is-open");
    });
  });
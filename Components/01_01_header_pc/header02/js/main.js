//pc메뉴
let header = document.querySelector("header");
let pcMenu = document.querySelector(".s__pc-header-wrap");
let pcMenuBtn = document.querySelectorAll(".pc-menu__step1");
let pcMenuBtnList = document.querySelectorAll(".pc-menu__step1 + ul");
let pcMenuBg = document.querySelector('.pc-menu-bg') 
let lastMenuLink = document.querySelector('.menu-link > li:last-child li:last-child .pc-menu__step2')
for (let i = 0; i < pcMenuBtn.length; i++) {
  const p = pcMenuBtn[i];
  p.addEventListener("focusin", () => {
    pcMenu.classList.add("is-open");
  });
  p.addEventListener("mouseover", () => {
    pcMenu.classList.add("is-open");
  });
}
header.addEventListener('mouseleave', () => {
  pcMenu.classList.remove("is-open");
  
})
let preMenu = document.querySelector(".s__logo"); //pc메뉴의 이전요소
let nextMenu = document.querySelector(".s__login"); //pc메뉴의 다음요소
preMenu.addEventListener("focusin", () => {
  pcMenu.classList.remove("is-open");
});
nextMenu.addEventListener("focusin", () => {
  pcMenu.classList.remove("is-open");
});
lastMenuLink.addEventListener("focusin", () => {
  pcMenu.classList.add("is-open");
});
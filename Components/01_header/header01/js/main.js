//메뉴

//pc메뉴
let pcMenuBtn = document.querySelectorAll(".pc-menu__step1");
let pcMenuBtnList = document.querySelectorAll(".pc-menu__step1 + ul");

for (let i = 0; i < pcMenuBtn.length; i++) {
  const p = pcMenuBtn[i];
  p.addEventListener("focusin", () => {
    pcMenuBtn.forEach((e) => {
      e.classList.remove("menu-on");
    });
    p.classList.add("menu-on");
  });
}
let preMenu = document.querySelector(".s__logo"); //pc메뉴의 이전요소
let nextMenu = document.querySelector(".s__login"); //pc메뉴의 다음요소
preMenu.addEventListener("focusin", () => {
  pcMenuBtn.forEach((e) => {
    e.classList.remove("menu-on");
  });
});
nextMenu.addEventListener("focusin", () => {
  pcMenuBtn.forEach((e) => {
    e.classList.remove("menu-on");
  });
});

//mobile 메뉴
let menuBtn = document.querySelectorAll(".mobile-menu__step1");
let mobileMenuBtn = document.querySelector(".menu");
let mobileMenuList = document.querySelector(".mobile-menu__list");

for (let i = 0; i < menuBtn.length; i++) {
  const m = menuBtn[i];
  m.addEventListener("click", () => {
    menuBtn.forEach((e) => {
      if (e == m) {
        e.classList.toggle("menu-on");
      } else {
        e.classList.remove("menu-on");
      }
    });
  });
}
mobileMenuBtn.addEventListener("click", () => {
  if (mobileMenuList.classList.contains("menu-on")) {
    menuBtn.forEach((e) => {
      e.classList.remove("menu-on");
    });
  }
  mobileMenuList.classList.toggle("menu-on");
  mobileMenuBtn.classList.toggle("menu-on");
});

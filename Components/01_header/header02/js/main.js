//메뉴

//pc메뉴
let header = document.querySelector("header");
let pcMenu = document.querySelector(".pc-menu");
let pcMenuBtn = document.querySelectorAll(".pc-menu__step1");
let pcMenuBtnList = document.querySelectorAll(".pc-menu__step1 + ul");
let pcMenuBg = document.querySelector('.pc-menu-bg') 
let lastMenuLink = document.querySelector('.menu-link > li:last-child li:last-child .pc-menu__step2')
for (let i = 0; i < pcMenuBtn.length; i++) {
  const p = pcMenuBtn[i];
  p.addEventListener("focusin", () => {
    pcMenu.classList.add("menu-on");
  });
  p.addEventListener("mouseover", () => {
    pcMenu.classList.add("menu-on");
  });
}
header.addEventListener('mouseleave', () => {
  pcMenu.classList.remove("menu-on");
  
})
let preMenu = document.querySelector(".s__logo"); //pc메뉴의 이전요소
let nextMenu = document.querySelector(".s__login"); //pc메뉴의 다음요소
preMenu.addEventListener("focusin", () => {
  pcMenu.classList.remove("menu-on");
});
nextMenu.addEventListener("focusin", () => {
  pcMenu.classList.remove("menu-on");
});
lastMenuLink.addEventListener("focusin", () => {
  pcMenu.classList.add("menu-on");
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

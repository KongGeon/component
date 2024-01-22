//mobile 메뉴
let menuBtn = document.querySelectorAll(".mobile-menu__step1");
let menuBtnStep2 = document.querySelectorAll(".mobile-menu__step2");
let mobileMenuOpenBtn = document.querySelector(".menu-open");
let mobileMenuCloseBtn = document.querySelector(".menu-close");
let mobileMenuList = document.querySelector(".mobile-menu__list");

for (let i = 0; i < menuBtn.length; i++) {
  const m = menuBtn[i];
  m.addEventListener("click", () => {
    menuBtn.forEach((e) => {
      if (e == m) {
        e.classList.toggle("is-open");
      } else {
        e.classList.remove("is-open");
      }
    });
  });
}
for (let i = 0; i < menuBtnStep2.length; i++) {
  const m = menuBtnStep2[i];
  m.addEventListener("click", () => {
    menuBtnStep2.forEach((e) => {
      if (e == m) {
        e.classList.toggle("is-open");
      } else {
        e.classList.remove("is-open");
      }
    });
  });
}

mobileMenuOpenBtn.addEventListener("click", () => {
  mobileMenuList.classList.add("is-open");
});
mobileMenuCloseBtn.addEventListener("click", () => {
  mobileMenuList.classList.remove("is-open");
});

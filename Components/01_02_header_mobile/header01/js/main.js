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

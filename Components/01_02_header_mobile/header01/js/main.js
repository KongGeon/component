//mobile 메뉴
let menuBtn = document.querySelectorAll(".mobile-menu__step1");
let mobileMenuBtn = document.querySelector(".menu");
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
mobileMenuBtn.addEventListener("click", () => {
  if (mobileMenuList.classList.contains("is-open")) {
    menuBtn.forEach((e) => {
      e.classList.remove("is-open");
    });
  }
  mobileMenuList.classList.toggle("is-open");
  mobileMenuBtn.classList.toggle("is-open");
});

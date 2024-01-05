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
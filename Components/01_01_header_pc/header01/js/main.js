//pc메뉴
let pcMenuBtn = document.querySelectorAll(".pc-menu__step1");

for (let i = 0; i < pcMenuBtn.length; i++) {
  const p = pcMenuBtn[i];
  p.addEventListener("focusin", () => {
    pcMenuBtn.forEach((e) => {
      e.classList.remove("is-open");
    });
    p.classList.add("is-open");
  });
}
let preMenu = document.querySelector(".s__logo"); //pc메뉴의 이전요소
let nextMenu = document.querySelector(".s__login"); //pc메뉴의 다음요소
preMenu&&preMenu.addEventListener("focusin", () => {
  pcMenuBtn.forEach((e) => {
    e.classList.remove("is-open");
  });
});
nextMenu&&nextMenu.addEventListener("focusin", () => {
  pcMenuBtn.forEach((e) => {
    e.classList.remove("is-open");
  });
});
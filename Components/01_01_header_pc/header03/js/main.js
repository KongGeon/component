//메뉴

//pc메뉴
let pcMenuBtn = document.querySelectorAll(".pc-menu__step1");
let pcMenuBtnStep2 = document.querySelectorAll(".pc-menu__step2 > ul > li");
let pcMenuBtnList = document.querySelectorAll(".pc-menu__step1 + ul");
let preMenu = document.querySelector(".s__logo"); //pc메뉴의 이전요소
let nextMenu = document.querySelector(".s__login"); //pc메뉴의 다음요소

//스탭1
for (let i = 0; i < pcMenuBtn.length; i++) {
  const p = pcMenuBtn[i];
  p.addEventListener('mouseenter', () => {
    pcMenuBtn.forEach(e => {
      e.classList.remove('active');
    });
    p.classList.add('active')
  })
  p.addEventListener('focusin', () => {
    pcMenuBtn.forEach(e => {
      e.classList.remove('active');
    });
    p.classList.add('active')
  })
  p.addEventListener('mouseleave', () => {
    pcMenuBtn.forEach(e => {
      e.classList.remove('active');
    });
  })
}
preMenu.addEventListener("focusin", () => {
  pcMenuBtn.forEach((e) => {
    e.classList.remove("active");
  });
});
nextMenu.addEventListener("focusin", () => {
  pcMenuBtn.forEach((e) => {
    e.classList.remove("active");
  });
});

// 스탭2
for (let i = 0; i < pcMenuBtnStep2.length; i++) {
  const p = pcMenuBtnStep2[i];
  p.addEventListener('mouseenter', () => {
    pcMenuBtnStep2.forEach(e => {
      e.classList.remove('active');
    });
    p.classList.add('active')
  })
  p.addEventListener('focusin', () => {
    pcMenuBtnStep2.forEach(e => {
      e.classList.remove('active');
    });
    p.classList.add('active')
  })
}
// 아코디언
const accordionAList = document.querySelectorAll(".s__accordion01 button");
const accordionList = document.querySelectorAll(".s__accordion01");
accordionAList.forEach((e) => {
  const thisAccordionName = e.parentNode.parentNode.dataset.accordion;
  e.addEventListener("click", () => {
    if (e.parentNode.parentNode.classList.contains("is-active")) {
      e.parentNode.parentNode.classList.remove("is-active");
    } else {
      accordionList.forEach((t) => {
        if (t.dataset.accordion === thisAccordionName) {
          t.classList.remove("is-active");
        }
      });
      e.parentNode.parentNode.classList.add("is-active");
    }
  });
});

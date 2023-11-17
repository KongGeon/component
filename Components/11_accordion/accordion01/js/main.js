// tab01
const accordionAList = document.querySelectorAll(".s__accordion01 a");
const accordionList = document.querySelectorAll(".s__accordion01");
accordionAList.forEach((e) => {
  const thisAccordionName = e.parentNode.parentNode.dataset.accordion;
  e.addEventListener("click", () => {
    if (e.parentNode.parentNode.classList.contains("active-on")) {
      e.parentNode.parentNode.classList.remove("active-on");
    } else {
      accordionList.forEach((t) => {
        if (t.dataset.accordion === thisAccordionName) {
          t.classList.remove("active-on");
        }
      });
      e.parentNode.parentNode.classList.add("active-on");
    }
  });
});

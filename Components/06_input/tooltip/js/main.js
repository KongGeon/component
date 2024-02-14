let tooltipElem;


// PC
document.onmouseover = function(event) {
  let target = event.target;

  // data-tooltip 속성이 있는 요소
  let tooltipHtml = target.dataset.tooltip;
  if (!tooltipHtml || window.innerWidth <= 1023) return;

  // 툴팁 요소를 만듭니다.
  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipElem.innerHTML = tooltipHtml;
  document.body.append(tooltipElem);

  // 툴팁 요소를 data-tooltip 속성이 있는 요소 위, 가운데에 위치시킵니다.
  let coords = target.getBoundingClientRect();

  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0; // 툴팁이 창 왼쪽 가장자리를 넘지 않도록 합니다.

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) { // 툴팁이 창 위로 넘치면 요소 아래에 보여줍니다.
    top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
};
document.onmouseout = function(e) {
  if (tooltipElem && 1023 < window.innerWidth) {
    tooltipElem.remove();
    tooltipElem = null;
  }
};

// Mobile
document.onmouseup = function (event) {
  let target = event.target;

  // data-tooltip 속성이 있는 요소
  let tooltipHtml = target.dataset.tooltip;
  if (!tooltipHtml || 1023 < window.innerWidth) return;

    // 툴팁 요소를 만듭니다.
    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);
  
    // 툴팁 요소를 data-tooltip 속성이 있는 요소 위, 가운데에 위치시킵니다.
    let coords = target.getBoundingClientRect();
  
    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
    if (left < 0) left = 0; // 툴팁이 창 왼쪽 가장자리를 넘지 않도록 합니다.
  
    let top = coords.top - tooltipElem.offsetHeight - 5;
    if (top < 0) { // 툴팁이 창 위로 넘치면 요소 아래에 보여줍니다.
      top = coords.top + target.offsetHeight + 5;
    }
    console.log(tooltipElem.offsetHeight)
    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
}

document.onmousedown = function(e) {
  if (tooltipElem && window.innerWidth <= 1023) {
    tooltipElem.remove();
    tooltipElem = null;
  }
};

// 참고한사이트 : https://ko.javascript.info/task/behavior-tooltip
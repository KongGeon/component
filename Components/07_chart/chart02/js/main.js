// ----------------테스트용 데이터 : 참고만 해주세요----------------

// 테스트용 랜덤 배열제작
function generateRandomNumbers(n, min, max) {
  const randomNumbers = [];
  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }
  return randomNumbers; //[123, 114, 34 ,412 ... ] 이런식으로 배열
}
// 방문제 페이지 분석 월 테스트
function monthAddNumber(num) {
  const Numbers = [];
  for (let i = 1; i < num; i++) {
    Numbers.push(i + " Jan");
  }
  return Numbers; //['1 Jan', '2 Jan', ... 'num Jan']
}
//Week Month 탭 버튼 이벤트
const dataBtn = document.querySelectorAll(".btn-week-month a");

// ----------------옵션----------------
const getOrCreateLegendList = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    listContainer.style.display = "flex";
    listContainer.style.justifyContent = "center";
    listContainer.style.flexDirection = "row";
    listContainer.style.margin = "16px 0 24px 0";
    listContainer.style.padding = 0;
    listContainer.style.flexWrap = "wrap";
    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList(chart, options.containerID);

    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.style.alignItems = "center";
      li.style.cursor = "pointer";
      li.style.display = "flex";
      li.style.flexDirection = "row";
      li.style.marginLeft = "16px";

      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = "14px";
      boxSpan.style.borderRadius = "14px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "14px";

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      textContainer.appendChild(text);

      li.appendChild(boxSpan);
      li.appendChild(textContainer);
      ul.appendChild(li);
    });
  },
};

const getOrCreateLegendList02 = (chart, id) => {
  const legendContainer = document.getElementById(id);
  let listContainer = legendContainer.querySelector("ul");

  if (!listContainer) {
    listContainer = document.createElement("ul");
    legendContainer.appendChild(listContainer);
  }

  return listContainer;
};

const htmlLegendPlugin02 = {
  id: "htmlLegend",
  afterUpdate(chart, args, options) {
    const ul = getOrCreateLegendList02(chart, options.containerID);

    // 이전 범례 삭제
    while (ul.firstChild) {
      ul.firstChild.remove();
    }

    // labels 모두 선택
    const items = chart.options.plugins.legend.labels.generateLabels(chart);

    items.forEach((item) => {
      const li = document.createElement("li");
      li.onclick = () => {
        const { type } = chart.config;
        if (type === "pie" || type === "doughnut") {
          chart.toggleDataVisibility(item.index);
        } else {
          chart.setDatasetVisibility(
            item.datasetIndex,
            !chart.isDatasetVisible(item.datasetIndex)
          );
        }
        chart.update();
      };

      // Color box
      const boxSpan = document.createElement("span");
      boxSpan.style.background = item.fillStyle;
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = item.lineWidth + "px";
      boxSpan.style.display = "inline-block";
      boxSpan.style.flexShrink = 0;
      boxSpan.style.height = "14px";
      boxSpan.style.marginTop = "4px";
      boxSpan.style.borderRadius = "2px";
      boxSpan.style.marginRight = "10px";
      boxSpan.style.width = "14px";

      // textBox
      const div = document.createElement("div");
      div.classList.add("chart02-textbox");
      const div02 = document.createElement("div");

      // Text
      const textContainer = document.createElement("p");
      textContainer.style.color = item.fontColor;
      textContainer.style.margin = 0;
      textContainer.style.padding = 0;
      textContainer.style.fontWeight = 700;
      textContainer.style.cursor = "pointer";
      textContainer.style.textDecoration = item.hidden ? "line-through" : "";

      const text = document.createTextNode(item.text);
      const text02 = document.createTextNode(
        chart.data.datasets[0].data[item.index]
      );

      //   데이터 합계
      let sum = 0;
      for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
        sum += chart.data.datasets[0].data[i];
      }
      // 합계 이용해서 % 계산
      const text03 = document.createTextNode(
        ((chart.data.datasets[0].data[item.index] / sum) * 100).toFixed(2) + "%"
      );
      const textContainer02 = document.createElement("p");
      const textContainer03 = document.createElement("p");

      console.log(chart.data.datasets[0].data[item.index]);
      textContainer.appendChild(text);
      textContainer02.appendChild(text02);
      textContainer03.appendChild(text03);
      ul.classList.add("chart02-ul");
      li.appendChild(boxSpan);
      div.appendChild(textContainer);
      div02.appendChild(textContainer02);
      div02.appendChild(textContainer03);
      div.appendChild(div02);
      li.appendChild(div);
      ul.appendChild(li);
    });
  },
};

// ----------------선 차트----------------
const dataWeek = {
  labels: monthAddNumber(8),
  datasets: [
    {
      label: "메인",
      data: generateRandomNumbers(8, 100, 200),
      borderColor: "#733BEA",
      backgroundColor: "#733BEA",
    },
    {
      label: "상품검색",
      data: generateRandomNumbers(8, 200, 300),
      borderColor: "#08C56F",
      backgroundColor: "#08C56F",
    },
    {
      label: "상품주문",
      data: generateRandomNumbers(8, 100, 600),
      borderColor: "#F2406C",
      backgroundColor: "#F2406C",
    },
    {
      label: "분석환경신청등록",
      data: generateRandomNumbers(8, 100, 600),
      borderColor: "#FD8904",
      backgroundColor: "#FD8904",
    },
  ],
};

const dataMonth = {
  labels: monthAddNumber(31),
  datasets: [
    {
      label: "메인",
      data: generateRandomNumbers(31, 100, 200),
      borderColor: "#733BEA",
      backgroundColor: "#733BEA",
    },
    {
      label: "상품검색",
      data: generateRandomNumbers(31, 200, 300),
      borderColor: "#08C56F",
      backgroundColor: "#08C56F",
    },
    {
      label: "상품주문",
      data: generateRandomNumbers(31, 100, 600),
      borderColor: "#F2406C",
      backgroundColor: "#F2406C",
    },
    {
      label: "분석환경신청등록",
      data: generateRandomNumbers(31, 100, 600),
      borderColor: "#FD8904",
      backgroundColor: "#FD8904",
    },
  ],
};
const config = {
  type: "line",
  data: dataMonth,
  options: {
    maintainAspectRatio: false,  //반응형
    responsive: true,
    plugins: {
      htmlLegend: {
        containerID: "legend-container01",
      },
      legend: {
        display: false,
      },
    },
    // elements: {
    //   point: {
    //     radius: 0, // 포인트 삭제
    //   },
    // },
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: false, //x축 삭제
      },
      y: {
        display: false, //y축 삭제
      },
    },
  },
  plugins: [htmlLegendPlugin], //플러그인
};
const ctx = document.getElementById("myChart01");
new Chart(ctx, config);

// ----------------도넛 차트----------------

const data02 = {
  labels: ["자동차", "에너지", "헬스케어", "문화콘텐츠"],
  datasets: [
    {
      data: [4305, 859, 482, 138],
    },
  ],
};
const config02 = {
  type: "doughnut",
  data: data02,
  options: {
    maintainAspectRatio: false, //반응형
    responsive: true,
    plugins: {
      htmlLegend: {
        containerID: "legend-container02",
      },
      legend: {
        display: false,
      },
    },
  },
  plugins: [htmlLegendPlugin02], //플러그인
};
const ctx02 = document.getElementById("myChart02");
new Chart(ctx02, config02);

// ----------------바 차트(세로)----------------

const data03 = {
  labels: monthAddNumber(31),
  datasets: [
    {
      label: "Fully Rounded",
      data: generateRandomNumbers(31, 100, 200),
      borderColor: "#733BEA",
      backgroundColor: "#733BEA",
      borderWidth: 2,
      // borderRadius: ,
      // borderSkipped: ,
    },
  ],
};
const config03 = {
  type: "bar",
  data: data03,
  options: {
    maintainAspectRatio: false, //반응형
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  },
};
const ctx03 = document.getElementById("myChart03");
new Chart(ctx03, config03);

// ----------------바 차트(가로))----------------

const data04 = {
  labels: monthAddNumber(7),
  datasets: [
    {
      label: "Fully Rounded",
      data: generateRandomNumbers(7, 100, 200),
      borderColor: "#733BEA",
      backgroundColor: "#733BEA",
      borderWidth: 2,
      // borderRadius: ,
      // borderSkipped: ,
    },
  ],
};
const config04 = {
  type: "bar",
  data: data04,
  options: {
    maintainAspectRatio: false, //반응형
    responsive: true,
    indexAxis: 'y', //수평차트 만들기
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  },
};
const ctx04 = document.getElementById("myChart04");
new Chart(ctx04, config04);
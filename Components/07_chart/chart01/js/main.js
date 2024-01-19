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
// const dataBtn = document.querySelectorAll(".btn-week-month a");
// for (let i = 0; i < dataBtn.length; i++) {
//   const d = dataBtn[i];
//   d.addEventListener("click", () => {
//     dataBtn.forEach((e) => {
//       e.classList.remove("tab-on");
//     });
//     d.classList.add("tab-on");
//     if (d.innerText === "Week") {
//       //week일때
//       myChart.setOption(option0102);
//     } else {
//       //month일때
//       myChart.setOption(option0101);
//     }
//   });
// }

// ----------------선 차트----------------

let chartDom = document.getElementById("myChart01");
let myChart = echarts.init(chartDom);
let option01;

option01 = {
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["메인", "상품검색", "상품주문", "분석환경신청등록"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: monthAddNumber(31),
    //   axisLine: {
    //     show: false, // x축 선 제거
    //   },
    //   axisLabel: {
    //     show: false, // x축 라벨 제거
    //   },
    //   axisTick: {
    //     show: false // x축 라벨선 제거
    //   }
  },
  yAxis: {
    type: "value",
    // show: false // y축 제거
  },
  series: [
    {
      name: "메인",
      type: "line",
      //   showSymbol: false, //심볼 여부
      data: generateRandomNumbers(31, 100, 600),
      //   Style: {
      //     color: '#9D76F0', //선 색상
      //   },
      //   areaStyle: {
      //     color: '#DCCDFA', //배경 색상
      //   },
    },
    {
      name: "상품검색",
      type: "line",
      showSymbol: false,
      data: generateRandomNumbers(31, 100, 600),
    },
  ],
};
myChart.setOption(option01);

// ----------------도넛 차트----------------

let chartDom02 = document.getElementById("myChart02");
let myChart02 = echarts.init(chartDom02);
let option02;

option02 = {
  tooltip: {
    //툴팁
    trigger: "item",
  },
  legend: {
    //범례
    bottom: "0",
    left: "center",
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"], //안쪽크기, 바깥쪽크기
      avoidLabelOverlap: false,
      labelLine: {
        show: false,
      },
      label: {
        //라벨 평소에 안보임
        formatter: "{d}%",
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          //라벨 마우스 올리면 보임
          show: true,
          fontSize: 20,
          fontWeight: "bold",
        },
      },
      data: [
        { value: 2131, name: "개인사업자" },
        { value: 214, name: "법인" },
        { value: 1254, name: "대학" },
        { value: 1000, name: "기관" },
      ],
    },
  ],
};

myChart02.setOption(option02);
// ----------------바 차트----------------

let chartDom03 = document.getElementById("myChart03");
let myChart03 = echarts.init(chartDom03);
let option03;
option03 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true, //여백없음
  },
  xAxis: [
    {
      type: "category", //타입 x, y축 바꾸면 가로 세로 바뀜
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        //show: false, // x축 라벨선 제거
        alignWithLabel: true, // 선 가운데로 맞춤
      },
      //   axisLine: {
      //     show: false, // x축 선 제거
      //   },
      //   axisLabel: {
      //     show: false, // x축 라벨 제거
      //   },
    },
  ],
  yAxis: [
    {
      type: "value", //타입 x, y축 바꾸면 가로 세로 바뀜
      // show: false, // y축 제거
    },
  ],
  series: [
    {
      name: "Direct",
      type: "bar",
    //   barWidth: "60%", //바 넓이
      data: [10, 52, 200, 334, 390, 330, 220],
      },
      {
        name: "Direct",
        type: "bar",
        data: [1, 2, 20, 34, 39, 290, 20],
        // itemStyle: {
        //   borderRadius: [0, 20, 20, 0], //라디오스
        // }
      },
  ],
};
myChart03.setOption(option03);


window.onresize = function() {//반응형
  myChart.resize(); 
  myChart02.resize(); 
  myChart03.resize(); 
};
// 도움말
//https://github.com/nhn/tui.grid/blob/master/packages/toast-ui.grid/docs/ko/README.md

// 원래 대로라면 이렇게
// const dataSource = {
//     contentType: 'application/json',
//     api: {
//       readData: { url: '/api/readData', method: 'GET'}
//     }
//   };

//로컬이니까 이렇게
const dataSource = [
  {
    id: "10012",
    name: "Seoul",
    country: "South Korea",
  },
  {
    id: "10013",
    city: "Tokyo",
    country: "Japan",
  },
  {
    id: "10014",
    city: "London",
    country: "England",
  },
  {
    id: "10015",
    city: "Ljubljana",
    country: "Slovenia",
  },
  {
    id: "10016",
    city: "Reykjavik",
    country: "Iceland",
  },
  {
    id: "10012",
    name: "Seoul",
    country: "South Korea",
  },
  {
    id: "10013",
    city: "Tokyo",
    country: "Japan",
  },
  {
    id: "10014",
    city: "London",
    country: "England",
  },
  {
    id: "10015",
    city: "Ljubljana",
    country: "Slovenia",
  },
  {
    id: "10016",
    city: "Reykjavik",
    country: "Iceland",
  },
  {
    id: "10016",
    city: "Reykjavik",
    country: "Iceland",
  },
  {
    id: "10012",
    name: "Seoul",
    country: "South Korea",
  },
  {
    id: "10013",
    city: "Tokyo",
    country: "Japan",
  },
  {
    id: "10014",
    city: "London",
    country: "England",
  },
  {
    id: "10015",
    city: "Ljubljana",
    country: "Slovenia",
  },
  {
    id: "10016",
    city: "Reykjavik",
    country: "Iceland",
  },
  {
    id: "10012",
    name: "Seoul",
    country: "South Korea",
  },
  {
    id: "10013",
    city: "Tokyo",
    country: "Japan",
  },
  {
    id: "10014",
    city: "London",
    country: "England",
  },
  {
    id: "10015",
    city: "Ljubljana",
    country: "Slovenia",
  },
  {
    id: "10016",
    city: "Reykjavik",
    country: "Iceland",
  },
  {
    id: "10012",
    name: "Seoul",
    country: "South Korea",
  },
  {
    id: "10013",
    city: "Tokyo",
    country: "Japan",
  },
  {
    id: "10014",
    city: "London",
    country: "England",
  },
  {
    id: "10015",
    city: "Ljubljana",
    country: "Slovenia",
  },
  {
    id: "10016",
    city: "Reykjavik",
    country: "Iceland",
  },
  {
    id: "10016",
    city: "Reykjavik",
    country: "Iceland",
  },
  {
    id: "10012",
    name: "Seoul",
    country: "South Korea",
  },
  {
    id: "10013",
    city: "Tokyo",
    country: "Japan",
  },
  {
    id: "10014",
    city: "London",
    country: "England",
  },
  {
    id: "10015",
    city: "Ljubljana",
    country: "Slovenia",
  },
  {
    id: "10016",
    city: "Reykjavik",
    country: "Iceland",
  },
];

//넘버
class RowNumberRenderer {
  constructor(props) {
    const el = document.createElement("span");
    el.innerHTML = `${props.formattedValue}`;
    this.el = el;
  }

  getElement() {
    return this.el;
  }

  render(props) {
    this.el.innerHTML = `No.${props.formattedValue}`;
  }
}

//체크박스
class CheckboxRenderer {
  constructor(props) {
    const { grid, rowKey } = props;

    const label = document.createElement("label");
    label.className = "checkbox tui-grid-row-header-checkbox";
    label.setAttribute("for", String(rowKey));

    const hiddenInput = document.createElement("input");
    hiddenInput.className = "hidden-input";
    hiddenInput.id = String(rowKey);

    const customInput = document.createElement("span");
    customInput.className = "custom-input";

    label.appendChild(hiddenInput);
    label.appendChild(customInput);

    hiddenInput.type = "checkbox";
    label.addEventListener("click", (ev) => {
      ev.preventDefault();

      if (ev.shiftKey) {
        grid[!hiddenInput.checked ? "checkBetween" : "uncheckBetween"](rowKey);
        return;
      }

      grid[!hiddenInput.checked ? "check" : "uncheck"](rowKey);
    });

    this.el = label;

    this.render(props);
  }

  getElement() {
    return this.el;
  }

  render(props) {
    const hiddenInput = this.el.querySelector(".hidden-input");
    const checked = Boolean(props.value);

    hiddenInput.checked = checked;
  }
}

const grid = new tui.Grid({
  el: document.getElementById("grid"),
  data: dataSource,
  scrollX: false,
  scrollY: false,
  minBodyHeight: 30,
  rowHeaders: [
    {
      type: "rowNum",
      renderer: {
        type: RowNumberRenderer,
      },
    },
    {
      type: "checkbox",
      header:
        "<label for='all-checkbox' class='checkbox'><input type='checkbox' id='all-checkbox' class='hidden-input' name='_checked' /><span class='custom-input'></span></label>",
      renderer: {
        type: CheckboxRenderer,
      },
    },
  ], //체크박스, 넘버
  pageOptions: {
    useClient: true,
    perPage: 10, //한페이지에 보여줄 데이터 개수
  },
  columns: [
    {
      header: "ID",
      name: "id",
      sortingType: "desc", //내림차순
      sortable: true,
    },
    {
      header: "CITY",
      name: "city",
      sortingType: "asc", //오름차순
      sortable: true,
    },
    {
      header: "COUNTRY",
      name: "country",
      filter: { type: "text", showApplyBtn: true, showClearBtn: true }, //검색필터
    },
  ],
});

//체크박스 이벤트
grid.on("check", function (ev) {
  console.log("check", ev);
});

grid.on("uncheck", function (ev) {
  console.log("uncheck", ev);
});

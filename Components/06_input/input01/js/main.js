//input 숫자 최대 개수
// function checkMaxLength(object) {
//   if (object.value.length > object.maxLength) {
//     object.value = object.value.slice(0, object.maxLength);
//   }
// }
const phoneNum = document.querySelectorAll(".s__input_phone");
for (let i = 0; i < phoneNum.length; i++) {
  const p = phoneNum[i];
  p.addEventListener("input", function (e) {
    const object = e.target;
    if (object.value.length > object.maxLength) {
      object.value = object.value.slice(0, object.maxLength);
    }
  });
}

//싱글 파일첨부
const fileUploads = document.querySelectorAll(
  'input[type="file"]:not([multiple])'
);
if (fileUploads) {
  fileUploads.forEach((fileInput) => {
    fileInput.addEventListener("change", () => {
      let file = fileInput.files;
      const fileName = file[0].name;
      const fileSize = (file[0].size / (1024 * 1024)).toFixed(1);
      // p 태그 생성
      const fileGetListName = document.createElement("p");
      fileGetListName.className = "file__get__list__name";
      fileGetListName.textContent = `${fileName} (${fileSize}MB)`;
      fileInput.parentNode.parentNode.querySelector(
        ".s__singlefile-list"
      ).innerHTML = ""; //초기화
      fileInput.parentNode.parentNode
        .querySelector(".s__singlefile-list")
        .appendChild(fileGetListName);
      // fileInput.parentNode.parentNode.querySelector('.s__singlefile-list').innerHTML = `
      // <p class="file__get__list__name">${fileName} (${fileSize}MB)</p>
      // `
    });
  });
}
//멀티 파일첨부
const fileMultiUploads = document.querySelectorAll(
  'input[type="file"][multiple]'
);

if (fileMultiUploads) {
  fileMultiUploads.forEach((fileInput) => {
    const dataTransfer = new DataTransfer();

    fileInput.addEventListener("change", () => {
      let fileArr = fileInput.files;

      if (fileArr != null && fileArr.length > 0) {
        // =====DataTransfer 파일 관리========
        for (let i = 0; i < fileArr.length; i++) {
          dataTransfer.items.add(fileArr[i]);
        }
        fileInput.files = dataTransfer.files;
        const underscoreIndex = fileInput.id.indexOf("_");
        const prefix =
          underscoreIndex !== -1
            ? fileInput.id.slice(0, underscoreIndex)
            : fileInput.id;
        const modifiedId = prefix + "List";

        //for문으로 리스트 만들어 줌
        let fileList = "";

        for (let i = 0; i < fileInput.files.length; i++) {
          const currentFile = fileInput.files[i];
          const fileSize = (currentFile.size / (1024 * 1024)).toFixed(1);
          fileList += `
                             <li id="data${currentFile.lastModified}">
                                 <p class="file__get__list__name">${currentFile.name} (${fileSize}MB)</p>
                                 <button class="btns remove_button" data-index="data${currentFile.lastModified}" data-target-input="${fileInput.id}" id="">
                                     <span>${currentFile.name} 삭제</span>
                                 </button>
                             </li>
                             `;
        }

        document.querySelector("#" + modifiedId).innerHTML = fileList;

        // ==========================================

        // 삭제
        const fileBottomList = document.querySelectorAll(".s__file-list");
        fileBottomList.forEach((e) => {
          e.addEventListener("click", function (event) {
            if (
              e.id == modifiedId &&
              event.target.className == "btns remove_button"
            ) {
              targetFile = event.target.dataset.index;
              // ============DataTransfer================
              for (let i = 0; i < dataTransfer.files.length; i++) {
                if ("data" + dataTransfer.files[i].lastModified == targetFile) {
                  dataTransfer.items.remove(i);
                  break;
                }
              }

              document.getElementById(event.target.dataset.targetInput).files =
                dataTransfer.files;
              console.log(e.querySelector("#" + targetFile));
              console.log(targetFile);
              e.querySelector("#" + targetFile).remove();

              console.log(
                "input FIles 삭제후=>",
                document.getElementById(event.target.dataset.targetInput).files
              );
            }
          });
        });
      }
    });
  });
}

// 텍스트에어리어 숫자 체크
const textCounts = document.querySelectorAll(".js-text-count");

function handlerTextCount() {
  const countGroup = this.parentNode.parentNode;
  const countTextGroup = countGroup.querySelector(".js-text-count-ck");
  const countMax = this.dataset.max;
  const countText = this.value.length;

  countTextGroup.innerText = `${countText}/${countMax}`;

  if (countText > countMax) {
    countTextGroup.innerText = `${countMax}/${countMax}`;
  }
}
textCounts.forEach((elem) => {
  elem.addEventListener("keyup", handlerTextCount);
});

// 체크박스
const checkTotalBtns = document.querySelectorAll(".s__checkbox-total");
const checkBtns = document.querySelectorAll(".s__checkbox-ck");

function handlerAgrTotal() {
  const totalArea = this.closest(".s__checkbox-wrap");
  const checkboxList = totalArea.querySelectorAll(".s__checkbox-ck");

  checkboxList.forEach((ckbox) => {
    if (this.checked) {
      ckbox.checked = true;
      ckbox.value = "Y";
    } else {
      ckbox.checked = false;
      ckbox.value = "N";
    }
  });
}

function handlerAgrCheck() {
  const totalArea = this.closest(".s__checkbox-wrap");
  const total = totalArea.querySelector(".s__checkbox-total");
  const checkboxes = totalArea.querySelectorAll(".s__checkbox-ck");
  const checkboxSelect = totalArea.querySelectorAll(".s__checkbox-ck:checked");

  if (checkboxes.length === checkboxSelect.length) {
    total.checked = true;
    total.value = "Y";
  } else {
    total.checked = false;
    total.value = "N";
  }
}

checkTotalBtns.forEach((total) => {
  total.addEventListener("click", handlerAgrTotal);
});

checkBtns.forEach((ck) => {
  ck.addEventListener("click", handlerAgrCheck);
});

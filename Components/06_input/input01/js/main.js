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

// 파일 드래그 앤 드롭(이미지)
const fileDragMultiImgUploadsBox = document.querySelectorAll(
  ".s__drag-multi-img-file-wrap"
);
function isImgMultiValid(data) {
  //파일인지 유효성 검사
  if (data.types.indexOf("Files") < 0) return false;

  for (let i = 0; i < data.files.length; i++) {
    const f = data.files[i];
    //이미지인지 유효성 검사
    if (f.type.indexOf("image") < 0) {
      alert("이미지 파일만 업로드 가능합니다.");
      return false;
    }

    //파일의 사이즈는 5MB 미만
    if (f.size >= 1024 * 1024 * 5) {
      alert("5MB 이상인 파일은 업로드할 수 없습니다.");
      return false;
    }
  }
  return true;
}
if (fileDragMultiImgUploadsBox) {
  fileDragMultiImgUploadsBox.forEach((box) => {
    box.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.style.borderColor = "var(--main)";
      this.style.backgroundColor = "var(--background)";
    });
    box.addEventListener("dragleave", function (e) {
      e.preventDefault();
      this.style.borderColor = "var(--border)";
      this.style.backgroundColor = "var(--white)";
    });
    box.addEventListener("drop", function (e) {
      e.preventDefault();
      this.style.borderColor = "var(--border)";
      this.style.backgroundColor = "var(--white)";

      //유효성 Check
      const data = e.dataTransfer;
      if (!isImgMultiValid(data)) {
        return;
      }

      const inputElement = this.querySelector(".s__drag-multi-img-file");

      // 드래그 앤 드롭으로 가져온 파일들을 input file에 추가
      inputElement.files = e.dataTransfer.files;

      // 파일이 추가되었으므로, 사용자 정의 change 이벤트를 트리거
      const changeEvent = new Event("change", { bubbles: true });
      inputElement.dispatchEvent(changeEvent);
    });
  });
}

const fileDragMultiImgUploads = document.querySelectorAll(
  '.s__drag-multi-img-file-wrap input[type="file"][multiple]'
);

if (fileDragMultiImgUploads) {
  fileDragMultiImgUploads.forEach((fileInput) => {
    const dataTransfer = new DataTransfer();
    fileInput.addEventListener("change", () => {
      fileInput
        .closest(".s__drag-multi-img-file-wrap")
        .classList.add("is-active");
      let fileArr = fileInput.files;
      if (fileArr != null && fileArr.length > 0) {
        // =====DataTransfer 파일 관리========
        for (let i = 0; i < fileArr.length; i++) {
          const currentFile = fileArr[i];

          let isDuplicate = false;
          for (let j = 0; j < dataTransfer.items.length; j++) {
            console.log(dataTransfer.items[j].getAsFile());
            if (
              dataTransfer.items[j].kind == "file" &&
              dataTransfer.items[j].getAsFile().name === currentFile.name
            ) {
              isDuplicate = true;
              console.log(dataTransfer.items[j].getAsFile().name);
              break;
            }
          }

          if (!isDuplicate) {
            dataTransfer.items.add(currentFile);
          }
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
                             <img src="${URL.createObjectURL(
                               currentFile
                             )}" alt="${
            currentFile.name
          }" class="file-get-list-img">
                                 <button class="btns remove_button" data-index="data${
                                   currentFile.lastModified
                                 }" data-target-input="${fileInput.id}" id="">
                                     <span>${currentFile.name} 삭제</span>
                                 </button>
                             </li>
                             `;
        }

        document.querySelector("#" + modifiedId).innerHTML = fileList;

        // ==========================================

        // 삭제
        const fileBottomList = document.querySelectorAll(
          ".s__drag-img-file-list"
        );
        fileBottomList.forEach((e) => {
          e.addEventListener("click", function (event) {
            if (
              e.id == modifiedId &&
              event.target.className == "btns remove_button"
            ) {
              console.log(event.target);
              event.preventDefault();
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
              // console.log(e.querySelector("#" + targetFile));
              // console.log(targetFile);
              if (e.querySelector("#" + targetFile)) {
                e.querySelector("#" + targetFile).remove();
                console.log(
                  "input FIles 삭제후=>",
                  document.getElementById(event.target.dataset.targetInput)
                    .files
                );
              }
              if (
                document.getElementById(event.target.dataset.targetInput).files
                  .length === 0
              ) {
                //파일 비었을때
                fileInput
                  .closest(".s__drag-multi-img-file-wrap")
                  .classList.remove("is-active");
              }
            }
          });
        });
      }
    });
  });
}

// 파일 드래그 앤 드롭(텍스트)
const fileDragMultiUploadsBox = document.querySelectorAll(
  ".s__drag-multi-file-wrap"
);
function isMultiValid(data) {
  //파일인지 유효성 검사
  if (data.types.indexOf("Files") < 0) return false;

  for (let i = 0; i < data.files.length; i++) {
    const f = data.files[i];

    //파일의 사이즈는 5MB 미만
    if (f.size >= 1024 * 1024 * 5) {
      alert("5MB 이상인 파일은 업로드할 수 없습니다.");
      return false;
    }
  }
  return true;
}
if (fileDragMultiUploadsBox) {
  fileDragMultiUploadsBox.forEach((box) => {
    box.addEventListener("dragover", function (e) {
      e.preventDefault();
      this.style.borderColor = "var(--main)";
      this.style.backgroundColor = "var(--background)";
    });
    box.addEventListener("dragleave", function (e) {
      e.preventDefault();
      this.style.borderColor = "var(--border)";
      this.style.backgroundColor = "var(--white)";
    });
    box.addEventListener("drop", function (e) {
      e.preventDefault();
      this.style.borderColor = "var(--border)";
      this.style.backgroundColor = "var(--white)";

      //유효성 Check
      const data = e.dataTransfer;
      if (!isMultiValid(data)) {
        return;
      }
      const inputElement = this.querySelector(".s__drag-multi-file");

      // 드래그 앤 드롭으로 가져온 파일들을 input file에 추가
      inputElement.files = e.dataTransfer.files;

      // 파일이 추가되었으므로, 사용자 정의 change 이벤트를 트리거
      const changeEvent = new Event("change", { bubbles: true });
      inputElement.dispatchEvent(changeEvent);
    });
  });
}

const fileDragMultiUploads = document.querySelectorAll(
  '.s__drag-multi-file-wrap input[type="file"][multiple]'
);

if (fileDragMultiUploads) {
  fileDragMultiUploads.forEach((fileInput) => {
    const dataTransfer = new DataTransfer();
    fileInput.addEventListener("change", () => {
      fileInput.closest(".s__drag-multi-file-wrap").classList.add("is-active");
      let fileArr = fileInput.files;
      if (fileArr != null && fileArr.length > 0) {
        // =====DataTransfer 파일 관리========
        for (let i = 0; i < fileArr.length; i++) {
          const currentFile = fileArr[i];

          let isDuplicate = false;
          for (let j = 0; j < dataTransfer.items.length; j++) {
            console.log(dataTransfer.items[j].getAsFile());
            if (
              dataTransfer.items[j].kind == "file" &&
              dataTransfer.items[j].getAsFile().name === currentFile.name
            ) {
              isDuplicate = true;
              console.log(dataTransfer.items[j].getAsFile().name);
              break;
            }
          }

          if (!isDuplicate) {
            dataTransfer.items.add(currentFile);
          }
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
                                 <p class="file-get-list-name">${currentFile.name} (${fileSize}MB)</p>
                                 <button class="btns remove_button" data-index="data${currentFile.lastModified}" data-target-input="${fileInput.id}" id="">
                                     <span>${currentFile.name} 삭제</span>
                                 </button>
                             </li>
                             `;
        }

        document.querySelector("#" + modifiedId).innerHTML = fileList;

        // ==========================================

        // 삭제
        const fileBottomList = document.querySelectorAll(".s__drag-file-list");
        fileBottomList.forEach((e) => {
          e.addEventListener("click", function (event) {
            if (
              e.id == modifiedId &&
              event.target.className == "btns remove_button"
            ) {
              console.log(event.target);
              event.preventDefault();
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
              // console.log(e.querySelector("#" + targetFile));
              // console.log(targetFile);
              if (e.querySelector("#" + targetFile)) {
                e.querySelector("#" + targetFile).remove();
                console.log(
                  "input FIles 삭제후=>",
                  document.getElementById(event.target.dataset.targetInput)
                    .files
                );
              }
              if (
                document.getElementById(event.target.dataset.targetInput).files
                  .length === 0
              ) {
                //파일 비었을때
                fileInput
                  .closest(".s__drag-multi-file-wrap")
                  .classList.remove("is-active");
              }
            }
          });
        });
      }
    });
  });
}

//싱글 파일첨부
const fileUploads = document.querySelectorAll(
  '.s__singlefile-wrap input[type="file"]'
);
if (fileUploads) {
  fileUploads.forEach((fileInput) => {
    fileInput.addEventListener("change", () => {
      let file = fileInput.files;
      const fileName = file[0].name;
      const fileSize = (file[0].size / (1024 * 1024)).toFixed(1);
      // p 태그 생성
      const fileGetListName = document.createElement("p");
      fileGetListName.className = "file-get-list-name";
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
  '.s__multi-file-wrap input[type="file"][multiple]'
);

if (fileMultiUploads) {
  fileMultiUploads.forEach((fileInput) => {
    const dataTransfer = new DataTransfer();

    fileInput.addEventListener("change", () => {
      let fileArr = fileInput.files;
      if (fileArr != null && fileArr.length > 0) {
        // =====DataTransfer 파일 관리========
        for (let i = 0; i < fileArr.length; i++) {
          const currentFile = fileArr[i];

          let isDuplicate = false;
          for (let j = 0; j < dataTransfer.items.length; j++) {
            console.log(dataTransfer.items[j].getAsFile());
            if (
              dataTransfer.items[j].kind == "file" &&
              dataTransfer.items[j].getAsFile().name === currentFile.name
            ) {
              isDuplicate = true;
              console.log(dataTransfer.items[j].getAsFile().name);
              break;
            }
          }

          if (!isDuplicate) {
            dataTransfer.items.add(currentFile);
          }
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
                                 <p class="file-get-list-name">${currentFile.name} (${fileSize}MB)</p>
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
              // console.log(e.querySelector("#" + targetFile));
              // console.log(targetFile);
              if (e.querySelector("#" + targetFile)) {
                e.querySelector("#" + targetFile).remove();
                console.log(
                  "input FIles 삭제후=>",
                  document.getElementById(event.target.dataset.targetInput)
                    .files
                );
              }
            }
          });
        });
      }
    });
  });
}

// 파일 이미지 미리보기
const fileImgUploads = document.querySelectorAll(".s__imgfile-wrap");
for (let i = 0; i < fileImgUploads.length; i++) {
  const e = fileImgUploads[i];
  const btn = e.querySelector(".s__img-file");
  const img = e.querySelector(".img-preview");
  btn.addEventListener("change", (input) => {
    if (input.target.files && input.target.files[0]) {
      let reader = new FileReader();
      reader.onload = function (e) {
        img.src = e.target.result;
      };
      reader.readAsDataURL(input.target.files[0]);
    } else {
      img.src = "/공통코드/image/img_profile.svg";
    }
  });
}

// 멀티파일 이미지 미리보기
const fileImgMultiUploads = document.querySelectorAll(
  '.s__img-multi-file-wrap input[type="file"][multiple]'
);

if (fileImgMultiUploads) {
  fileImgMultiUploads.forEach((fileInput) => {
    const dataTransfer = new DataTransfer();

    fileInput.addEventListener("change", () => {
      let fileArr = fileInput.files;
      if (fileArr != null && fileArr.length > 0) {
        // =====DataTransfer 파일 관리========
        for (let i = 0; i < fileArr.length; i++) {
          const currentFile = fileArr[i];

          let isDuplicate = false;
          for (let j = 0; j < dataTransfer.items.length; j++) {
            console.log(dataTransfer.items[j].getAsFile());
            if (
              dataTransfer.items[j].kind == "file" &&
              dataTransfer.items[j].getAsFile().name === currentFile.name
            ) {
              isDuplicate = true;
              console.log(dataTransfer.items[j].getAsFile().name);
              break;
            }
          }

          if (!isDuplicate) {
            dataTransfer.items.add(currentFile);
          }
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
                                <img src="${URL.createObjectURL(
                                  currentFile
                                )}" alt="${
            currentFile.name
          }" class="file-get-list-img">
                                 <button class="btns remove_button" data-index="data${
                                   currentFile.lastModified
                                 }" data-target-input="${fileInput.id}" id="">
                                     <span>${currentFile.name} 삭제</span>
                                 </button>
                             </li>
                             `;
        }

        document.querySelector("#" + modifiedId).innerHTML = fileList;

        // ==========================================

        // 삭제
        const fileBottomList = document.querySelectorAll(".s__img-file-list");
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
              // console.log(e.querySelector("#" + targetFile));
              // console.log(targetFile);
              if (e.querySelector("#" + targetFile)) {
                e.querySelector("#" + targetFile).remove();
                console.log(
                  "input FIles 삭제후=>",
                  document.getElementById(event.target.dataset.targetInput)
                    .files
                );
              }
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

// 셀렉트(위)
const selectUp = document.querySelectorAll(".s__select-up");
for (let i = 0; i < selectUp.length; i++) {
  const e = selectUp[i];
  e.addEventListener("click", () => {
    e.classList.toggle("is-open");
  });
}

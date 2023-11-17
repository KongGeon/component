const popOpenBtns = document.querySelectorAll(".js-popup-open");

        function popClose(popup) {
          const popCloseBtns = popup.querySelectorAll(".js-popup-close");

          popCloseBtns.forEach((popCloseBtn) => {
            popCloseBtn.addEventListener("click", function () {
              popup.classList.remove("is-open");
              document.body.classList.remove("scroll-off");
            });
          });
        }

        popOpenBtns.forEach((popOpenBtn) => {
          popOpenBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const popID = this.dataset.popid;
            const popup = document.querySelector(`#${popID}`);

            popup.classList.add("is-open");
            document.body.classList.add("scroll-off");

            popClose(popup);
          });
        });
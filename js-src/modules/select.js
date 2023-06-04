const dropDownBtn = document.querySelector(".dropdown__button"),
      dropDownList = document.querySelector(".dropdown__list"),
      dropDownListItem = dropDownList.querySelectorAll(".dropdown__list-item"),
      dropDownInput = document.querySelector(".dropdown__input-hidden");

dropDownBtn.addEventListener("click", () => {
  dropDownList.classList.toggle("dropdown__list--visible");
  dropDownList.classList.toggle("dropdown__button--active");
});

const filterList = (filterValue) => {
  const boxes = taskBox.querySelectorAll('.box');

    boxes.forEach((box) => {
    const isAction = box.classList.contains('box--action');
    box.style.display = (filterValue === '1' || (filterValue === '2' && isAction) || (filterValue === '3' && !isAction)) ? 'flex' : 'none';
  });
};

dropDownListItem.forEach((listItem) => {
  listItem.addEventListener("click", function(e) {
    e.stopPropagation();
    dropDownBtn.innerText = this.innerText;
    dropDownBtn.focus();
    dropDownInput.value = this.dataset.value;
    dropDownList.classList.remove("dropdown__list--visible");
    const filterValue = this.dataset.value;
    filterList(filterValue);
  })
});

document.addEventListener("click", (e) => {
  if (e.target !== dropDownBtn) {
    dropDownBtn.classList.remove("dropdown__button--active");
    dropDownList.classList.remove("dropdown__list--visible");
  }
});

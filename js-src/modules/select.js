const dropDownBtn = document.getElementById("dropdownBtn"),
      dropDownList = document.getElementById("dropdownList"),
      dropDownListItem = dropDownList.querySelectorAll(".dropdown__list-item"),
      dropDownInput = document.getElementById("dropdownInput");
      
let currentFilterValue = "";

const toggleDropDown = () => {
  dropDownList.classList.toggle("dropdown__list--visible");
  dropDownBtn.classList.toggle("dropdown__button--active");
};

const filterList = () => {
  const boxes = document.querySelectorAll('.box');

  boxes.forEach((box) => {
    const isAction = box.classList.contains('box--action');
    box.style.display =
      (currentFilterValue === '1' ||
        (currentFilterValue === '2' && isAction) ||
        (currentFilterValue === '3' && !isAction))
        ? 'flex'
        : 'none';
  });
};

dropDownListItem.forEach((listItem) => {
  listItem.addEventListener("click", function(e) {
    e.stopPropagation();
    dropDownBtn.innerText = this.innerText;
    dropDownBtn.focus();
    currentFilterValue = this.dataset.value;
    dropDownInput.value = currentFilterValue;
    dropDownList.classList.remove("dropdown__list--visible");
    filterList();
  });
});

const closeDropDown = (e) => {
  if (e.target !== dropDownBtn) {
    dropDownBtn.classList.remove("dropdown__button--active");
    dropDownList.classList.remove("dropdown__list--visible");
  }
};

dropDownBtn.addEventListener("click", toggleDropDown);
document.addEventListener("click", closeDropDown);

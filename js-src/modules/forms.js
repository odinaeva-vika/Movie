const taskForm = document.querySelector("#taskForm"),
      taskInput = document.querySelector("#taskInput"),
      taskBox = document.querySelector("#taskBox");

const taskInputValue = () => taskInput.value;
const lists = [];

taskForm.addEventListener("submit", (e) => {
   e.preventDefault();

  arrList();
  getNewListFromUser();
  clearInput();
});

function List(title) {
  this.list = title;
  this.completed = false;
}

const arrList = () => {
  lists.push(new List(taskInputValue()));
}

const clearInput = () => {
    taskInput.value = "";
  }

const createListItemHTML = (item, index) => `
<div class="box ${item.completed ? 'box--action' : ''}" data-index="${index}">
  <label class="box__label">
                <input class="box__input" type="checkbox" value="" ${item.completed ? 'checked' : ''}>
                <span data-action="done"></span>
              </label>
  <h2 class="box__title">${item.list}</h2>
  <button data-action="delete" class="box__button">
    <img src="./img/close.svg" alt="Удалить фильм из списка">
  </button>
</div>
`;

const getNewListFromUser = () => {
  taskBox.innerHTML = lists
    .map((item, index) => createListItemHTML(item, index))
    .join('');
};

taskBox.addEventListener("click", (e) => {
  if (e.target.dataset.action === "delete") {
    const parentNode = e.target.closest(".box");
    const index = parseInt(parentNode.dataset.index, 10);
    parentNode.remove();
    lists.splice(index, 1);
  } else if (e.target.dataset.action === "done") {
    const parentNode = e.target.closest(".box");
    parentNode.classList.toggle("box--action");
    const index = parseInt(parentNode.dataset.index, 10);
    lists[index].completed = parentNode.classList.contains("box--action");
  }
});
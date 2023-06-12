const taskForm = document.getElementById("taskForm"),
      taskInput = document.getElementById("taskInput"),
      taskBox = document.getElementById("taskBox");

const getInputValue = () => taskInput.value;
const taskLists = [];

const getTaskForm = (e) => {
  e.preventDefault();

  const inputValue = getInputValue();
  if (inputValue.trim().length === 0) {
    return;
  }
  createList();
  renderTaskList();
  clearInput();
};

function List(title) {
  this.list = title;
  this.completed = false;
}

const createList = () => {
  taskLists.push(new List(getInputValue()));
};

const clearInput = () => {
  taskInput.value = "";
  taskInput.focus();
};

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

const renderTaskList = () => {
  taskBox.innerHTML = taskLists
    .map((item, index) => createListItemHTML(item, index))
    .join('');
};

const handleTaskAction = (e) => {
  const action = e.target.dataset.action;
  const parentNode = e.target.closest(".box");
  const index = parseInt(parentNode.dataset.index, 10);

  if (action === "delete") {
    taskLists.splice(index, 1);
    parentNode.remove();
  } else if (action === "done") {
    taskLists[index].completed = !taskLists[index].completed;
    parentNode.classList.toggle("box--action");
  }
};

taskForm.addEventListener("submit", getTaskForm);
taskBox.addEventListener("click", handleTaskAction);

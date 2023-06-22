const formNode = document.getElementById("form"),
      inputNode = document.getElementById("input"),
      boxNode = document.getElementById("box");

const getInputValue = () => inputNode.value;
const movies = [];

const getFormUser = (e) => {
  e.preventDefault();

  const inputValue = getInputValue();
  if (inputValue.trim().length === 0) {
    return;
  }
  createListMovies();
  renderListMovie();
  clearInput();
};

function List(title) {
  this.list = title;
  this.completed = false;
}

const createListMovies = () => {
  movies.push(new List(getInputValue()));
};

const clearInput = () => {
  inputNode.value = "";
  inputNode.focus();
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

const renderListMovie = () => {
  boxNode.innerHTML = movies
    .map((item, index) => createListItemHTML(item, index))
    .join('');
};

const handleAction = (e) => {
  const action = e.target.dataset.action;
  const parentNode = e.target.closest(".box");
  const index = parseInt(parentNode.dataset.index, 10);

  if (action === "delete") {
    movies.splice(index, 1);
    parentNode.remove();
  } else if (action === "done") {
    movies[index].completed = !movies[index].completed;
    parentNode.classList.toggle("box--action");
  }
};

formNode.addEventListener("submit", getFormUser);
boxNode.addEventListener("click", handleAction);

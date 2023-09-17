// Seleção
const todoForm = document.querySelector("#toDoForm");
const todoInput = document.querySelector("#toDoInput");
const todoList = document.querySelector("#toDoList");
const editForm = document.querySelector("#editForm");
const editInput = document.querySelector("#editInput");
const cancelEditBtn = document.querySelector("#editBtn");
const searchInput = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");
let oldInputValue;

//Funcões
//Criação da tarefa
const savetodo = (text, isDone) => {
  const todo = document.createElement("div");
  todo.classList.add("toDo");

  const todoTitle = document.createElement("h3");
  todoTitle.innerText = text;
  todo.appendChild(todoTitle);

  const doneBtn = document.createElement("button");
  doneBtn.classList.add("finishToDo");
  doneBtn.innerHTML = '<i class"fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement("button");
  editBtn.classList.add("editToDo");
  editBtn.innerHTML = '<i class"fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("removeToDo");
  deleteBtn.innerHTML = '<i class"fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  todoList.appendChild(todo);

  todoInput.value = " ";
  todoInput.focus();
};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
};

//Edição
const updateTodo = (text) => {
  const todos = document.querySelectorAll(".toDo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

//Eventos
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Validção tarefa deve ter no máximo 40 caracteres
  const inputValue = todoInput.value;
  if (inputValue) {
    const inputValue = todoInput.value.trim();
    if (inputValue.length <= 40) {
      savetodo(inputValue);
    } else {
      alert("A tarefa deve ter no máximo 40 caracteres.");
    }
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let todoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    todoTitle = parentEl.querySelector("h3").innerText;
  }

  if (targetEl.classList.contains("finishToDo")) {
    parentEl.classList.toggle("done");
  }

  if (targetEl.classList.contains("removeToDo")) {
    parentEl.remove();
  }

  if (targetEl.classList.contains("editToDo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditBtn.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;
  if (editInputValue.length <= 40) {
    updateTodo(editInputValue);
  } else {
    alert("A tarefa deve ter no máximo 40 caracteres.");
  }

  toggleForms();
});

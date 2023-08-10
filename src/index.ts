interface Todo {
  text: string;
  isCompleted: boolean;
}

const btn = document.querySelector("todo-btn")!;
const input = document.getElementById("todo-input")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.querySelector("#todo-list")!;

// define functions here
const renderTodos = (): Array<Todo> => {
  // when we first open the page, our app will search in the localStorage
  const todos = localStorage.getItem("todos");

  if (todos !== null) {
    return JSON.parse(todos);
  }
  return [];
};

const createTodo = (todo: Todo): void => {
  const todoList = document.createElement("li");
  const todoMark = document.createElement("input");
  todoMark.type = "checkbox";
  todoMark.checked = todo.isCompleted;
  todoMark.addEventListener("change", () => {
    todo.isCompleted = !todo.isCompleted;
    todoMark.checked = todo.isCompleted;
    localStorage.setItem("todos", JSON.stringify(todoLists));
  });
  todoList.append(todoMark);
  const todoText = todo.text;
  todoList.append(todoText);
  list.append(todoList);
};

// initialize a variable to hold all todolists we have on hand
const todoLists: Array<Todo> = renderTodos();

// we need to render the todos on the page
if (todoLists.length > 0) todoLists.forEach(createTodo);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // create a todo variable
  const newTodo: Todo = {
    text: input.value,
    isCompleted: false,
  };
  // render it on the page
  createTodo(newTodo);
  // add it to our todolists and save the new list to the localstorage
  todoLists.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todoLists));
  input.value = "";
});

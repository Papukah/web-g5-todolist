const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value.trim();
    if (inputValue === "") return;

    console.log(inputValue);

    const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
    };
    if (todoInput.value.trim() !== "") {
        todoInput.value = "";
    }
    todos.push(newTodo);
    console.log(todos);
    saveToLocalStorage();
    renderTodos()
});


    const renderTodos = () => {
      todoList.innerHTML = "";
      todos.forEach((todo) => {
          const li = document.createElement("li");
          li.className = "todo-item"
         li.innerHTML = `<span>${todo.text}</span>
          <div class="actions">
             <button class="btn-check">done</button>
           <button class="btn-delete">remove</button>
        
    </div>

        `;
        todoList.appendChild(li);
    });
};
renderTodos()


todoList.addEventListener("click", (e) => {

    if (e.target.classList.contains("btn-delete")) {
        const todoText = e.target.closest("li").querySelector("span").innerText;
        const index = todos.findIndex(todo => todo.text === todoText);
        if (index > -1) { todos.splice(index, 1); }
        saveToLocalStorage();
        renderTodos();
    }
    if (e.target.classList.contains("btn-check")) {
        const span = e.target.closest("li").querySelector("span");
        if (span.style.textDecoration === "line-through") {
            span.style.textDecoration = "none";
        } else {
            span.style.textDecoration = "line-through";
        }
    }
});


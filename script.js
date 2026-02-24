const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDeadlineInput = document.getElementById("todo-date")
const todoList = document.getElementById("todo-list");


let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value.trim();
    const todoDeadline = todoDeadlineInput.value;
    console.log(todoDeadline);


    if (inputValue === "") return;

    console.log(inputValue);

    const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        deadline:todoDeadline
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
         li.innerHTML = `<span>${todo.text} - ${todo.deadline}</span>
          <div class="actions">
             <button class="btn-check">done</button>
           <button class="btn-delete">remove</button>
        
    </div>

        `;
        todoList.appendChild(li);
    });
};


const deleteBtnClickHandler = (id) => {
    todos = todos.filter((todo) => todo.id !== id)
    saveToLocalStorage();
    renderTodos();
}

const doneBtnClickHandler = (id) => {
    todos = todos.map((todo)=>{
        if (todo.id === id){
            return{...todo,completed:!todo.completed};
        }
        return todo
    })

    saveToLocalStorage();
    renderTodos();
}

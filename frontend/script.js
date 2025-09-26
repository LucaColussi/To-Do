async function loadTodos() {
  const res = await fetch("http://127.0.0.1:5000/todos");
  const data = await res.json();
  console.log(data);
    const ul = document.getElementById("todo-list");
    ul.innerHTML = "";
    data.forEach((todo) => {
    const li = document.createElement("div");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const buttonDelete = document.createElement("button");
    buttonDelete.textContent = "DELETE";
    buttonDelete.addEventListener("click" , () => {
        fetch(`http://127.0.0.1:5000/todos/${todo.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        })
        .then( () => loadTodos());
    })
    const buttonModify = document.createElement("button");
    buttonModify.textContent = "edit";

    buttonModify.addEventListener("click" , () => {
        enterEditMode(li, todo);
    })

    input.type = "checkbox";
    input.id = "todo-" + todo.id;
    label.htmlFor = "todo-" + todo.id;
    input.addEventListener("change", (event) => {
        fetch(`http://127.0.0.1:5000/todos/${todo.id}/completed`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({ completed : event.target.checked })
        })
        .then( () => loadTodos());
    })
    
    label.textContent = todo.text;
    if(todo.completed === true) input.checked = true;
    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(buttonDelete);
    li.appendChild(buttonModify);
    ul.appendChild(li);
    });    
}
function enterEditMode(li, todo){
    li.innerHTML = "";
    const input = document.createElement("input");
    input.tpye = "text";
    input.value = todo.text;
    const button = document.createElement("button")
    button.textContent = "save";
        button.addEventListener("click", () => {
        fetch(`http://127.0.0.1:5000/todos/${todo.id}/modify`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({ text : input.value })
        })
        .then( () => loadTodos());
    })
    li.appendChild(input);
    li.appendChild(button);
}
loadTodos();


const btn = document.getElementById("add-btn");
const inpt = document.getElementById("todo-input");

btn.addEventListener("click" , () => {

    const text = inpt.value;
    inpt.value = "";
    const body = JSON.stringify({ text });
    fetch("http://127.0.0.1:5000/todos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body
    })
    .then( () => loadTodos());
})
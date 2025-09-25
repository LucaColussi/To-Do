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
    input.type = "checkbox";
    input.id = "todo-" + todo.id;
    label.htmlFor = "todo-" + todo.id;
    input.addEventListener("change", (e) => {
        fetch("http://127.0.0.1:5000/todos/" + todo.id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body : JSON.stringify({ completed : e.target.checked })
        }).then( () => loadTodos());
    })
    
    label.textContent = todo.text;
    if(todo.completed === true) input.checked = true;
    li.appendChild(input);
    li.appendChild(label);
    ul.appendChild(li);
    });    
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

const chkbx = document.getElementById("")

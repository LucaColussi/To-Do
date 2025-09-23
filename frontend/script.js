async function loadTodos() {
  const res = await fetch("http://127.0.0.1:5000/todos");
  const data = await res.json();
    const list = document.getElementById("todo-list");
    list.innerHTML = "";
    data.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    list.appendChild(li);
    });    
}
loadTodos();


const btn = document.getElementById("add-btn");
const inpt = document.getElementById("todo-input");

btn.addEventListener("click" , () => {
    console.log(inpt.value)
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
    .then(response => response.json())
    .then( () => loadTodos());
})

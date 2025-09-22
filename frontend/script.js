fetch("http://127.0.0.1:5000/todos")   
  .then(response => response.json())   
  .then(data => {
    const list = document.getElementById("todo-list");

    data.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    list.appendChild(li);
    })
  });

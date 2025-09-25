import uuid
from flask import Flask, jsonify, request, json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

def load_todos():
    with open("todos.json", "r", encoding="utf-8") as f:
        return json.load(f)
    
@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(load_todos())

def save_todos(todos):
    with open("todos.json", "w", encoding="utf-8") as f:
        json.dump(todos, f, ensure_ascii=False, indent=2)

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.get_json() # prendo json inviato dal frontend
    todos = load_todos()
    new_todo = {
        "id": str(uuid.uuid4()),
        "text": data["text"],
        "completed": False
    }
    todos.append(new_todo);
    save_todos(todos)
    return jsonify(new_todo), 201

@app.route("/todos/<todo_id>", methods =["PATCH"])
def modify_todo(todo_id):
    data = request.get_json()
    todos = load_todos()
    for t in todos:
        if t["id"] == todo_id:
            t["completed"] = bool(data.get("completed"))
            save_todos(todos)
            return jsonify(t), 200  

    return jsonify({"error": "todo non trovato"}), 404
    
@app.route("/todos/<todo_id>", methods = ["DELETE"])
def delete_todo(todo_id):
    todos = load_todos()
    for i in range(len(todos)):
        if todos[i]["id"] == todo_id:
            del todos[i]
            save_todos(todos)
            return jsonify({"success": "amo i froci"}), 200 

    return jsonify({"error": "todo non trovato"}), 404
    
if __name__ == "__main__":
    app.run(debug=True)
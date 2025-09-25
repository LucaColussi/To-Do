from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

todos = [
    {"id": 1, "text": "Comprare il pane", "completed": False},
    {"id": 2, "text": "Studiare Flask", "completed": True}
]

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(todos) # 200 di default

@app.route("/todos", methods=["POST"])
def add_todo():
    
    data = request.get_json() # prendo json inviato dal frontend

    new_todo = {
        "id": len(todos) + 1,
        "text": data["text"],
        "completed": False
    }
    todos.append(new_todo)
    return jsonify(new_todo), 201

@app.route("/todos/<int:todo_id>", methods =["PATCH"])
def modify_todo(todo_id):
    data = request.get_json()
    for t in todos:
        if t["id"] == todo_id:
            t["completed"] = bool(data.get("completed"))
            return jsonify(t), 200  # oppure 204 se non vuoi ritornare JSON

    return jsonify({"error": "todo non trovato"}), 404
    

if __name__ == "__main__":
    app.run(debug=True)
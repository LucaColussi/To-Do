from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

todos = [
    {"id": 1, "text": "Comprare il pane", "completed": False},
    {"id": 2, "text": "Studiare Flask", "completed": True}
]

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)


if __name__ == "__main__":
    app.run()
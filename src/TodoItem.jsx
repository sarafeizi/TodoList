import React from "react";
import { Checkbox } from "primereact/checkbox";
import { playClickSound } from "./utils";

function TodoItem({ todo, onToggle, onDelete, onPin }) {
  const handleCheckboxChange = (e) => {
    playClickSound();
    onToggle(e.checked);
  };


  const handleDeleteClick = () => {
    playClickSound();
    onDelete();
  };

  const handlePinClick = () => {
    playClickSound();
    onPin();
  };

  return (
    <li className={`todo-item ${todo.done ? "done" : ""}`}>
      <span className="todo-text">{todo.text}</span>
      <div className="left-controls">
        <button
          onClick={handlePinClick}
          className="pin-btn"
          title={todo.pinned ? "UnPine" : "Pine"}
        >
          {todo.pinned ? "📌" : "📍"}
        </button>

        <button
          onClick={handleDeleteClick}
          className="delete-btn"
          title="Delete"
        >
          🗑
        </button>
        <span title="Done">
          <Checkbox
            checked={todo.done}
            onChange={handleCheckboxChange}
            inputId={`todo-${todo.id}`}
          />
        </span>

      </div>

    </li>
  );
}

export default TodoItem;

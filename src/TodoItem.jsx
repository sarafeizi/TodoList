import React from "react";
import { Checkbox } from "primereact/checkbox";
import { confirmDialog } from "primereact/confirmdialog";
import { playClickSound } from "./utils";

function TodoItem({ todo, onToggle, onDelete, onPin }) {
  const handleCheckboxChange = (e) => {
    playClickSound();
    onToggle(e.checked);
  };

  const handleDeleteClick = () => {
    confirmDialog({
      message: "Are you sure you want to delete this task?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes",
      rejectLabel: "No",
      acceptClassName: "p-button-danger",
      accept: () => {
        playClickSound();
        onDelete();
      },
    });
  };

  const handlePinClick = () => {
    playClickSound();
    onPin();
  };

  return (
    <li className={`todo-item ${todo.done ? "done" : "undone"}`}>
      <div className="left-controls">
        <span title="Done">
          <Checkbox
            checked={todo.done}
            onChange={handleCheckboxChange}
            inputId={`todo-${todo.id}`}
          />
        </span>

        <button
          onClick={handleDeleteClick}
          className="delete-btn"
          title="Delete"
        >
          🗑
        </button>

        <button
          onClick={handlePinClick}
          className="pin-btn"
          title={todo.pinned ? "Unpin" : "Pin"}
        >
          {todo.pinned ? "📌" : "📍"}
        </button>
      </div>

      <span className="todo-text">{todo.text}</span>
    </li>
  );
}

export default TodoItem;

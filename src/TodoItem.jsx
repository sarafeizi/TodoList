import React, { useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { confirmDialog } from "primereact/confirmdialog";
import { playClickSound } from "./utils";

function TodoItem({ todo, onToggle, onDelete, onPin, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const handleCheckboxChange = (e) => {
    playClickSound();
    onToggle(e.checked);
  };

  const handleDeleteClick = () => {
    confirmDialog({
      message: "Are you sure you want to delete this task?",
      header: "Confirm Delete",
      icon: "pi pi-exclamation-triangle",
      closable: true,
      closeOnEscape: true,
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editValue.trim() !== "") {
      onEdit(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
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

        <button
          onClick={handleEditClick}
          className="edit-btn"
          title="Edit"
        >
          ✏️
        </button>
      </div>

      {isEditing ? (
        <input
          className="edit-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyDown}
          autoFocus style={{ direction: "rtl", textAlign: "right" }}
        />
      ) : (
        <span className="todo-text">{todo.text}</span>
      )}
    </li>
  );
}

export default TodoItem;

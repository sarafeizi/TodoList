import React from "react";
import { Checkbox } from "primereact/checkbox";
import { playClickSound } from "./utils";

function TodoItem({ todo, onToggle, onDelete, onPin }) {
const handleCheckboxChange = (e) => {
  playClickSound();
  onToggle(e.checked);
  if (e.checked) {
    setTimeout(() => {
      alert("💥 Blistering barnacles! You finished it!");
    }, 100); // یه تأخیر کوچیک برای حس بهتر
  }
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
      <div className="left-controls" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  
              <button onClick={handlePinClick} className="pin-btn">
          {todo.pinned ? "📌" : "📍"}
        </button>
        <button onClick={handleDeleteClick} className="delete-btn">🗑</button>
  
              <Checkbox
          checked={todo.done}
          onChange={handleCheckboxChange}
          inputId={`todo-${todo.id}`}
        />
      </div>
    </li>
  );
}

export default TodoItem;

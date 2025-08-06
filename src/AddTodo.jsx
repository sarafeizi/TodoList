import React, { useState } from "react";
import { playClickSound } from "./utils";  

function AddTodo({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      playClickSound();
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
       <button type="submit">Add</button>
      <input style={{direction:"rtl"}}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write ..."
      />
    </form>
  );
}

export default AddTodo;
